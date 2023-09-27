// Middleware de Segurança para Express.js
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

// Ativar proteções do Helmet
app.use(helmet());

// Configurar CORS para permitir apenas origens confiáveis
const corsOptions = {
  origin: 'https://sua-aplicacao.com', // Substitua pelo domínio da sua aplicação
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Limitar as solicitações por IP para evitar ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de solicitações por IP
});
app.use(limiter);

// Evitar quebras de segurança conhecidas do NPM
const hpp = require('hpp');
const hppOptions = {
  whitelist: ['campo-seguro'], // Substitua pelo nome de campos seguros
};
app.use(hpp(hppOptions));

// Escapar dados de entrada para evitar injeções de código
const sanitize = require('mongo-sanitize');
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  req.query = sanitize(req.query);
  next();
});

// Configurar cabeçalhos HTTP de segurança
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Exemplo de rota segura
app.get('/rota-segura', (req, res) => {
  res.json({ mensagem: 'Esta é uma rota segura.' });
});

// Outras rotas e configurações da sua aplicação

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
