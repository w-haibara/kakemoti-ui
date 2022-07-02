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

            <v-card>
              <v-card-title> Settings </v-card-title>

              <v-card-text> aaaaaaaaaaa </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      nodeName: "Task",
      dialog: false,
    };
  },
};
</script>
