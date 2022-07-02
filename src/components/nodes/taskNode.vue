<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
const nodeName = ref("Task");
const dialog = ref(false);

const internalInstance = getCurrentInstance();
const editor =
  internalInstance.appContext.app._context.config.globalProperties.$df;

const nodeDataVar1 = ref("aaa");
const nodeData = ref({
  key1: nodeDataVar1,
});

function updateNodeData() {
  nodeData.value.key1 = nodeDataVar1.value;
  editor.value.updateNodeDataFromId(1, nodeData.value);
}

onMounted(() => {
  updateNodeData();
});
</script>

<template>
  <v-layout>
    <v-row justify="space-around" no-gutters>
      <v-col>
        <span>Task</span>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ attrs }">
              <v-btn
                variant="outlined"
                size="x-small"
                v-bind="attrs"
                @click.stop="dialog = true"
              >
                Edit
              </v-btn>
            </template>

            <v-card width="700">
              <v-card-title> {{ nodeName }} </v-card-title>

              <v-card-text>
                <v-text-field
                  label="Regular"
                  v-model="nodeDataVar1"
                ></v-text-field>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn
                  color="warning"
                  text
                  @click="dialog = false"
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
</template>
