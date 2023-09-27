// Task Management System JavaScript Logic

const tasks = [
    { id: 1, title: "Complete report", completed: false },
    { id: 2, title: "Send status email", completed: true },
    { id: 3, title: "Schedule meeting", completed: false },
    // Add more tasks as needed
];

function displayTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.title;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskList.appendChild(taskItem);
    });
}

displayTasks();
