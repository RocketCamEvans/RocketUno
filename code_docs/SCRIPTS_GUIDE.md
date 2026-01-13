# 🚀 Start Scripts Guide

## Overview

Two convenient start scripts have been created to easily launch your Rocket UNO server:

- **Windows**: `start.bat`
- **Linux/Mac**: `start.sh`

Both scripts handle everything:
- ✅ Check if dependencies are installed
- ✅ Install dependencies if needed
- ✅ Start the server
- ✅ Support development mode

---

## Windows Start Script (`start.bat`)

### Usage

#### Production Mode
Double-click `start.bat` or run in command prompt:
```bash
start.bat
```

#### Development Mode (auto-restart)
Run in command prompt:
```bash
start.bat dev
```

### Features
- Automatically installs dependencies if `node_modules` doesn't exist
- Displays startup messages with emojis
- Supports both production and development modes
- Pauses at the end so you can see the output
- Easy error reporting

### What It Does
1. Displays welcome banner
2. Checks if `node_modules` exists
3. Installs dependencies if needed
4. Starts server in production or development mode
5. Shows server running messages

---

## Linux/Mac Start Script (`start.sh`)

### First Time Setup

Make the script executable:
```bash
chmod +x start.sh
```

### Usage

#### Production Mode
```bash
./start.sh
```

#### Development Mode (auto-restart)
```bash
./start.sh dev
```

### Features
- Automatically installs dependencies if `node_modules` doesn't exist
- Displays startup messages with emojis
- Supports both production and development modes
- Proper error handling
- Works on Linux and Mac

### What It Does
1. Displays welcome banner
2. Checks if `node_modules` exists
3. Installs dependencies if needed
4. Starts server in production or development mode
5. Shows server running messages

---

## Comparison

| Feature | Windows | Linux/Mac |
|---------|---------|-----------|
| **File** | `start.bat` | `start.sh` |
| **Production** | `start.bat` | `./start.sh` |
| **Development** | `start.bat dev` | `./start.sh dev` |
| **Auto-Install** | ✅ | ✅ |
| **Emoji Support** | ✅ | ✅ |
| **Error Handling** | ✅ | ✅ |
| **Pause on Exit** | ✅ | ❌ |

---

## Quick Reference

### Windows
```bash
# First time
start.bat

# Every time after
start.bat

# Development mode
start.bat dev
```

### Linux/Mac
```bash
# First time (make executable)
chmod +x start.sh

# Production mode
./start.sh

# Development mode
./start.sh dev
```

---

## What Happens When You Run

### Initial Run
```
╔════════════════════════════════════════╗
║     🚀 Rocket UNO - Server Starter     ║
╚════════════════════════════════════════╝

📦 Installing dependencies...

[npm install output...]

✅ Dependencies installed successfully!

🎮 Starting in PRODUCTION mode...

🚀 Rocket UNO Server is running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Local:     http://localhost:3000
🌐 Network:   http://192.168.1.100:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Environment: development
👥 Max Players: 10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Share the Network URL with friends!
```

### Subsequent Runs
```
╔════════════════════════════════════════╗
║     🚀 Rocket UNO - Server Starter     ║
╚════════════════════════════════════════╝

🎮 Starting in PRODUCTION mode...

🚀 Rocket UNO Server is running!
[server output...]
```

---

## Development vs Production

### Production Mode
- **Command**: `start.bat` or `./start.sh`
- **Best for**: Playing the game, demos, testing
- **Auto-restart**: No
- **Best when**: Code is stable and tested

### Development Mode
- **Command**: `start.bat dev` or `./start.sh dev`
- **Best for**: Coding and testing new features
- **Auto-restart**: Yes (using nodemon)
- **Best when**: You're actively developing

---

## Troubleshooting

### Windows: Script doesn't run
**Solution**: Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Linux/Mac: Permission denied
**Solution**: Make script executable:
```bash
chmod +x start.sh
```

### Port already in use
**Solution**: Edit `.env` file and change PORT:
```
PORT=8080
```

### Dependencies won't install
**Solution**: Delete `node_modules` and try again:
```bash
rmdir /s node_modules      # Windows
rm -rf node_modules        # Linux/Mac
start.bat                  # Windows
./start.sh                 # Linux/Mac
```

---

## Advanced Usage

### Environment Variables (Windows)
```bash
PORT=8080 start.bat
```

### Environment Variables (Linux/Mac)
```bash
PORT=8080 ./start.sh
```

### Run and Stay in Terminal (Windows)
Remove `pause` from `start.bat` if you don't want the pause.

---

## File Contents

### start.bat
```batch
@echo off
REM Checks for node_modules
REM Auto-installs dependencies if needed
REM Supports dev flag for development mode
```

### start.sh
```bash
#!/bin/bash
# Checks for node_modules
# Auto-installs dependencies if needed
# Supports dev flag for development mode
```

Both scripts do essentially the same thing with OS-specific syntax.

---

## Integration with Other Tools

### Using with VS Code
1. Open integrated terminal (Ctrl + `)
2. Windows: Type `start.bat dev`
3. Linux/Mac: Type `./start.sh dev`
4. Click on server URL when it appears

### Using with Git Bash (Windows)
```bash
./start.sh   # Works with Git Bash
```

### Scheduled Runs (Advanced)

**Windows Task Scheduler**:
- Create task with trigger "At log on"
- Action: Run `start.bat`

**Linux Cron**:
```cron
@reboot /path/to/start.sh
```

---

## Summary

| Task | Command |
|------|---------|
| **Start server** | `start.bat` / `./start.sh` |
| **Start with auto-restart** | `start.bat dev` / `./start.sh dev` |
| **Make executable (Linux)** | `chmod +x start.sh` |
| **View game** | `http://localhost:3000` |

---

**You're all set! Use these scripts to easily start your server anytime!** 🚀
