<template>
  <form @submit.prevent="addTodo">
    <input v-model.trim="titleOfNewTodo" placeholder="Enter your todo" />
    <button>Add todo</button>
  </form>
  <button v-if="todos.length >= 2" @click="deleteTodos" class="delete-todos">
    Delete todos
  </button>
  <div v-if="todos.length >= 1" class="todos">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="todo"
      :class="{ completed: todo.completed }"
    >
      <span
        v-if="!todo.editing"
        @click="toggleCompleted(todo.id)"
        class="title"
      >
        {{ todo.title }}
      </span>
      <input v-else v-model.trim="todo.title" />
      <button @click="toggleEditing(todo.id)">
        {{ todo.editing ? "Save" : "Edit" }}
      </button>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </div>
  </div>
  <h4 v-else>Good job! You don't have any tasks</h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
}

export default defineComponent({
  name: "App",
  data() {
    return {
      titleOfNewTodo: "",
      todos: [] as Todo[],
    };
  },
  methods: {
    addTodo(): void {
      if (this.titleOfNewTodo === "") {
        return;
      }
      this.todos.push({
        id: Date.now(),
        title: this.titleOfNewTodo,
        completed: false,
        editing: false,
      });
      this.titleOfNewTodo = "";
    },
    deleteTodo(id: number): void {
      const index = this.todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    deleteTodos(): void {
      this.todos = [];
    },
    toggleEditing(id: number): void {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.editing = !todo.editing;
      }
    },
    toggleCompleted(id: number): void {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  .delete-todos {
    width: 246px;
  }
  .todos {
    margin-top: 10px;
    .todo {
      margin-bottom: 1px;
      &.completed .title {
        text-decoration: line-through;
      }
      .title {
        margin-right: 5px;
      }
    }
  }
}
</style>
