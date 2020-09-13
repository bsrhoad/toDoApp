<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon x-large>
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline, blue--text text--darken-1">New ToDo</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Title"
                required
                v-model="title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Description"
                v-model="description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center">
            Due Date
          </v-row>
          <v-row justify="center">
            <v-date-picker v-model="dueDate"></v-date-picker>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="addNewToDo" id="add">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewToDo",
  data: () => ({
    dialog: false,
    title: "",
    description: "",
    dueDate: new Date().toISOString().substr(0, 10)
  }),
  methods: {
    addNewToDo() {
      this.$emit("add-new-to-do", {
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        completed: false
      });
      this.dialog = false;
      this.title = "";
      this.description = "";
      this.dueDate = new Date().toISOString().substr(0, 10);
    }
  }
};
</script>
