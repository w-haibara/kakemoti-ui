<script setup lang="ts">
import { ref } from "vue";
import baseNode from "./baseNode.vue";

const var1 = ref("");
const nodeData = ref({
  var1: var1,
});
</script>

<template>
  <base-node v-bind:nodeData="nodeData">
    <v-form>
      <v-container>
        <v-text-field label="Regular" v-model="var1"></v-text-field>
      </v-container>
    </v-form>
  </base-node>
</template>
