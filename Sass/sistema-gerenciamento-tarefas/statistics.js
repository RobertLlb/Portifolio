// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const donutChart = document.getElementById("donutChart").getContext("2d");
    const taskList = document.getElementById("taskList");

    // Dados iniciais do gráfico
    let completedTasks = 0;
    let pendingTasks = 0;

    // Inicializar contador de tarefas
    let taskId = 1;

    // Adicionar tarefa
    document.getElementById("addTask").addEventListener("click", function () {
        const newTaskText = document.getElementById("newTask").value;
        if (newTaskText.trim() !== "") {
            addTask(taskId++, newTaskText, false);
            updateChart();
            document.getElementById("newTask").value = "";
        }
    });

    // Remover tarefa
    document.getElementById("removeTask").addEventListener("click", function () {
        const taskToRemove = taskList.querySelector("li[data-task-id]:last-child");
        if (taskToRemove) {
            const isCompleted = taskToRemove.classList.contains("completed");
            taskList.removeChild(taskToRemove);
            if (isCompleted) {
                completedTasks--;
            } else {
                pendingTasks--;
            }
            updateChart();
        }
    });

// Função para adicionar uma nova tarefa à lista
function addTask(id, text, completed) {
    const taskItem = document.createElement("li");
    taskItem.dataset.taskId = id;
    taskItem.innerHTML = `
        <label>
            <input type="checkbox" ${completed ? "checked" : ""}>
            ${text}
        </label>
        <button class="change-status">Alterar Status</button>
        <button class="remove-task">Remover Tarefa</button>
    `;
    if (completed) {
        taskItem.classList.add("completed");
        completedTasks++;
    } else {
        taskItem.classList.remove("completed");
        pendingTasks++;
    }
    taskList.appendChild(taskItem);

    // Adicionar evento para alterar o status da tarefa
    const changeStatusButton = taskItem.querySelector(".change-status");
    changeStatusButton.addEventListener("click", function () {
        if (taskItem.classList.contains("completed")) {
            taskItem.classList.remove("completed");
            completedTasks--;
            pendingTasks++;
        } else {
            taskItem.classList.add("completed");
            completedTasks++;
            pendingTasks--;
        }
        updateChart();
    });

    // Adicionar evento para remover a tarefa com confirmação
    const removeTaskButton = taskItem.querySelector(".remove-task");
    removeTaskButton.addEventListener("click", function () {
        const isCompleted = taskItem.classList.contains("completed");
        const confirmation = confirm("Tem certeza de que deseja remover esta tarefa?");
        if (confirmation) {
            taskList.removeChild(taskItem);
            if (isCompleted) {
                completedTasks--;
            } else {
                pendingTasks--;
            }
            updateChart();
        }
    });
}


    function updateChart() {
        if (typeof chart !== "undefined") {
            chart.destroy();
        }
    
        const chartData = [completedTasks, pendingTasks];
        chart = new Chart(donutChart, {
            type: "doughnut",
            data: {
                labels: ["Concluídas", "Pendentes"],
                datasets: [
                    {
                        data: chartData,
                        backgroundColor: ["#28a745", "#dc3545"],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                            return currentValue + ' (' + percentage + '%)';
                        }
                    }
                }
            },
        });
    }
    

});
