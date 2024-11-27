// DOM Elements
const taskNameInput = document.querySelector("#new-task input");
const taskPriorityInput = document.querySelector("#task-priority");
const taskDateInput = document.querySelector("#task-date");
const addButton = document.querySelector("#push");
const tasksContainer = document.querySelector("#tasks");
const feedback = document.querySelector("#feedback");

// Task List and Edit Index
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

// Display Feedback
const displayFeedback = (message, color = "red") => {
  feedback.textContent = message;
  feedback.style.color = color;
  setTimeout(() => (feedback.textContent = ""), 3000);
};

// Save Tasks to Local Storage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Render Task List
const renderTasks = () => {
  tasksContainer.innerHTML = ""; // Clear Existing Tasks

  if (tasks.length === 0) {
    tasksContainer.innerHTML = "<p>No tasks available!</p>";
    return;
  }

  tasks.forEach((task, index) => {
    // Create Task Element
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.completed ? "completed" : ""}`;

    // Task Content
    taskDiv.innerHTML = `
      <span>${task.name} (${task.dueDate})</span>
      <span class="priority">${task.priority}</span>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Add Event Listeners
    taskDiv.querySelector(".edit").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent Event Bubbling
      editTask(index);
    });

    taskDiv.querySelector(".delete").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent Event Bubbling
      deleteTask(index);
    });

    taskDiv.addEventListener("click", () => toggleTaskCompletion(index));
    tasksContainer.appendChild(taskDiv);
  });
};

// Add New Task
const addTask = () => {
  const name = taskNameInput.value.trim(); // Task Name
  const priority = taskPriorityInput.value; // Task Priority
  const dueDate = taskDateInput.value; // Task Due Date

  // Validation
  if (!name) {
    displayFeedback("Task name cannot be empty!");
    return;
  }

  if (!dueDate) {
    displayFeedback("Please select a due date!");
    return;
  }

  // Check if Editing or Adding New Task
  if (editIndex !== null) {
    // Update the Existing Task
    tasks[editIndex] = { name, priority, dueDate, completed: false };
    editIndex = null; // Reset the Edit Index
    displayFeedback("Task updated successfully!", "green");
  } else {
    // Add New Task
    tasks.push({ name, priority, dueDate, completed: false });
    displayFeedback("Task added successfully!", "green");
  }

  saveTasks(); // Save to Local Storage
  renderTasks(); // Re-render Task List
  taskNameInput.value = ""; // Clear Inputs
  taskDateInput.value = "";
};

// Edit Existing Task
const editTask = (index) => {
  const task = tasks[index];
  taskNameInput.value = task.name; // Pre-fill Name
  taskPriorityInput.value = task.priority; // Pre-fill Priority
  taskDateInput.value = task.dueDate; // Pre-fill Date
  editIndex = index; // Store Index of the Task Being Edited
};

// Delete Task
const deleteTask = (index) => {
  tasks.splice(index, 1); // Remove Task from Array
  saveTasks(); // Save to Local Storage
  renderTasks(); // Re-render Task List
  displayFeedback("Task deleted successfully!", "green");
};

// Toggle Task Completion
const toggleTaskCompletion = (index) => {
  tasks[index].completed = !tasks[index].completed; // Toggle Completion Status
  saveTasks(); // Save to Local Storage
  renderTasks(); // Re-render Task List
};

// Event Listeners
addButton.addEventListener("click", addTask);

// Initial Render
renderTasks();
