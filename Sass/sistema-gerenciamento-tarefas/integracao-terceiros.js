// Third-Party Services Integration

function sendEmailNotification(task) {
    console.log(`Sending email notification for task: "${task.title}"`);
}

const taskToNotify = tasks.find((task) => !task.completed);
if (taskToNotify) {
    sendEmailNotification(taskToNotify);
}
