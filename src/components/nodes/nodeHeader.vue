<template>
  <div class="header">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title"],
});
</script>

<style scoped>
div {
  margin-top: -15px;
  margin-left: -15px;
  margin-right: -15px;
  padding: 10px 15px;
  margin-bottom: 5px;
}
</style>
