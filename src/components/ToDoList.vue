<template>
  <v-card max-width="600" class="mx-auto ">
    <v-toolbar color="light-blue" dark>
      <newToDo @add-new-to-do="addNewToDo" />
      <v-spacer></v-spacer>
      <v-toolbar-title>My ToDos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        placeholder="Filter by Title"
        filled
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
        class="mt-6 expanding-search"
        :class="{ closed: searchClosed && !search }"
      ></v-text-field>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group color="primary">
        <div v-for="(toDo, i) in toDos" :key="toDo.i">
          <toDo
            v-if="search == null || search.length == 0"
            :toDo="toDo"
            @delete-to-do="deleteToDo(i)"
            @save-to-do="saveToDo($event, i)"
          />
          <toDo
            v-else-if="search.length > 0 && search == toDo.title"
            :toDo="toDo"
            @delete-to-do="deleteToDo(i)"
            @save-to-do="saveToDo($event, i)"
          />
        </div>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import ToDo from "./ToDo";
import NewToDo from "./NewToDo";
import axios from "axios";

export default {
  name: "ToDoList",
  components: {
    ToDo,
    NewToDo
  },
  data: () => ({
    toDos: [],
    searchClosed: true,
    search: null
  }),
  methods: {
    deleteToDo(index) {
      this.toDos.splice(index, 1);
      axios
        .delete("/todos/index/" + index)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addNewToDo(toDo) {
      this.toDos.push(toDo);
      axios
        .post("/todos", toDo)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveToDo(editedToDo, index) {
      this.toDos[index].title = editedToDo.title;
      this.toDos[index].description = editedToDo.description;
      this.toDos[index].dueDate = editedToDo.dueDate;
      this.toDos[index].completed = editedToDo.completed;
      axios
        .put("/todos/index/" + index, editedToDo)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/todos")
      .then(res => {
        console.log(res);
        this.toDos = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang="sass">
.v-input.expanding-search
    transition: max-width 0.5s
    .v-input__slot
        cursor: pointer !important
        &:before, &:after
            border-color: transparent !important
    &.closed
        max-width: 45px
        .v-input__slot
            background: transparent !important
</style>
