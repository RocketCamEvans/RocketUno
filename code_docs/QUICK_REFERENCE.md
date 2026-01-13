# ⚡ Quick Reference Guide

## Start the Game

```bash
npm install      # First time only
npm start        # Production
npm run dev      # Development with auto-restart
```

## File Organization Summary

### Core Application
- **`init.js`** ⭐ - Main entry point (run this!)
- **`config/app.js`** - All settings in one place
- **`src/socketHandlers.js`** - Real-time communication
- **`game/Game.js`** - Game rules & logic

### Utilities
- **`utils/logger.js`** - Colored console logs
- **`utils/networkUtils.js`** - Helper functions

### Frontend
- **`public/index.html`** - UI layout
- **`public/game.js`** - Client-side logic
- **`public/style.css`** - Styling

### Assets
- **`cards/`** - Card images (auto-generated)
- **`scripts/`** - Utility scripts

## Directory Tree

```
RocketUno/
├── 📄 init.js ......................... Start here!
├── 📁 config/
│   └── app.js ......................... Configuration
├── 📁 src/
│   └── socketHandlers.js .............. Socket events
├── 📁 utils/
│   ├── logger.js ...................... Logging
│   └── networkUtils.js ................ Network helpers
├── 📁 game/
│   └── Game.js ........................ Game logic
├── 📁 public/
│   ├── index.html ..................... Frontend
│   ├── game.js ........................ Client logic
│   └── style.css ...................... Styling
├── 📁 cards/ .......................... Card images
├── 📁 scripts/ ........................ Utility scripts
├── 📄 package.json .................... Dependencies
├── 📄 .env.example .................... Environment template
├── 📄 README.md ....................... Project info
├── 📄 SETUP.md ........................ Setup guide
├── 📄 PROJECT_STRUCTURE.md ........... Structure docs
└── 📄 ARCHITECTURE.md ................. Architecture diagrams
```

## Common Tasks

### Change Port
Edit `.env`:
```
PORT=8080
```
Or run:
```bash
PORT=8080 npm start
```

### Modify Game Settings
Edit `config/app.js`:
```javascript
MAX_PLAYERS: 10,      // Change max players
STARTING_HAND_SIZE: 7 // Change starting hand size
```

### Add Logging
Use the logger in any file:
```javascript
const logger = require('./utils/logger');
logger.info('Information');
logger.success('Success!');
logger.warn('Warning');
logger.error('Error');
logger.debug('Debug info');
```

### Handle Socket Events
Edit `src/socketHandlers.js`:
```javascript
socket.on('eventName', (data) => {
  // Your code here
});
```

## Socket Events

### Client → Server
- `createRoom` - Create new game room
- `joinRoom` - Join existing room
- `startGame` - Start the game
- `playCard` - Play a card
- `drawCard` - Draw a card
- `callUno` - Call UNO
- `challengeUno` - Challenge UNO
- `getHand` - Request player's hand

### Server → Client
- `roomCreated` - Room successfully created
- `roomJoined` - Successfully joined room
- `gameStarted` - Game has started
- `gameState` - Current game state (frequent)
- `playerHand` - Your hand of cards
- `gameOver` - Game finished, winner announced
- `playerLeft` - A player left the room
- `unoChallenged` - UNO was challenged
- `customEffect` - Special card effect
- `error` - Error occurred

## Important Configuration Options

```javascript
// In config/app.js

// Server
PORT: 3000
NODE_ENV: 'development'

// Game Rules
MIN_PLAYERS: 2
MAX_PLAYERS: 10
STARTING_HAND_SIZE: 7

// Logging
LOGGING.ENABLED: true
LOGGING.LEVEL: 'info' // or 'debug'
```

## Useful Commands

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server (auto-restart)
npm run dev

# Kill server on Windows
Ctrl + C

# Check if port is in use
netstat -ano | findstr :3000
```

## Accessing the Game

### Local
- URL: `http://localhost:3000`
- Use on same computer

### Network
- URL: Check terminal output (e.g., `http://192.168.1.100:3000`)
- Use on any device on same WiFi

## Debugging

### Server Issues
1. Check terminal for error messages
2. Verify all files are in correct directories
3. Ensure `npm install` was run
4. Try port 8080 if 3000 is in use

### Client Issues
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for socket connection
4. Refresh page (Ctrl + F5)

### Game Logic Issues
1. Check `game/Game.js` for rules
2. Review `src/socketHandlers.js` for event handling
3. Check `config/app.js` for settings
4. Enable debug logging: `LOG_LEVEL=debug`

## Code Examples

### Broadcasting to All Players in Room
```javascript
io.to(roomCode).emit('gameState', gameStateData);
```

### Sending to Single Player
```javascript
socket.emit('roomCreated', { roomCode, playerId });
```

### Accessing Configuration
```javascript
const config = require('./config/app');
const maxPlayers = config.GAME.MAX_PLAYERS;
```

### Using Logger
```javascript
const logger = require('./utils/logger');
logger.info(`User ${name} connected`);
```

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm start`
3. ✅ Open `http://localhost:3000`
4. ✅ Create a room and play!
5. ✅ Read `ARCHITECTURE.md` to understand the code
6. ✅ Modify `config/app.js` to customize settings
7. ✅ Explore and extend!

---

**Need help?** Check the documentation files:
- 📖 `SETUP.md` - Detailed setup guide
- 🏗️ `PROJECT_STRUCTURE.md` - File organization
- 📊 `ARCHITECTURE.md` - System architecture
- 📋 `README.md` - Project overview

**Happy coding!** 🚀
