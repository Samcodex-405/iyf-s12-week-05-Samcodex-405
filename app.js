// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State: an array of objects, the list is redrawn from it
let todos = [];
let currentFilter = "all";
let nextId = 1;

// Functions
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    li.classList.toggle("completed", todo.completed);

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text; // textContent: user text is never parsed as HTML

    const del = document.createElement("button");
    del.className = "delete";
    del.type = "button";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task: " + todo.text);

    li.append(span, del);
    return li;
}

function renderTodos() {
    todoList.textContent = ""; // clear the list

    const visible = todos.filter(function (todo) {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    if (visible.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = todos.length === 0 ? "Nothing here yet. Add your first task." : "No tasks in this view.";
        todoList.appendChild(empty);
    }

    visible.forEach(function (todo) {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();
}

function addTodo(text) {
    todos.push({ id: nextId++, text: text, completed: false });
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(function (t) { return t.id === id; });
    if (todo) todo.completed = !todo.completed;
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    renderTodos();
}

function updateTodoText(id, text) {
    const todo = todos.find(function (t) { return t.id === id; });
    if (todo) todo.text = text;
    renderTodos();
}

function updateStats() {
    const count = todos.filter(function (t) { return !t.completed; }).length;
    itemsLeft.textContent = count + (count === 1 ? " item left" : " items left");
}

function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderTodos();
}

// Event Listeners
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page reloading
    const text = input.value.trim();
    if (text === "") {          // refuse empty or spaces-only tasks
        input.value = "";
        input.focus();
        return;
    }
    addTodo(text);
    input.value = "";           // clear the input
    input.focus();
});

// ONE click listener on the list (event delegation)
todoList.addEventListener("click", function (event) {
    const li = event.target.closest("li.todo-item");
    if (!li) return;
    if (event.target.closest("input.edit-input")) return; // clicking inside the edit box does nothing
    const id = Number(li.dataset.id);

    if (event.target.closest("button.delete")) {
        deleteTodo(id);
    } else {
        toggleTodo(id);
    }
});

// Bonus: double-click to edit, Enter saves, Escape cancels
todoList.addEventListener("dblclick", function (event) {
    const span = event.target.closest(".todo-text");
    if (!span) return;
    const li = span.closest("li.todo-item");
    const id = Number(li.dataset.id);
    const todo = todos.find(function (t) { return t.id === id; });

    const editor = document.createElement("input");
    editor.type = "text";
    editor.className = "edit-input";
    editor.value = todo.text;
    span.replaceWith(editor);
    editor.focus();
    editor.select();
});

todoList.addEventListener("keydown", function (event) {
    const editor = event.target.closest("input.edit-input");
    if (!editor) return;
    const id = Number(editor.closest("li.todo-item").dataset.id);

    if (event.key === "Enter") {
        const text = editor.value.trim();
        if (text === "") return;
        updateTodoText(id, text);
    } else if (event.key === "Escape") {
        renderTodos(); // cancel: redraw from the unchanged array
    }
});

filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
        filterTodos(btn.dataset.filter);
    });
});

clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter(function (t) { return !t.completed; });
    renderTodos();
});

// Initialize
renderTodos();