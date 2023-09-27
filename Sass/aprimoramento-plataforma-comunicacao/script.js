// Função para validar o formulário de contato


let username = null;
function validateContactForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput.value.trim() === "") {
        alert("Por favor, preencha o campo Nome.");
        nameInput.focus();
        return false;
    }

    if (emailInput.value.trim() === "") {
        alert("Por favor, preencha o campo Email.");
        emailInput.focus();
        return false;
    }

    if (messageInput.value.trim() === "") {
        alert("Por favor, preencha o campo Mensagem.");
        messageInput.focus();
        return false;
    }

    return true;
}



document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const questionList = document.getElementById("questionList");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Captura os valores do formulário
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Cria um elemento de pergunta com as informações do formulário
        const questionItem = document.createElement("div");
        questionItem.classList.add("question");
        questionItem.innerHTML = `
            <p><strong><i class="fa fa-user" aria-hidden="true"></i> Nome:</strong> ${name}</p>
            <p><strong> <i class="fa fa-envelope-o" aria-hidden="true"></i> Email:</strong> ${email}</p>
            <p><strong><i class="fa fa-comment-o" aria-hidden="true"></i> Mensagem:</strong> ${message}</p>
        `;

        // Adiciona a pergunta à lista de perguntas
        questionList.appendChild(questionItem);

        // Limpa o formulário
        contactForm.reset();
    });
});

