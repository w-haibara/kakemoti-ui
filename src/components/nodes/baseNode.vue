<script setup lang="ts">
import {
  withDefaults,
  defineProps,
  ref,
  onMounted,
  getCurrentInstance,
  nextTick,
} from "vue";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeData: any;
}

const props = withDefaults(defineProps<Props>(), {
  nodeData: {},
});

const internalInstance = getCurrentInstance();
const uid = ref("base-node-" + internalInstance?.uid.toString());
const dialogCloseBtnId = ref(uid.value + "-dialog-close-btn");
const editor =
  internalInstance?.appContext.app._context.config.globalProperties.$df;

const nodeId = ref(1);
const nodeName = ref("");
const currentNode = ref({ name: "" });

const dialog = ref(false);

function getCurrentNodeInfo() {
  const elmId = document
    .getElementById(uid.value)
    ?.parentElement?.parentElement?.getAttribute("id");
  nodeId.value = Number(elmId?.replace(/^node-/, ""));
  currentNode.value = editor.value.getNodeFromId(nodeId.value);
  nodeName.value = currentNode.value.name;
}

function updateNodeData() {
  editor.value.updateNodeDataFromId(nodeId.value, props.nodeData);
}

async function openEditDialog() {
  dialog.value = true;

  await nextTick;
  document.getElementById(dialogCloseBtnId?.value)?.focus();
}

async function closeEditDialog() {
  dialog.value = false;

  await nextTick;
  document.getElementById("v-main")?.focus();
}

onMounted(async () => {
  await nextTick;

  getCurrentNodeInfo();
  updateNodeData();

  openEditDialog;
});
</script>

<template>
  <div v-bind:id="uid">
    <v-layout>
      <v-row justify="space-around" no-gutters>
        <v-col>
          <span> {{ nodeName }} </span>
        </v-col>
        <v-col>
          <div class="text-center">
            <v-dialog v-model="dialog" persistent width="500">
              <template v-slot:activator="{ isActive }">
                <v-btn
                  variant="outlined"
                  size="x-small"
                  v-bind="isActive"
                  @click.stop="openEditDialog()"
                >
                  Edit
                </v-btn>
              </template>

              <v-card width="700">
                <v-card-title> {{ nodeName }} </v-card-title>

                <v-card-text>
                  <slot></slot>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-bind:id="dialogCloseBtnId"
                    color="primary"
                    text
                    @click="closeEditDialog"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="warning"
                    text
                    @click="closeEditDialog"
                    v-on:click="updateNodeData"
                  >
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
