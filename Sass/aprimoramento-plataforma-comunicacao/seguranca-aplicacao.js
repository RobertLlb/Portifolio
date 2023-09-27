// 1. Evitar injeção de scripts (XSS)
function escapeHTML(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Uso:
const userInput = "<script>alert('Vulnerabilidade XSS')</script>";
const sanitizedInput = escapeHTML(userInput);
console.log(sanitizedInput); // Saída: "&lt;script&gt;alert('Vulnerabilidade XSS')&lt;/script&gt;"

// 2. Validar entradas do usuário
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Uso:
const userEmail = "user@example.com";
if (isValidEmail(userEmail)) {
    console.log("Email válido");
} else {
    console.log("Email inválido");
}

// 3. Hash de senhas
const bcrypt = require('bcrypt');

// Função para criar um hash de senha
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Verificar a senha com o hash
async function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// Uso:
const userPassword = "minhaSenhaSecreta";
hashPassword(userPassword).then(hash => {
    // Armazenar o 'hash' no banco de dados
    checkPassword("senhaIncorreta", hash).then(result => {
        if (result) {
            console.log("Senha correta");
        } else {
            console.log("Senha incorreta");
        }
    });
});

// 4. Usar cabeçalhos HTTP seguros (HSTS)
// Adicione um cabeçalho HTTP Strict-Transport-Security (HSTS) para forçar o uso de HTTPS.
// Isso deve ser configurado no lado do servidor.

// Exemplo em Node.js com o pacote 'helmet':
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hsts({
    maxAge: 31536000, // 1 ano em segundos
    includeSubDomains: true,
    preload: true
}));

// Outras configurações do aplicativo...

// 5. Validar e escapar consultas de banco de dados (SQL Injection)
// Use bibliotecas de ORM (Object-Relational Mapping) ou consultas parametrizadas para evitar SQL Injection.

// Exemplo com Sequelize (ORM para Node.js):
const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql',
    operatorsAliases: Op,
    logging: false
});

// Consulta parametrizada
const userId = 1;
sequelize.query('SELECT * FROM users WHERE id = :userId', {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT
}).then(users => {
    console.log(users);
}).catch(error => {
    console.error(error);
});
