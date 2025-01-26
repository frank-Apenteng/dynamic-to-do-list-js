document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }

  // Save tasks to Local Storage
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Create a new task element
  function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      removeTask(taskText);
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
  }

  // Add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    createTaskElement(taskText);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    saveTasks(tasks);

    taskInput.value = "";
  }

  // Remove a task
  function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((task) => task !== taskText);
    saveTasks(updatedTasks);
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Add event listener to the task input field for the "Enter" key
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load tasks when the page loads
  loadTasks();
});
