import TodoModel from "@/todo.model";

const TODOS_STORAGE_KEY = "todos";

export default {
  save(todos: TodoModel[]): void {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  },
  fetch(): TodoModel[] {
    const todos = localStorage.getItem(TODOS_STORAGE_KEY);
    if (todos === null) {
      return [];
    } else {
      return JSON.parse(todos);
    }
  },
};
