document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");

    // Conectar ao servidor de socket
    const socket = io.connect("http://localhost:3000"); // Substitua pelo endereço do seu servidor Socket.io

    // Função para adicionar mensagens à janela de bate-papo
    function addMessage(username, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rolar para a última mensagem
    }

    // Enviar mensagem quando o botão "Enviar" for clicado
    sendMessageButton.addEventListener("click", function () {
        const message = messageInput.value;
        if (message.trim() !== "") {
            socket.emit("chat message", message);
            messageInput.value = "";
        }
    });

    // Enviar mensagem quando a tecla Enter for pressionada no campo de entrada
    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessageButton.click(); // Simular clique no botão "Enviar"
        }
    });

    // Receber mensagens do servidor
    socket.on("chat message", function (data) {
        addMessage(data.username, data.message);
    });
});
