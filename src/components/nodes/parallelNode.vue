<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import baseNode from "./baseNode.vue";

const _type = ref("Parallel");
const _stateName = ref(
  _type.value + "_" + getCurrentInstance()?.uid.toString()
);
const _comment = ref("");

const nodeData = ref({
  type: _type,
  stateName: _stateName,
  comment: _comment,
});
</script>

<template>
  <base-node v-bind:nodeData="nodeData">
    <v-form>
      <v-container>
        <v-text-field label="State Name" v-model="_stateName"></v-text-field>
        <v-text-field label="Comment" v-model="_comment"></v-text-field>
      </v-container>
    </v-form>
  </base-node>
</template>
