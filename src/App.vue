<template>
  <v-app>
    <v-navigation-drawer width="100%" permanent>
      <v-list
        nav
        color="transparent"
        v-for="n in listNodes"
        :key="n"
        draggable="true"
        :data-node="n.item"
        @dragstart="drag($event)"
        class="drag-drawflow"
      >
        <v-list-item class="node" :style="`background: ${n.color}`">
          {{ n.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
    </v-app-bar>

    <v-main id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)" />

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Drawflow from "drawflow";
import "drawflow/dist/drawflow.min.css";
import "@/assets/style.css";
import {
  onMounted,
  shallowRef,
  h,
  getCurrentInstance,
  render,
  readonly,
  ref,
} from "vue";
import startNode from "@/components/nodes/startNode.vue";
import endNode from "@/components/nodes/endNode.vue";
import taskNode from "@/components/nodes/taskNode.vue";
import parallelNode from "@/components/nodes/parallelNode.vue";
import mapNode from "@/components/nodes/mapNode.vue";
import passNode from "@/components/nodes/passNode.vue";
import waitNode from "@/components/nodes/waitNode.vue";
import choiceNode from "@/components/nodes/choiceNode.vue";
import succeedNode from "@/components/nodes/succeedNode.vue";
import failNode from "@/components/nodes/failNode.vue";

export default {
  name: "drawflowComponent",
  setup() {
    const listNodes = readonly([
      {
        name: "Start",
        color: "white",
        item: "startNode",
        input: 0,
        output: 1,
      },
      {
        name: "End",
        color: "white",
        item: "endNode",
        input: 1,
        output: 0,
      },
      {
        name: "Task",
        color: "white",
        item: "taskNode",
        input: 1,
        output: 1,
      },
      {
        name: "Parallel",
        color: "white",
        item: "parallelNode",
        input: 1,
        output: 2,
      },
      {
        name: "Map",
        color: "white",
        item: "mapNode",
        input: 1,
        output: 2,
      },
      {
        name: "Pass",
        color: "white",
        item: "passNode",
        input: 1,
        output: 1,
      },
      {
        name: "Wait",
        color: "white",
        item: "waitNode",
        input: 1,
        output: 1,
      },
      {
        name: "Choice",
        color: "white",
        item: "choiceNode",
        input: 1,
        output: 2,
      },
      {
        name: "Succeed",
        color: "white",
        item: "succeedNode",
        input: 1,
        output: 0,
      },
      {
        name: "Fail",
        color: "white",
        item: "failNode",
        input: 1,
        output: 0,
      },
    ]);

    const editor = shallowRef({});
    const dialogVisible = ref(false);
    const dialogData = ref({});
    const Vue = { version: 3, h, render };
    const internalInstance = getCurrentInstance();
    internalInstance.appContext.app._context.config.globalProperties.$df =
      editor;

    function exportEditor() {
      dialogData.value = editor.value.export();
      dialogVisible.value = true;
    }

    const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target
          .closest(".drag-drawflow")
          .getAttribute("data-node");
      } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
      }
    };
    const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document
          .elementFromPoint(
            mobile_last_move.touches[0].clientX,
            mobile_last_move.touches[0].clientY
          )
          .closest("#drawflow");
        if (parentdrawflow != null) {
          addNodeToDrawFlow(
            mobile_item_selec,
            mobile_last_move.touches[0].clientX,
            mobile_last_move.touches[0].clientY
          );
        }
        mobile_item_selec = "";
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }
    };
    const allowDrop = (ev) => {
      ev.preventDefault();
    };

    let mobile_item_selec = "";
    let mobile_last_move = null;
    function positionMobile(ev) {
      mobile_last_move = ev;
    }

    function addNodeToDrawFlow(name, pos_x, pos_y) {
      pos_x =
        pos_x *
          (editor.value.precanvas.clientWidth /
            (editor.value.precanvas.clientWidth * editor.value.zoom)) -
        editor.value.precanvas.getBoundingClientRect().x *
          (editor.value.precanvas.clientWidth /
            (editor.value.precanvas.clientWidth * editor.value.zoom));
      pos_y =
        pos_y *
          (editor.value.precanvas.clientHeight /
            (editor.value.precanvas.clientHeight * editor.value.zoom)) -
        editor.value.precanvas.getBoundingClientRect().y *
          (editor.value.precanvas.clientHeight /
            (editor.value.precanvas.clientHeight * editor.value.zoom));

      const nodeSelected = listNodes.find((ele) => ele.item == name);
      editor.value.addNode(
        name,
        nodeSelected.input,
        nodeSelected.output,
        pos_x,
        pos_y,
        name,
        {},
        name,
        "vue"
      );
    }

    onMounted(() => {
      var elements = document.getElementsByClassName("drag-drawflow");
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("touchend", drop, false);
        elements[i].addEventListener("touchmove", positionMobile, false);
        elements[i].addEventListener("touchstart", drag, false);
      }

      const id = document.getElementById("drawflow");
      editor.value = new Drawflow(
        id,
        Vue,
        internalInstance.appContext.app._context
      );
      editor.value.start();

      editor.value.registerNode("startNode", startNode, {}, {});
      editor.value.registerNode("endNode", endNode, {}, {});
      editor.value.registerNode("taskNode", taskNode, {}, {});
      editor.value.registerNode("parallelNode", parallelNode, {}, {});
      editor.value.registerNode("mapNode", mapNode, {}, {});
      editor.value.registerNode("passNode", passNode, {}, {});
      editor.value.registerNode("waitNode", waitNode, {}, {});
      editor.value.registerNode("choiceNode", choiceNode, {}, {});
      editor.value.registerNode("succeedNode", succeedNode, {}, {});
      editor.value.registerNode("failNode", failNode, {}, {});

      editor.value.import({
        drawflow: {
          Home: {
            data: {
              1: {
                id: 1,
                name: "taskNode",
                data: {},
                class: "taskNode",
                html: "taskNode",
                typenode: "vue",
                inputs: {
                  input_1: {
                    connections: [],
                  },
                },
                outputs: {
                  output_1: {
                    connections: [],
                  },
                },
                pos_x: 190,
                pos_y: 272,
              },
            },
          },
        },
      });
    });

    return {
      exportEditor,
      listNodes,
      drag,
      drop,
      allowDrop,
      dialogVisible,
      dialogData,
    };
  },
};
</script>

<style scoped>
#drawflow {
  width: 100%;
  height: 100%;
  text-align: initial;
  background: white;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}
</style>
