let todos = [
    {"id":"1", "text":"Task X", "hours":1, "completed":false},
    {"id":"2", "text":"Task Y", "hours":2.5, "completed":true},
    {"id":"3", "text":"Task Z", "hours":6, "completed":false}
];
const list = document.getElementById("todo-list");
function getDifficulty(hours) {
    if (hours > 5) return "Hard";
    if (hours > 2) return "Medium";
    return "Easy";
}
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
    label.classList.add("difficulty");
    label.classList.add(`difficulty-${difficulty.toLocaleLowerCase()}`);
    label.textContent = `${difficulty} · ${hours}h`;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "x";

    li.append(checkbox, text, label, del);
    return li;
}
function render() {
    const items = todos;
    list.replaceChildren(...items.map(createTodoElement));
}
render();