document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const inputField = document.getElementById("inputField");
  const taskList = document.getElementById("taskList");

  // Initialize tasks (simulated database)
  let tasks = [];

  // Function to display tasks
  function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li"); //addtaskBtn
      li.innerHTML = `
              ${task}
              <button class="editBtn">Edit</button>
              <button class="deleteBtn">Delete</button>
          `;

      // Edit task
      const editBtn = li.querySelector(".editBtn");
      editBtn.addEventListener("click", () => {
        const updatedTask = prompt("Edit task:", task);
        if (updatedTask !== null) {
          tasks[index] = updatedTask;
          displayTasks();
        }
      });

      // Delete task
      const deleteBtn = li.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        displayTasks();
      });

      taskList.appendChild(li);
    });
  }

  // Add task

  inputField.addEventListener("keypress", (e) => {
    const newTask = taskInput.value.trim();
    if (e.key === "Enter") {
      tasks.push(newTask);
      taskInput.value = "";
      displayTasks();
    }
  });

  // Initial display
  displayTasks();
});
