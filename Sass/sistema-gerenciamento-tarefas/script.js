


// JavaScript para calcular a média das avaliações
const ratings = [4, 5, 5, 5, 5]; // Substitua com as classificações reais dos depoimentos

// Calcular a média
const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

// Atualizar o elemento no HTML
const averageRatingElement = document.getElementById('average-rating');
averageRatingElement.textContent = averageRating.toFixed(1); // Limitar a uma casa decimal


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
