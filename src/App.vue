<template>
  <v-app>
    <v-navigation-drawer app permanent width="130">
      <v-list
        nav
        color="transparent"
        v-for="node in listNodes"
        :key="node"
        :data-node="node.item"
      >
        <v-list-item class="node">
          <v-btn
            block
            variant="outlined"
            v-on:click="this.addNodeToDrawFlow(node.item, 190, 270)"
          >
            {{ node.name }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app absolute dense flat color="white">
      <v-toolbar-title>Workflow editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="primary" v-on:click="alertExportData">
        Export
      </v-btn>
    </v-app-bar>

    <v-main app id="drawflow" />

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
  data() {
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
                pos_y: 270,
              },
            },
          },
        },
      });
    });

    return {
      exportEditor,
      listNodes,
      addNodeToDrawFlow,
      dialogVisible,
      dialogData,
    };
  },
  methods: {
    alertExportData: function () {
      this.exportEditor();
      if (this.dialogVisible) {
        alert(JSON.stringify(this.dialogData));
      }
    },
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
