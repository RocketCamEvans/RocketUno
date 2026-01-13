const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const os = require('os');
const Game = require('./game/Game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Get local network IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Serve static files
app.use(express.static('public'));
app.use('/cards', express.static('cards'));

// Store active games
const games = new Map();
const playerToGame = new Map();

// Generate a random 6-character room code
function generateRoomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return games.has(code) ? generateRoomCode() : code;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Create a new game room
  socket.on('createRoom', (playerName) => {
    const roomCode = generateRoomCode();
    const game = new Game(roomCode);
    game.addPlayer(socket.id, playerName);
    games.set(roomCode, game);
    playerToGame.set(socket.id, roomCode);
    
    socket.join(roomCode);
    socket.emit('roomCreated', { roomCode, playerId: socket.id });
    io.to(roomCode).emit('gameState', game.getState());
    
    console.log(`Room created: ${roomCode} by ${playerName}`);
  });

  // Join an existing game room
  socket.on('joinRoom', ({ roomCode, playerName }) => {
    const game = games.get(roomCode);
    
    if (!game) {
      socket.emit('error', 'Room not found');
      return;
    }
    
    if (game.started) {
      socket.emit('error', 'Game already started');
      return;
    }
    
    if (game.players.length >= 10) {
      socket.emit('error', 'Room is full');
      return;
    }
    
    game.addPlayer(socket.id, playerName);
    playerToGame.set(socket.id, roomCode);
    socket.join(roomCode);
    socket.emit('roomJoined', { roomCode, playerId: socket.id });
    io.to(roomCode).emit('gameState', game.getState());
    
    console.log(`${playerName} joined room: ${roomCode}`);
  });

  // Start the game
  socket.on('startGame', () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) {
      socket.emit('error', 'Game not found');
      return;
    }
    
    if (game.hostId !== socket.id) {
      socket.emit('error', 'Only the host can start the game');
      return;
    }
    
    if (game.players.length < 2) {
      socket.emit('error', 'Need at least 2 players to start');
      return;
    }
    
    game.startGame();
    io.to(roomCode).emit('gameStarted');
    io.to(roomCode).emit('gameState', game.getState());
    
    console.log(`Game started in room: ${roomCode}`);
  });

  // Play a card
  socket.on('playCard', ({ cardIndex, chosenColor, targetPlayerId }) => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) return;
    
    const result = game.playCard(socket.id, cardIndex, chosenColor, targetPlayerId);
    
    if (result.success) {
      io.to(roomCode).emit('gameState', game.getState());
      
      // Handle custom card effects
      if (result.customEffect) {
        io.to(roomCode).emit('customEffect', result.customEffect);
      }
      
      if (result.gameOver) {
        io.to(roomCode).emit('gameOver', { winner: result.winner });
      }
    } else {
      socket.emit('error', result.error);
    }
  });

  // Draw a card
  socket.on('drawCard', () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) return;
    
    const result = game.drawCard(socket.id);
    
    if (result.success) {
      io.to(roomCode).emit('gameState', game.getState());
    } else {
      socket.emit('error', result.error);
    }
  });

  // Call UNO
  socket.on('callUno', () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) return;
    
    game.callUno(socket.id);
    io.to(roomCode).emit('gameState', game.getState());
  });

  // Challenge missed UNO call
  socket.on('challengeUno', (targetPlayerId) => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) return;
    
    const result = game.challengeUno(targetPlayerId);
    
    if (result.success) {
      io.to(roomCode).emit('gameState', game.getState());
      io.to(roomCode).emit('unoChallenged', result);
    }
  });

  // Get player's hand
  socket.on('getHand', () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (!game) return;
    
    const hand = game.getPlayerHand(socket.id);
    socket.emit('playerHand', hand);
  });

  // Disconnect
  socket.on('disconnect', () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);
    
    if (game) {
      game.removePlayer(socket.id);
      
      if (game.players.length === 0) {
        games.delete(roomCode);
        console.log(`Room ${roomCode} deleted (empty)`);
      } else {
        io.to(roomCode).emit('gameState', game.getState());
        io.to(roomCode).emit('playerLeft', socket.id);
      }
    }
    
    playerToGame.delete(socket.id);
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log('\n🚀 Rocket UNO Server is running!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${localIP}:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💡 Share the Network URL with friends on your WiFi!\n');
});
