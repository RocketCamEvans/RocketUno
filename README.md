# 🚀 Rocket UNO - Online Multiplayer Game

A real-time, online multiplayer UNO game built with Node.js, Express, and Socket.io. Play with friends using room codes!

## Features

- ✨ Real-time multiplayer gameplay
- 🎮 Room-based system with unique codes
- 🎯 Complete UNO rules implementation
- 🎨 Beautiful, responsive UI
- 👥 Support for 2-10 players
- 🔔 UNO call system with challenges
- 🎴 Full deck of 108 cards

## Game Rules

The game follows standard UNO rules:
- **108 cards total**: 25 cards in each color (red, yellow, green, blue)
- **Number cards**: One 0, two each of 1-9 per color
- **Action cards**: Skip, Reverse, Draw Two (2 each per color)
- **Wild cards**: 4 Wild and 4 Wild Draw Four

### How to Play

1. Each player starts with 7 cards
2. Play a card that matches the color or number of the top card
3. Wild cards can be played anytime and let you choose the color
4. Action cards have special effects:
   - **Skip**: Next player loses their turn
   - **Reverse**: Reverses the direction of play
   - **Draw Two**: Next player draws 2 cards and loses their turn
   - **Wild Draw Four**: Choose a color, next player draws 4 cards
5. Call "UNO" when you have one card left!
6. First player to play all cards wins!

## Setup Instructions

### 1. Install Dependencies

First, install Node.js if you haven't already (https://nodejs.org/)

Then open a terminal in the project folder and run:

\`\`\`bash
npm install
\`\`\`

### 2. Split Card Images

The card images need to be extracted from the provided PNG files. 

**Option A: Using Python (Recommended)**
\`\`\`bash
pip install Pillow
python splitCards.py
\`\`\`

**Option B: Manual** - If you prefer, you can manually extract the cards from UnoCards.png (4x14 grid) and Draw4.png using any image editor, saving them in a `cards` folder with the naming pattern: `{color}_{value}.png` (e.g., `red_5.png`, `wild_draw4.png`).

This will create a `cards` folder with all 57 individual card images.

### 3. Start the Server

\`\`\`bash
npm start
\`\`\`

For development with auto-restart:

\`\`\`bash
npm run dev
\`\`\`

### 4. Play the Game

Open your browser and go to:
\`\`\`
http://localhost:3000
\`\`\`

To play with friends:
1. One player creates a room and shares the room code
2. Friends join using the room code
3. Host starts the game when everyone is ready
4. Enjoy!

## Playing Online with Friends

To play with friends over the internet, you'll need to:

1. **Deploy to a hosting service** (Heroku, Railway, Render, etc.)
2. **Or use a tunneling service** like:
   - ngrok: `ngrok http 3000`
   - localtunnel: `npx localtunnel --port 3000`
   - Cloudflare Tunnel

Then share the public URL with your friends!

## Project Structure

\`\`\`
RocketUno/
├── game/
│   └── Game.js          # Game logic and rules
├── public/
│   ├── index.html       # Main HTML file
│   ├── style.css        # Styles
│   └── game.js          # Client-side game code
├── cards/               # Individual card images (generated)
├── server.js            # Server and Socket.io setup
├── splitCards.js        # Image processing script
├── package.json         # Dependencies
├── UnoCards.png         # Original card grid
└── Draw4.png           # Draw 4 card image
\`\`\`

## Technologies Used

- **Node.js** - Server runtime
- **Express** - Web server framework
- **Socket.io** - Real-time bidirectional communication
- **Canvas** - Image processing for card splitting
- **HTML/CSS/JavaScript** - Frontend

## Troubleshooting

### Cards not showing up?
Make sure you ran `node splitCards.js` to generate the card images.

### Can't connect to server?
- Check that the server is running on port 3000
- Make sure no other application is using port 3000
- Try restarting the server

### Game not starting?
- Need at least 2 players to start
- Only the host (first player) can start the game

## Future Enhancements

- 🎵 Sound effects
- 🏆 Score tracking across multiple rounds
- 💬 In-game chat
- 🎨 Custom card themes
- 📊 Game statistics
- 🤖 AI players for practice

## License

This project is for educational and personal use. UNO is a trademark of Mattel.

---

Made with ❤️ for fun game nights with friends!
