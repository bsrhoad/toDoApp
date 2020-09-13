<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex display-1 ">
        {{ appTitle }}
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="ma-6">
      <ToDoList />
    </v-main>
  </v-app>
</template>

<script>
import ToDoList from "./components/ToDoList";

export default {
  name: "App",

  components: {
    ToDoList
  },

  data: () => ({
    appTitle: "ToDo App"
  })
};
</script>
