/**
 * Socket Event Handlers
 * Handles all socket.io events for the game
 */

const Game = require('../game/Game');
const { generateRoomCode } = require('../utils/networkUtils');
const logger = require('../utils/logger');
const config = require('../config/app');

/**
 * Initialize all socket event handlers
 * @param {Socket} socket - Socket.io socket instance
 * @param {Map} games - Map of active games
 * @param {Map} playerToGame - Map of players to game room codes
 * @param {Server} io - Socket.io server instance
 */
function initializeSocketHandlers(socket, games, playerToGame, io) {
  logger.info(`User connected: ${socket.id}`);

  // Create a new game room
  socket.on(config.SOCKET_EVENTS.CREATE_ROOM, (playerName) => {
    const roomCode = generateRoomCode(games);
    const game = new Game(roomCode);
    game.addPlayer(socket.id, playerName);
    games.set(roomCode, game);
    playerToGame.set(socket.id, roomCode);

    socket.join(roomCode);
    socket.emit(config.SOCKET_EVENTS.ROOM_CREATED, { roomCode, playerId: socket.id });
    io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());

    logger.success(`Room created: ${roomCode} by ${playerName}`);
  });

  // Join an existing game room
  socket.on(config.SOCKET_EVENTS.JOIN_ROOM, ({ roomCode, playerName }) => {
    const game = games.get(roomCode);

    if (!game) {
      socket.emit(config.SOCKET_EVENTS.ERROR, 'Room not found');
      return;
    }

    if (game.started) {
      socket.emit(config.SOCKET_EVENTS.ERROR, 'Game already started');
      return;
    }

    if (game.players.length >= config.GAME.MAX_PLAYERS) {
      socket.emit(config.SOCKET_EVENTS.ERROR, 'Room is full');
      return;
    }

    game.addPlayer(socket.id, playerName);
    playerToGame.set(socket.id, roomCode);
    socket.join(roomCode);
    socket.emit(config.SOCKET_EVENTS.ROOM_JOINED, { roomCode, playerId: socket.id });
    io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());

    logger.success(`${playerName} joined room: ${roomCode}`);
  });

  // Start the game
  socket.on(config.SOCKET_EVENTS.START_GAME, () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) {
      socket.emit(config.SOCKET_EVENTS.ERROR, 'Game not found');
      return;
    }

    if (game.hostId !== socket.id) {
      socket.emit(config.SOCKET_EVENTS.ERROR, 'Only the host can start the game');
      return;
    }

    if (game.players.length < config.GAME.MIN_PLAYERS) {
      socket.emit(config.SOCKET_EVENTS.ERROR, `Need at least ${config.GAME.MIN_PLAYERS} players to start`);
      return;
    }

    game.startGame();
    io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STARTED);
    io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());

    logger.success(`Game started in room: ${roomCode}`);
  });

  // Play a card
  socket.on(config.SOCKET_EVENTS.PLAY_CARD, ({ cardIndex, chosenColor, targetPlayerId }) => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) return;

    const result = game.playCard(socket.id, cardIndex, chosenColor, targetPlayerId);

    if (result.success) {
      io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());

      if (result.customEffect) {
        io.to(roomCode).emit(config.SOCKET_EVENTS.CUSTOM_EFFECT, result.customEffect);
      }

      if (result.gameOver) {
        io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_OVER, { winner: result.winner });
      }
    } else {
      socket.emit(config.SOCKET_EVENTS.ERROR, result.error);
    }
  });

  // Draw a card
  socket.on(config.SOCKET_EVENTS.DRAW_CARD, () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) return;

    const result = game.drawCard(socket.id);

    if (result.success) {
      io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());
    } else {
      socket.emit(config.SOCKET_EVENTS.ERROR, result.error);
    }
  });

  // Call UNO
  socket.on(config.SOCKET_EVENTS.CALL_UNO, () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) return;

    game.callUno(socket.id);
    io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());
  });

  // Challenge missed UNO call
  socket.on(config.SOCKET_EVENTS.CHALLENGE_UNO, (targetPlayerId) => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) return;

    const result = game.challengeUno(targetPlayerId);

    if (result.success) {
      io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());
      io.to(roomCode).emit(config.SOCKET_EVENTS.UNO_CHALLENGED, result);
    }
  });

  // Get player's hand
  socket.on(config.SOCKET_EVENTS.GET_HAND, () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (!game) return;

    const hand = game.getPlayerHand(socket.id);
    socket.emit(config.SOCKET_EVENTS.PLAYER_HAND, hand);
  });

  // Disconnect
  socket.on(config.SOCKET_EVENTS.DISCONNECT, () => {
    const roomCode = playerToGame.get(socket.id);
    const game = games.get(roomCode);

    if (game) {
      game.removePlayer(socket.id);

      if (game.players.length === 0) {
        games.delete(roomCode);
        logger.warn(`Room ${roomCode} deleted (empty)`);
      } else {
        io.to(roomCode).emit(config.SOCKET_EVENTS.GAME_STATE, game.getState());
        io.to(roomCode).emit(config.SOCKET_EVENTS.PLAYER_LEFT, socket.id);
      }
    }

    playerToGame.delete(socket.id);
    logger.info(`User disconnected: ${socket.id}`);
  });
}

module.exports = initializeSocketHandlers;
