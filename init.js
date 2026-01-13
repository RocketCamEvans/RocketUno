#!/usr/bin/env node

/**
 * Rocket UNO - Main Initialization File
 * 
 * This file serves as the entry point for the entire application.
 * It initializes all components, sets up the server, and starts listening for connections.
 * 
 * Usage: node init.js
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import configuration and utilities
const config = require('./config/app');
const { getLocalIP } = require('./utils/networkUtils');
const logger = require('./utils/logger');
const initializeSocketHandlers = require('./src/socketHandlers');

/**
 * Initialize and start the application
 */
function initializeApp() {
  logger.info('Initializing Rocket UNO Server...');

  // Create Express app and HTTP server
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);

  // Serve static files
  app.use(express.static(config.PATHS.PUBLIC));
  app.use('/cards', express.static(config.PATHS.CARDS));

  // Store active games and player-to-game mappings
  const games = new Map();
  const playerToGame = new Map();

  logger.success('✓ Static file serving configured');

  // Serve index.html for all client-side routes (enables client-side routing)
  const indexPath = path.resolve(__dirname, config.PATHS.PUBLIC, 'index.html');

  app.get('/', (req, res) => {
    res.sendFile(indexPath);
  });

  app.get('/lobby', (req, res) => {
    res.sendFile(indexPath);
  });

  app.get('/lobby/:roomCode', (req, res) => {
    res.sendFile(indexPath);
  });

  app.get('/wiki', (req, res) => {
    res.sendFile(indexPath);
  });

  // Set up Socket.io connection handler
  io.on('connection', (socket) => {
    initializeSocketHandlers(socket, games, playerToGame, io);
  });

  logger.success('✓ Socket.io event handlers initialized');

  // Start server
  server.listen(config.PORT, () => {
    const localIP = getLocalIP();
    
    // Display startup information
    console.log('\n');
    console.log('🚀 Rocket UNO Server is running!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 Local:     http://localhost:${config.PORT}`);
    console.log(`🌐 Network:   http://${localIP}:${config.PORT}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`⚙️  Environment: ${config.NODE_ENV}`);
    console.log(`👥 Max Players: ${config.GAME.MAX_PLAYERS}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 Share the Network URL with friends!\n');

    logger.success(`Server listening on port ${config.PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.warn('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.warn('SIGINT signal received: closing HTTP server');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  });

  return server;
}

// Start the application
try {
  initializeApp();
} catch (error) {
  logger.error(`Failed to initialize application: ${error.message}`);
  process.exit(1);
}
