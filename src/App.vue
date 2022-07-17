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
  nextTick,
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

const exportDialog = ref(false);
const exportDialogId = ref("export-dialog");
const exportDialogVisible = ref(false);
const exportDialogData = ref({});
const exportDialogString = ref({});

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
  exportDialogData.value = editor.value.export();
  exportDialogString.value = JSON.stringify(exportDialogData.value, null, 2);
  exportDialogVisible.value = true;
}

async function openExportDialog() {
  exportDialog.value = true;

  await nextTick;
  document.getElementById(exportDialogId.value).focus();
}

async function closeExportDialog() {
  exportDialog.value = false;

  await nextTick;
  document.getElementById("v-main").focus();
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

function keyEventListener(event) {
  if (!event.repeat) {
    if (event.key === "Enter") {
      exportEditor();
      openExportDialog();
    } else if (
      event.key in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    ) {
      const num = parseInt(event.key, 10);
      addNodeToDrawFlow(listNodes[num > 0 ? num - 1 : 9].name, 190, 270);
    }
  }
}

function listenKeyEvent() {
  const elm = document.getElementById("v-main");
  elm.focus();
  elm.addEventListener("keydown", keyEventListener, false);
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
              var1: "",
            },
            class: "Start",
            html: "Start",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "4",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: -6.25,
            pos_y: -52,
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
                    node: "9",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 999.25,
            pos_y: 312,
          },
          4: {
            id: 4,
            name: "Task",
            data: {},
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
                    node: "5",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 114.75,
            pos_y: 92,
          },
          5: {
            id: 5,
            name: "Parallel",
            data: {},
            class: "Parallel",
            html: "Parallel",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "4",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "6",
                    output: "input_1",
                  },
                ],
              },
              output_2: {
                connections: [
                  {
                    node: "10",
                    output: "input_1",
                  },
                  {
                    node: "13",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 135.5,
            pos_y: 263,
          },
          6: {
            id: 6,
            name: "Map",
            data: {},
            class: "Map",
            html: "Map",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "5",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "7",
                    output: "input_1",
                  },
                ],
              },
              output_2: {
                connections: [
                  {
                    node: "12",
                    output: "input_1",
                  },
                  {
                    node: "14",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 361,
            pos_y: 114.25,
          },
          7: {
            id: 7,
            name: "Pass",
            data: {},
            class: "Pass",
            html: "Pass",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "6",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "8",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 618,
            pos_y: -13.25,
          },
          8: {
            id: 8,
            name: "Wait",
            data: {},
            class: "Wait",
            html: "Wait",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "7",
                    input: "output_1",
                  },
                ],
              },
            },
            outputs: {
              output_1: {
                connections: [
                  {
                    node: "9",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 753.75,
            pos_y: 120,
          },
          9: {
            id: 9,
            name: "Choice",
            data: {},
            class: "Choice",
            html: "Choice",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "8",
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
              output_2: {
                connections: [
                  {
                    node: "11",
                    output: "input_1",
                  },
                ],
              },
            },
            pos_x: 759.75,
            pos_y: 371,
          },
          10: {
            id: 10,
            name: "Succeed",
            data: {},
            class: "Succeed",
            html: "Succeed",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "5",
                    input: "output_2",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 392,
            pos_y: 457.75,
          },
          11: {
            id: 11,
            name: "Fail",
            data: {},
            class: "Fail",
            html: "Fail",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "9",
                    input: "output_2",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 1004,
            pos_y: 472.75,
          },
          12: {
            id: 12,
            name: "Succeed",
            data: {},
            class: "Succeed",
            html: "Succeed",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "6",
                    input: "output_2",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 465,
            pos_y: 335.75,
          },
          13: {
            id: 13,
            name: "Succeed",
            data: {},
            class: "Succeed",
            html: "Succeed",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "5",
                    input: "output_2",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 284.75,
            pos_y: 556,
          },
          14: {
            id: 14,
            name: "Succeed",
            data: {},
            class: "Succeed",
            html: "Succeed",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [
                  {
                    node: "6",
                    input: "output_2",
                  },
                ],
              },
            },
            outputs: {},
            pos_x: 576.75,
            pos_y: 238,
          },
        },
      },
    },
  };
  editor.value.import(inputJson);

  listenKeyEvent();
});
</script>

<template>
  <v-app>
    <v-main app id="v-main" tabindex="0">
      <div id="drawflow" />

      <v-navigation-drawer app permanent width="140">
        <v-list-item>
          <v-dialog
            v-bind:id="exportDialogId"
            v-model="exportDialog"
            tabindex="0"
          >
            <template v-slot:activator="{ attrs }">
              <v-btn
                block
                variant="flat"
                color="primary"
                v-on:click="exportEditor"
                v-bind="attrs"
                @click="openExportDialog"
              >
                Export
              </v-btn>
            </template>

            <v-card width="700">
              <v-card-title> Exported JSON </v-card-title>

              <v-card-text>
                <pre>{{ exportDialogString }}</pre>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeExportDialog">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav color="transparent">
          <v-list-item
            class="node"
            v-for="(node, index) in listNodes"
            :key="node"
            :data-node="node.item"
            v-on:click="addNodeToDrawFlow(node.item, 190, 270)"
          >
            <v-list-item-avatar start>
              <v-icon>
                {{ "mdi-numeric-" + (index == 9 ? 0 : index + 1) + "-box" }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="node.name" />
          </v-list-item>
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
