<template>
  <v-layout>
    <v-row justify="space-around" no-gutters>
      <v-col>
        <span>Task</span>
      </v-col>
      <v-col>
        <v-btn variant="outlined" size="x-small"> Edit </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      nodeName: "Task",
    };
  },
};
</script>
