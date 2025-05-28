const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.completed ? "completed flex-grow-1" : "flex-grow-1";
    span.style.cursor = "pointer";
    span.onclick = () => toggleComplete(index);

    const btnGroup = document.createElement("div");

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-warning me-2";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editTask(index);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteTask(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
});

renderTasks();
