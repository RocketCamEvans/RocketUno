/**
 * Logger Utility
 * Simple logging utility for the application
 */

const config = require('../config/app');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function formatMessage(level, message) {
  const timestamp = new Date().toLocaleTimeString();
  return `[${timestamp}] [${level}] ${message}`;
}

const logger = {
  info: (message) => {
    if (config.LOGGING.ENABLED) {
      console.log(`${colors.blue}${formatMessage('INFO', message)}${colors.reset}`);
    }
  },

  success: (message) => {
    if (config.LOGGING.ENABLED) {
      console.log(`${colors.green}${formatMessage('SUCCESS', message)}${colors.reset}`);
    }
  },

  warn: (message) => {
    if (config.LOGGING.ENABLED) {
      console.warn(`${colors.yellow}${formatMessage('WARN', message)}${colors.reset}`);
    }
  },

  error: (message) => {
    if (config.LOGGING.ENABLED) {
      console.error(`${colors.red}${formatMessage('ERROR', message)}${colors.reset}`);
    }
  },

  debug: (message) => {
    if (config.LOGGING.ENABLED && config.LOGGING.LEVEL === 'debug') {
      console.log(`${colors.dim}${formatMessage('DEBUG', message)}${colors.reset}`);
    }
  },
};

module.exports = logger;
