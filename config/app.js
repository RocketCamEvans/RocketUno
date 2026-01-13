/**
 * Application Configuration
 * Centralized configuration for the Rocket UNO server
 */

module.exports = {
  // Server settings
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Game settings
  GAME: {
    MIN_PLAYERS: 2,
    MAX_PLAYERS: 10,
    STARTING_HAND_SIZE: 7,
    MAX_ROOM_CODE_LENGTH: 6,
  },

  // Paths
  PATHS: {
    PUBLIC: 'public',
    CARDS: 'pngs',
    GAME_MODULE: './game/Game',
  },

  // Socket events
  SOCKET_EVENTS: {
    // Client -> Server
    CREATE_ROOM: 'createRoom',
    JOIN_ROOM: 'joinRoom',
    START_GAME: 'startGame',
    PLAY_CARD: 'playCard',
    DRAW_CARD: 'drawCard',
    CALL_UNO: 'callUno',
    CHALLENGE_UNO: 'challengeUno',
    GET_HAND: 'getHand',
    DISCONNECT: 'disconnect',

    // Server -> Client
    ROOM_CREATED: 'roomCreated',
    ROOM_JOINED: 'roomJoined',
    GAME_STARTED: 'gameStarted',
    GAME_STATE: 'gameState',
    PLAYER_HAND: 'playerHand',
    GAME_OVER: 'gameOver',
    PLAYER_LEFT: 'playerLeft',
    UNO_CHALLENGED: 'unoChallenged',
    CUSTOM_EFFECT: 'customEffect',
    ERROR: 'error',
  },

  // Logging
  LOGGING: {
    ENABLED: true,
    LEVEL: process.env.LOG_LEVEL || 'info',
  },
};
