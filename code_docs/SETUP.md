# Rocket UNO - Setup & Getting Started Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Launch

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Server:**
   ```bash
   npm start
   ```

3. **Open in Browser:**
   - Local: `http://localhost:3000`
   - Network: Check the terminal output for the network URL to share with friends

## Development

### Run with Auto-Restart
```bash
npm run dev
```
This uses `nodemon` to automatically restart the server when files change.

## Project Organization

The project has been reorganized for better maintainability:

### Key Directories

- **`init.js`** - Main entry point that initializes the entire application
- **`config/`** - Configuration files (centralized settings)
- **`src/`** - Source code (socket handlers, server logic)
- **`utils/`** - Utility functions (logging, networking)
- **`game/`** - Game logic and rules
- **`public/`** - Frontend (HTML, CSS, client-side JS)
- **`cards/`** - Card image assets

### Main Files

| File | Purpose |
|------|---------|
| `init.js` | Application entry point and server initialization |
| `config/app.js` | Centralized configuration |
| `src/socketHandlers.js` | Socket.io event handlers |
| `utils/logger.js` | Logging with colors and timestamps |
| `utils/networkUtils.js` | Network utilities (IP detection, room code generation) |
| `game/Game.js` | Core game logic |

## Configuration

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### Config File (`config/app.js`)

Modify game settings, player limits, or socket events in `config/app.js`:

```javascript
GAME: {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 10,
  STARTING_HAND_SIZE: 7,
  MAX_ROOM_CODE_LENGTH: 6,
}
```

## How the Application Works

### Initialization Flow

1. **init.js** starts and requires configuration
2. Creates Express server and Socket.io instance
3. Configures static file serving
4. Sets up Socket.io connection handler
5. Starts listening on specified PORT
6. Displays connection information

### Game Flow

1. Player opens the app and enters their name
2. Create a new room OR join existing room with code
3. Host starts the game when ready
4. Players take turns playing cards
5. First player to empty their hand wins

### Socket Communication

All real-time communication uses Socket.io:
- Client connects to server
- Events defined in `config/SOCKET_EVENTS`
- Handlers in `src/socketHandlers.js`
- Game state updates broadcast to all players in room

## Development Tips

### Debugging

1. Check server logs for connection info
2. Open browser console for client-side errors
3. Use `logger.debug()` for detailed logging (set `LOG_LEVEL=debug` in config)

### Adding Features

1. **New Socket Event?** → Add to `config/SOCKET_EVENTS`, create handler in `src/socketHandlers.js`
2. **New Utility?** → Create file in `utils/` folder
3. **New Config Option?** → Add to `config/app.js`, import in files that need it
4. **Game Logic?** → Modify `game/Game.js`

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file or use:
PORT=8080 npm start
```

### Can't Connect from Another Device
- Make sure both devices are on same WiFi
- Use the Network URL from terminal output (not localhost)
- Check Windows Firewall allows Node.js

### Module Not Found Error
```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

## File Structure Overview

```
RocketUno/
├── init.js                    # ⭐ START HERE - Main entry point
├── config/
│   └── app.js                # All configuration settings
├── src/
│   └── socketHandlers.js      # Socket.io event handlers
├── utils/
│   ├── logger.js             # Logging utility
│   └── networkUtils.js       # Network helper functions
├── game/
│   └── Game.js               # Core game logic
├── public/
│   ├── index.html            # Frontend HTML
│   ├── game.js               # Client-side logic
│   └── style.css             # Styling
├── cards/                     # Card images
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── README.md                 # Project description
└── PROJECT_STRUCTURE.md      # Detailed structure docs
```

## Next Steps

1. ✅ Review `PROJECT_STRUCTURE.md` for detailed organization
2. ✅ Check `config/app.js` to understand available settings
3. ✅ Explore `src/socketHandlers.js` to see event handling
4. ✅ Read `game/Game.js` to understand game rules
5. ✅ Modify `public/` files to customize UI

## Support

For issues or questions:
1. Check the logs in terminal
2. Review browser console
3. Check `PROJECT_STRUCTURE.md` for architecture details

---

**Happy Gaming! 🚀**
