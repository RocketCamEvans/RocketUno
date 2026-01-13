# Start Scripts with Browser Auto-Open

## Windows: `start.bat`

```batch
@echo off

if not exist node_modules npm install

start http://localhost:3000

if "%1"=="dev" (npm run dev) else (npm start)
```

**What it does:**
1. ✅ Installs dependencies if missing
2. ✅ Opens browser to http://localhost:3000
3. ✅ Starts the server

**Usage:**
```bash
start.bat              # Production mode
start.bat dev          # Development mode (auto-restart)
```

## Linux/Mac: `start.sh`

```bash
#!/bin/bash

[ ! -d "node_modules" ] && npm install

# Open browser
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open http://localhost:3000
elif [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:3000
fi

[ "$1" = "dev" ] && npm run dev || npm start
```

**What it does:**
1. ✅ Installs dependencies if missing
2. ✅ Opens browser (Linux: xdg-open, Mac: open)
3. ✅ Starts the server

**Usage:**
```bash
chmod +x start.sh      # First time only
./start.sh             # Production mode
./start.sh dev         # Development mode (auto-restart)
```

## How It Works

### Windows
- Uses `start` command to open browser
- Browser opens immediately
- Server starts after

### Linux/Mac
- Detects OS type
- Linux: Uses `xdg-open`
- Mac: Uses `open` command
- Browser opens immediately
- Server starts after

## Game is Ready!

Once the browser opens, you can:
- ✅ Create a new room
- ✅ Join with a room code
- ✅ Play UNO with friends!

The server logs will show in the terminal where you ran the script.
