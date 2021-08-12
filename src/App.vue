<template>
  <form @submit.prevent="addTodo">
    <input v-model.trim="newTodoTitle" placeholder="Enter your todo" />
    <button :disabled="newTodoTitle === ''">Add todo</button>
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
      <input v-else v-model.trim="todo.title" class="edit-todo-input" />
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

const TODOS_STORAGE_KEY = "todos";

export default defineComponent({
  name: "App",
  data() {
    return {
      newTodoTitle: "",
      todos: [] as Todo[],
    };
  },
  beforeMount(): void {
    this.loadTodos();
  },
  watch: {
    todos: {
      handler(todos: Todo[]): void {
        this.saveTodos(todos);
      },
      deep: true,
    },
  },
  methods: {
    addTodo(): void {
      this.todos.push({
        id: Date.now(),
        title: this.newTodoTitle,
        completed: false,
        editing: false,
      });
      this.newTodoTitle = "";
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
    saveTodos(todos: Todo[]): void {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    },
    loadTodos(): void {
      const todos = localStorage.getItem(TODOS_STORAGE_KEY);
      if (todos === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(todos);
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
  margin-top: 60px;
  text-align: center;
  .delete-todos {
    width: 246px;
  }
  .todos {
    margin-top: 10px;
    .todo {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      &.completed .title {
        text-decoration: line-through;
      }
      .title,
      .edit-todo-input {
        flex-basis: 50%;
        text-align: right;
      }
      .title {
        margin-right: 10px;
      }
    }
  }
}
</style>
