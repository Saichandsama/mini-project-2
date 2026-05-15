let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div class="task-info">
        <div class="task-text">${task.text}</div>
        <div class="task-date">
          📅 ${task.datetime ? new Date(task.datetime).toLocaleString() : "No deadline set"}
        </div>
      </div>

      <div class="actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Done"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");

  const text = taskInput.value.trim();

  if (!text) {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: text,
    datetime: taskDateTime.value,
    completed: false,
  });

  taskInput.value = "";
  taskDateTime.value = "";

  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();