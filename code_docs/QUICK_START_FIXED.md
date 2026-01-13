# Quick Start - Fixed Version

## Current Status

✅ **npm**: 11.6.2 installed  
✅ **Dependencies**: Already installed  
✅ **init.js**: Verified and ready  
✅ **start.bat**: Fixed (removed problematic Unicode)  

## How to Start

### Windows (Recommended)
```bash
start.bat
```

This will:
1. Check for dependencies (skips if already installed)
2. Start the server in production mode
3. Show you the connection URLs

### Windows Development (Auto-restart)
```bash
start.bat dev
```

### Linux/Mac
```bash
chmod +x start.sh    # First time only
./start.sh           # Production
./start.sh dev       # Development
```

## Access the Game

After running the script, you'll see output like:

```
Starting Rocket UNO Server
========================================

Starting in PRODUCTION mode...

🚀 Rocket UNO Server is running!
📍 Local:     http://localhost:3000
🌐 Network:   http://192.168.1.XXX:3000
```

Open one of those URLs in your browser.

## Manual Alternative

If you prefer to run commands manually:

```bash
npm start              # Production
npm run dev            # Development (auto-restart)
```

## Troubleshooting

**Port 3000 in use?**
Edit `.env` and change PORT, or use:
```bash
PORT=8080 npm start
```

**Dependencies missing?**
```bash
npm install
```

That's it! The server will start automatically.
