class TodoView {
  #container$ = null;
  #listContainer = null;
  #options = null;
  constructor(container, options) {
    this.#options = options;
    this.#container$ = container;
    this.init();
    console.log(this.#options);
  }

  init() {
    this.initialRender();
  }
  initialRender() {
    this.#container$.append(this.createInitialBlock());
    this.initListeners();

    console.log(this.#listContainer);
  }

  initListeners() {
    this.#listContainer = $(".list-container").on("click", this.onTodoClick);
    $(".create-btn").on("click", () => this.onTodoCreate());
    $(this.#container$).on("click", ".buttons-delete", (e) =>
      this.deleteTodo(e)
    );
    this.#listContainer.on("click", ".buttons", (e) => this.completeTodo(e));
  }

  onTodoCreate = () => {
    const title = $("#title").val();
    const body = $("#body").val();
    this.#options.onCreate({ title, body });
    $("#title").val("");
    $("#body").val("");
  };

  onTodoClick = () => {};

  renderTodos(todos) {
    const html = todos.map((e) => this.createElement(e)).join("");
    this.#listContainer.html(html);
    // console.log(todos);
  }

  createElement(todo) {
    return `
    <div class="full-todo ${todo.isComplete ? "completed" : ""}" id="${
      todo.id
    }">
    <div>${todo.title}</div>
    <div>${todo.body}</div>
    <button class="buttons-delete">x</button>
    <button class="buttons">Complete</button>
    </div>
    `;
  }

  createSingleTodo(todo) {
    $(".list-container").append(this.createElement(todo));
  }

  deleteTodo = (e) => {
    let id = $(e.target).parents(".full-todo").attr("id");
    this.#options.onDelete(id);
  };

  completeTodo = (event) => {
    const id = event.target.closest(".full-todo").id;
    let complete = $(event.target).parents(".full-todo").addClass("completed");
    // console.log("WORK", complete);
    this.#options.onComplete(id);
  };

  createInitialBlock() {
    return `<div>
    <div class="btn-container">
    <input id="title" type="text" />
    <input id="body" type="text" />
    <button class="create-btn">Add Todo</button>
    </div>
    <div class="list-container"></div>
    </div>`;
  }
}
