let tod
let todos = [ 
    {"id":"1", "text":"Task 1", "hours":1, "completed":false},
    {"id":"2", "text":"Task 2", "hours":2.5, "completed":true},
    {"id":"3", "text":"Task 3", "hours":6, "completed":false}
];

const list = document.getElementById("todo-list");

function getDifficulty(hours) {
    if (hours < 2) { 
        return "Easy";
    } else if (hours < 5) { 
        return "Medium";
    } else {
        return "Hard";
    }
};

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function() {
        todo.completed = checkbox.checked;
        render();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const hours = typeof todo.hours === "number" ? todo.hours : 0;
    const difficulty = getDifficulty(hours);

    const label = document.createElement("span");
    label.classList.add("difficulty");
    label.classList.add(`difficulty-${difficulty.toLowerCase()}`);
    label.textContent = `${difficulty} . ${hours}h`;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "x";

    del.addEventListener("click", function() {
        todos = todos.filter(item => item.id !== todo.id);
        render();
    });

    li.append(checkbox, text, label, del);
    return li;
}

function render() {
    const items = todos;
    list.replaceChildren();

    items.forEach(todo => {
        list.appendChild(createTodoElement(todo));
    });
}
