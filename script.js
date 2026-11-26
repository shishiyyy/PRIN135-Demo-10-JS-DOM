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


function addTodo(text, hours) {
	  todos.push({
		id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
		text,
		hours,
		completed: false,
	  });
	  
	  render();
	}


function parseHours(value) {
	  const parsed = parseFloat(value);
	  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
	}
const form = document.getElementById("todo-form");
	const input = document.getElementById("todo-input");
	const hoursInput = document.getElementById("hours-input");


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


function totalHoursLeft() {
	  let total = 0;
	  for (const todo of todos) {
		if (!todo.completed && typeof todo.hours === "number") {
		  total += todo.hours;
		}
	  }
	  return total;
	}
const countEl = document.getElementById("todo-count");


function deleteTodo(id) {
	  todos = todos.filter((t) => t.id !== id);
	  render();
	}
list.addEventListener("click", (e) => {
	  if (e.target.matches(".delete-btn")) {
		deleteTodo(e.target.closest(".todo-item").dataset.id);
	  }
	});


const clearCompletedBtn = document.getElementById("clear-completed");
const hasCompleted = todos.some((t) => t.completed);
	clearCompletedBtn.hidden = !hasCompleted;


function clearCompleted() {
	  todos = todos.filter((t) => !t.completed);
	  render();
	}
clearCompletedBtn.addEventListener("click", clearCompleted);


function toggleTodo(id) {
	  const todo = todos.find((t) => t.id === id);
	  if (todo) todo.completed = !todo.completed;
	  render();
	}
list.addEventListener("change", (e) => {
	  if (e.target.matches('input[type="checkbox"]')) {
		toggleTodo(e.target.closest(".todo-item").dataset.id);
	  }
	});


const toggleAllBtn = document.getElementById("toggle-all");
toggleAllBtn.hidden = todos.length === 0;
	toggleAllBtn.textContent = todos.length > 0 && todos.every((t) => t.completed) ? "Mark all active" : "Mark all done";


function toggleAll() {
	  const allDone = todos.length > 0 && todos.every((t) => t.completed);
	  todos.forEach((t) => (t.completed = !allDone));
	  render();
	}
toggleAllBtn.addEventListener("click", toggleAll);


let currentFilter = "all";
function visibleTodos() {
	  if (currentFilter === "active") return todos.filter((t) => !t.completed);
	  if (currentFilter === "completed") return todos.filter((t) => t.completed);
	  return todos;
	}


const items = visibleTodos();


const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach((btn) => {
	  btn.addEventListener("click", () => {
		currentFilter = btn.dataset.filter;
		render();
	  });
});


filterButtons.forEach((btn) => {
		const active = btn.dataset.filter === currentFilter;
		btn.classList.toggle("active", active);
	  });


render();