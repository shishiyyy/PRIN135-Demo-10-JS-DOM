
let todos = [
    { id: "1", text: "Task X", hours: 1, completed: false },
    { id: "2", text: "Task Y", hours: 2.5, completed: true },
    { id: "3", text: "Task Z", hours: 6, completed: false }
];

const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const hoursInput = document.getElementById("hours-input");
const countEl = document.getElementById("todo-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const toggleAllBtn = document.getElementById("toggle-all");

// Get task difficulty
function getDifficulty(hours) {
    if (hours > 5) return "Hard";
    if (hours > 2) return "Medium";
    return "Easy";
}

// Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");

    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const hours = typeof todo.hours === "number" ? todo.hours : 0;
    const difficulty = getDifficulty(hours);

    const label = document.createElement("span");
    label.className = `difficulty difficulty-${difficulty.toLowerCase()}`;
    label.textContent = `${difficulty} · ${hours}h`;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "×";

    li.append(checkbox, text, label, del);

    return li;
}

// Calculate remaining hours
function totalHoursLeft() {
    return todos.reduce((total, todo) => {
        return total + (!todo.completed ? todo.hours : 0);
    }, 0);
}

// Update everything on screen
function render() {
    list.replaceChildren(...todos.map(createTodoElement));

    // Update task count and remaining hours
    if (countEl) {
        const completed = todos.filter(t => t.completed).length;
        countEl.textContent =
            `${completed}/${todos.length} completed · ${totalHoursLeft()} hours left`;
    }

    // Update clear completed button
    if (clearCompletedBtn) {
        clearCompletedBtn.hidden = !todos.some(t => t.completed);
    }

    // Update toggle all button
    if (toggleAllBtn) {
        toggleAllBtn.hidden = todos.length === 0;

        const allDone =
            todos.length > 0 && todos.every(t => t.completed);

        toggleAllBtn.textContent = allDone
            ? "Mark all active"
            : "Mark all done";
    }
}

// Add a task
function addTodo(text, hours) {
    todos.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text,
        hours,
        completed: false
    });

    render();
}

// Parse hours
function parseHours(value) {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    const hours = parseHours(hoursInput.value);

    if (!text) return;

    addTodo(text, hours);

    input.value = "";
    hoursInput.value = "0";
    input.focus();
});

// Delete a task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

list.addEventListener("click", (e) => {
    if (e.target.matches(".delete-btn")) {
        const item = e.target.closest(".todo-item");
        if (item) deleteTodo(item.dataset.id);
    }
});

// Clear completed tasks
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

// Toggle one task
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
    }

    render();
}

list.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        const item = e.target.closest(".todo-item");
        if (item) toggleTodo(item.dataset.id);
    }
});

// Toggle all tasks
function toggleAll() {
    const allDone =
        todos.length > 0 && todos.every(t => t.completed);

    todos.forEach(todo => {
        todo.completed = !allDone;
    });

    render();
}

toggleAllBtn.addEventListener("click", toggleAll);

// Initial display
render();
