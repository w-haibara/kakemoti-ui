<script setup>
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

const Vue = { version: 3, h, render };

const editor = shallowRef({});
const internalInstance = getCurrentInstance();
internalInstance.appContext.app._context.config.globalProperties.$df = editor;

const exportedJsonDialog = ref(false);
const dialogVisible = ref(false);
const dialogData = ref({});
const dialogString = ref({});

const listNodes = readonly([
  {
    name: "Start",
    color: "white",
    item: "Start",
    input: 0,
    output: 1,
  },
  {
    name: "End",
    color: "white",
    item: "End",
    input: 1,
    output: 0,
  },
  {
    name: "Task",
    color: "white",
    item: "Task",
    input: 1,
    output: 1,
  },
  {
    name: "Parallel",
    color: "white",
    item: "Parallel",
    input: 1,
    output: 2,
  },
  {
    name: "Map",
    color: "white",
    item: "Map",
    input: 1,
    output: 2,
  },
  {
    name: "Pass",
    color: "white",
    item: "Pass",
    input: 1,
    output: 1,
  },
  {
    name: "Wait",
    color: "white",
    item: "Wait",
    input: 1,
    output: 1,
  },
  {
    name: "Choice",
    color: "white",
    item: "Choice",
    input: 1,
    output: 2,
  },
  {
    name: "Succeed",
    color: "white",
    item: "Succeed",
    input: 1,
    output: 0,
  },
  {
    name: "Fail",
    color: "white",
    item: "Fail",
    input: 1,
    output: 0,
  },
]);

function exportEditor() {
  dialogData.value = editor.value.export();
  dialogString.value = JSON.stringify(dialogData.value, null, 2);
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

  editor.value.registerNode("Start", startNode, {}, {});
  editor.value.registerNode("End", endNode, {}, {});
  editor.value.registerNode("Task", taskNode, {}, {});
  editor.value.registerNode("Parallel", parallelNode, {}, {});
  editor.value.registerNode("Map", mapNode, {}, {});
  editor.value.registerNode("Pass", passNode, {}, {});
  editor.value.registerNode("Wait", waitNode, {}, {});
  editor.value.registerNode("Choice", choiceNode, {}, {});
  editor.value.registerNode("Succeed", succeedNode, {}, {});
  editor.value.registerNode("Fail", failNode, {}, {});

  const inputJson = {
    drawflow: {
      Home: {
        data: {
          1: {
            id: 1,
            name: "Start",
            data: {
              key1: "aaa",
            },
            class: "Start",
            html: "Start",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "2",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 7,
            pos_y: 55,
          },
          2: {
            id: 2,
            name: "Task",
            data: {
              key1: "aaa",
            },
            class: "Task",
            html: "Task",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "1",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "3",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 260,
            pos_y: 129,
          },
          3: {
            id: 3,
            name: "End",
            data: {},
            class: "End",
            html: "End",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "2",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 512,
            pos_y: 182,
          },
        },
      },
    },
  };
  editor.value.import(inputJson);
});
</script>

<template>
  <v-app>
    <v-main app>
      <div id="drawflow" />

      <v-navigation-drawer app permanent width="130">
        <v-list-item>
          <v-dialog v-model="exportedJsonDialog">
            <template v-slot:activator="{ attrs }">
              <v-btn
                block
                variant="flat"
                color="primary"
                v-on:click="exportEditor"
                v-bind="attrs"
                @click.stop="exportedJsonDialog = true"
              >
                Export
              </v-btn>
            </template>

            <v-card width="700">
              <v-card-title> Exported JSON </v-card-title>

              <v-card-text>
                <pre>{{ dialogString }}</pre>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="exportedJsonDialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav color="transparent">
          <div v-for="node in listNodes" :key="node" :data-node="node.item">
            <v-list-item class="node">
              <v-btn
                block
                variant="outlined"
                v-on:click="addNodeToDrawFlow(node.item, 190, 270)"
              >
                {{ node.name }}
              </v-btn>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

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
