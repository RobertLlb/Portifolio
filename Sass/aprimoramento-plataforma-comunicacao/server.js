const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar uma rota para servir a página HTML do chat
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Evento de conexão
io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  // Evento para quando uma mensagem é enviada
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Transmita a mensagem para todos os clientes
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou');
  });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor Socket.io rodando na porta 3000');
});
