class TodoModel {
  #http = null;
  #endpoint = null;
  allTodos = null;
  constructor(endpoint) {
    this.#endpoint = endpoint;
    this.#http = new Http();
  }

  getAllTodos() {
    return this.#http.getAll(this.#endpoint).then((r) => {
      this.allTodos = r;
      return r;
    });
  }

  createTodo(todo) {
    console.log(todo);
    return this.#http
      .create(this.#endpoint, { ...todo, isComplete: false })
      .then((r) => r);
  }

  deleteSingleTodo(id) {
    this.allTodos = this.allTodos.filter((el) => el.id !== id);
    console.log(this.allTodos);
    return this.#http.delete(this.#endpoint, id);
  }

  completedSingleTodo(id) {
    const todo = {
      ...this.allTodos.find((todo) => todo.id === id),
      isComplete: true,
    };
    console.log(todo);
    return this.#http.update(this.#endpoint, id, todo).then((r) => r);
  }
}
