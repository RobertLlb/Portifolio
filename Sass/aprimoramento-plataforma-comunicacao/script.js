// Função para abrir e fechar o menu de navegação móvel
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
}

// Event listener para o botão de menu móvel
const mobileMenuButton = document.getElementById("mobile-menu-button");
if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
}

// Função para validar o formulário de contato
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

// Event listener para o envio do formulário de contato
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        if (!validateContactForm()) {
            e.preventDefault();
        }
    });
}
