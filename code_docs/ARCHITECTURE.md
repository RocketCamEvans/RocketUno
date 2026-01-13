# Rocket UNO - Architecture Overview

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     init.js (Entry Point)                        │
│  - Creates Express Server                                        │
│  - Initializes Socket.io                                         │
│  - Configures static file serving                               │
│  - Sets up event handlers                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │     Socket.io Connection Handler      │
          │  (io.on('connection', socket => {}))  │
          └───────────────────────────────────────┘
                              │
                              ▼
                ┌─────────────────────────────────┐
                │  socketHandlers.js              │
                │  - initializeSocketHandlers()   │
                │  - Handles all socket events    │
                └─────────────────────────────────┘
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
         ┌──────────────┐ ┌──────────┐ ┌──────────────┐
         │ Create Room  │ │ Join Room│ │ Play Card    │
         └──────────────┘ └──────────┘ └──────────────┘
                 │            │            │
                 └────────────┼────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  game/Game.js    │
                    │ - Game state     │
                    │ - Game rules     │
                    │ - Card logic     │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Broadcast State  │
                    │ to all players   │
                    │ in the room      │
                    └──────────────────┘
```

## Module Dependencies

```
init.js
├── config/app.js
├── utils/logger.js
├── utils/networkUtils.js
├── src/socketHandlers.js
│   ├── config/app.js
│   ├── game/Game.js
│   ├── utils/logger.js
│   └── utils/networkUtils.js
└── game/Game.js

game/Game.js
└── (no dependencies - pure game logic)

socketHandlers.js
├── config/app.js
├── utils/logger.js
├── utils/networkUtils.js
└── game/Game.js
```

## Socket Event Flow

### Client → Server → Client

```
┌────────────────┐
│  Browser/UI    │
│  (public/)     │
└────────────────┘
       │
       │ socket.emit('createRoom', playerName)
       ▼
┌────────────────┐
│ socketHandlers │
│ .js            │
└────────────────┘
       │
       │ Creates new Game instance
       │ Adds player to game
       ▼
┌────────────────┐
│  game/Game.js  │
│ (game state)   │
└────────────────┘
       │
       │ Returns game state
       ▼
┌────────────────┐
│ socketHandlers │
│ Broadcasts     │
└────────────────┘
       │
       │ io.to(roomCode).emit('gameState', ...)
       ▼
┌────────────────┐
│  All Players   │
│  (browser)     │
│  Receive update│
└────────────────┘
```

## File Responsibility Matrix

| File | Responsibility |
|------|-----------------|
| `init.js` | Application startup, server creation |
| `config/app.js` | Configuration management |
| `utils/logger.js` | Console logging |
| `utils/networkUtils.js` | IP detection, room code generation |
| `src/socketHandlers.js` | Socket.io event routing |
| `game/Game.js` | Game state & business logic |
| `public/index.html` | HTML structure |
| `public/game.js` | Client-side logic & UI |
| `public/style.css` | Styling |

## Data Flow Example: Playing a Card

```
1. Player clicks card in UI
   ↓
2. game.js emits 'playCard' event with card data
   ↓
3. socketHandlers.js receives 'playCard' event
   ↓
4. Calls game.playCard(playerId, cardIndex, ...)
   ↓
5. game/Game.js validates and processes the move
   ↓
6. Returns result object with success/error
   ↓
7. socketHandlers broadcasts updated game state
   ↓
8. All clients in room receive gameState update
   ↓
9. UI updates with new card positions and turn
```

## Configuration Hierarchy

```
config/app.js (Default)
       ↓
process.env (Environment Variables)
       ↓
Runtime Configuration
```

When the app starts:
1. Loads defaults from `config/app.js`
2. Overrides with environment variables if set
3. Uses final config throughout the app

## Error Handling Flow

```
Socket Event Received
       │
       ├─ Validation Check
       │  ├─ Success → Process & Broadcast
       │  └─ Fail → Emit error event to client
       │
       └─ Game Logic Check
          ├─ Success → Update state & Broadcast
          └─ Fail → Emit error event to client
```

## Future Architecture Improvements

- [ ] Add database layer (MongoDB/PostgreSQL)
- [ ] Implement authentication middleware
- [ ] Add logging service (Winston/Pino)
- [ ] Separate game logic into multiple classes
- [ ] Add event emitter for game events
- [ ] Implement middleware for Socket.io
- [ ] Add unit tests
- [ ] Create API routes for statistics
- [ ] Implement game replay system
