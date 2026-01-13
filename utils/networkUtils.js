/**
 * Network Utilities
 * Helper functions for network operations
 */

const os = require('os');

/**
 * Get the local network IP address
 * Filters for IPv4 addresses and excludes internal/loopback
 * @returns {string} Local IP address or 'localhost'
 */
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

/**
 * Generate a random room code
 * @param {Map} existingGames - Map of existing games to check uniqueness
 * @returns {string} Random 6-character room code
 */
function generateRoomCode(existingGames) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return existingGames.has(code) ? generateRoomCode(existingGames) : code;
}

module.exports = {
  getLocalIP,
  generateRoomCode,
};
