interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
}

const STORAGE_KEY = "todos";

export default {
  save(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
  fetch(): Todo[] {
    const todos = localStorage.getItem(STORAGE_KEY);
    if (todos === null) {
      return [];
    } else {
      return JSON.parse(todos);
    }
  },
};
