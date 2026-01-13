# Project Structure Documentation

## Overview
Rocket UNO is organized into logical directories for maintainability and scalability.

## Directory Structure

```
RocketUno/
├── config/                 # Configuration files
│   └── app.js             # Main application configuration
├── utils/                 # Utility functions
│   ├── logger.js          # Logging utility
│   └── networkUtils.js    # Network-related utilities
├── src/                   # Source code
│   └── socketHandlers.js  # Socket.io event handlers
├── game/                  # Game logic
│   └── Game.js           # Main game class
├── public/                # Frontend files
│   ├── index.html        # Main HTML file
│   ├── game.js           # Client-side game logic
│   └── style.css         # Styling
├── cards/                 # Card images
│   └── [individual card images]
├── scripts/              # Utility scripts
├── init.js              # Main initialization file (entry point)
├── server.js            # Legacy server file (kept for reference)
├── package.json         # Node.js dependencies
└── README.md           # Project README
```

## Key Files

### init.js (Entry Point)
The main initialization file that:
- Creates and configures the Express server
- Sets up Socket.io for real-time communication
- Initializes all event handlers
- Starts the server and displays connection information
- Handles graceful shutdown

**Usage:**
```bash
npm start
npm run dev
```

### config/app.js
Centralized configuration containing:
- Server settings (PORT, NODE_ENV)
- Game settings (player limits, deck size)
- File paths
- Socket event definitions
- Logging configuration

### utils/
Reusable utility modules:
- **logger.js**: Colored logging with timestamps
- **networkUtils.js**: IP detection and room code generation

### src/socketHandlers.js
Handles all Socket.io events:
- Room creation and joining
- Game start/play logic
- Card actions
- Disconnections

### game/Game.js
Core game logic class implementing:
- Player management
- Deck initialization
- Game rules and card effects
- Win conditions

## Adding New Features

### Adding a New Configuration Option
1. Edit `config/app.js`
2. Reference it throughout the app using `config.OPTION_NAME`

### Adding a New Socket Event
1. Define the event in `config/app.js` under `SOCKET_EVENTS`
2. Add handler in `src/socketHandlers.js`
3. Use `io.to(roomCode).emit(config.SOCKET_EVENTS.EVENT_NAME, data)`

### Adding a New Utility
1. Create file in `utils/` directory
2. Export functions/objects from the module
3. Import where needed with `const { functionName } = require('./utils/moduleName')`

## Development Workflow

1. **Run Development Server:**
   ```bash
   npm run dev
   ```
   This uses nodemon for auto-restart on file changes.

2. **Run Production Server:**
   ```bash
   npm start
   ```

3. **Check Logs:**
   All important events are logged with timestamps and color coding.

## Future Improvements

- [ ] Add database for persistent game history
- [ ] Implement authentication system
- [ ] Add game statistics/leaderboard
- [ ] Create admin dashboard
- [ ] Add unit tests for Game logic
- [ ] Implement game replay system
- [ ] Add chat functionality
- [ ] Create AI player option
