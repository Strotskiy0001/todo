class TodoController {
  #container$ = null;
  #view$ = null;
  #model$ = null;
  #allTodos$ = null;
  constructor(el) {
    this.#container$ = el;
    this.#view$ = new TodoView(this.#container$, {
      onCreate: this.onCreateTodo,
      onDelete: this.onDeleteTodo,
      onComplete: this.onCompleteTodo,
    });
    this.#model$ = new TodoModel("todos/");
    // console.log(this.#model$);
    this.#model$.getAllTodos().then((r) => {
      this.#view$.renderTodos(r);
      this.#allTodos$ = r;
      // console.log(this.#allTodos$);
    });
  }

  onCreateTodo = (todo) => {
    this.#model$.createTodo(todo).then((r) => {
      this.#view$.createSingleTodo(r);
      this.#model$.allTodos.push(r);
    });
  };

  onDeleteTodo = (id) => {
    this.#model$.deleteSingleTodo(id).then((r) => {
      this.changeTodo(r);
      this.#view$.renderTodos(this.#model$.allTodos);
    });
  };

  onCompleteTodo = (id) => {
    this.#model$.completedSingleTodo(id).then((r) => {
      this.changeTodo(r);
      this.#view$.renderTodos(this.#allTodos$);
    });
  };

  changeTodo(todo) {
    // console.log(this.#allTodos$);
    this.#allTodos$ = this.#model$.allTodos.map((e) =>
      e.id === todo.id ? todo : e
    );
  }
}
