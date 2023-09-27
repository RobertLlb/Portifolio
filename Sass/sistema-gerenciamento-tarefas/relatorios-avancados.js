// Advanced Reports Generation

function generateCompletedTasksReport() {
    const completedTasks = tasks.filter((task) => task.completed);

    console.log("Completed Tasks Report:");
    completedTasks.forEach((task) => {
        console.log(`- Task: ${task.title}`);
    });
}

generateCompletedTasksReport();
