<template>
  <v-list-item>
    <v-list-item-avatar @click="toDo.completed = !toDo.completed">
      <v-icon color="blue" v-if="!toDo.completed">
        mdi-checkbox-blank-circle-outline
      </v-icon>
      <v-icon color="blue" v-else>
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-list-item-avatar>

    <v-list-item-content @click="editToDo()">
      <v-list-item-title
        v-text="toDo.title + ' by ' + formattedDueDate"
      ></v-list-item-title>
      <v-list-item-subtitle v-text="toDo.description"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-dialog v-model="deleteDialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="blue">
            <v-icon>
              mdi-trash-can-outline
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline blue--text text--darken-1">
            Delete the ToDo?
          </v-card-title>
          <v-card-text>
            {{ toDo.title }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="deleteToDo()">
              Continue
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteDialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item-action>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline, blue--text text--darken-1">Edit ToDo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  required
                  v-model="editTitle"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  label="Description"
                  v-model="editDescription"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row justify="center">
              Due Date
            </v-row>
            <v-row justify="center">
              <v-date-picker v-model="editDueDate"></v-date-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveToDo()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import moment from "moment";

export default {
  name: "ToDo",
  props: {
    toDo: {
      type: Object,
      default: () => {
        return {
          title: "",
          description: "",
          dueDate: "",
          completed: false
        };
      }
    }
  },
  data: () => ({
    deleteDialog: false,
    editDialog: false,
    editTitle: "",
    editDescription: "",
    editDueDate: new Date().toISOString().substr(0, 10)
  }),
  computed: {
    formattedDueDate() {
      return this.toDo.dueDate
        ? moment(this.toDo.dueDate).format("dddd, MMMM Do YYYY")
        : "";
    }
  },
  methods: {
    deleteToDo() {
      this.$emit("delete-to-do");
      this.deleteDialog = false;
    },
    editToDo() {
      this.editDialog = true;
      this.editTitle = this.toDo.title;
      this.editDescription = this.toDo.description;
      this.editDueDate = this.toDo.dueDate;
    },
    saveToDo() {
      this.$emit("save-to-do", {
        title: this.editTitle,
        description: this.editDescription,
        dueDate: this.editDueDate,
        completed: this.toDo.completed
      });
      this.editDialog = false;
    }
  }
};
</script>
