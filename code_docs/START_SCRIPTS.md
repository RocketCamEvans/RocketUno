# 🎬 Complete Start Scripts Documentation

## ✅ What's Been Created

Two complete start scripts for launching your Rocket UNO server:

### Files Created
- ✅ `start.bat` - Windows batch script
- ✅ `start.sh` - Linux/Mac bash script  
- ✅ `SCRIPTS_GUIDE.md` - Detailed usage guide

---

## Quick Start

### Windows Users
```bash
# Double-click start.bat in File Explorer
# OR run in Command Prompt:
start.bat
```

### Linux/Mac Users
```bash
# First time only (make executable):
chmod +x start.sh

# Then run:
./start.sh
```

---

## What These Scripts Do

Both `start.bat` and `start.sh` automatically:

1. ✅ **Check Dependencies**
   - Looks for `node_modules` folder
   - Only installs if not found

2. ✅ **Install if Needed**
   - Runs `npm install` automatically
   - Only happens on first run or after delete

3. ✅ **Start the Server**
   - Runs `npm start` (production)
   - Or `npm run dev` (development with auto-restart)

4. ✅ **Display Information**
   - Shows welcome banner
   - Shows server running messages
   - Displays connection URLs

---

## Usage Comparison

| Task | Windows | Linux/Mac |
|------|---------|-----------|
| **Start production** | `start.bat` | `./start.sh` |
| **Start development** | `start.bat dev` | `./start.sh dev` |
| **Auto-install deps** | ✅ Yes | ✅ Yes |
| **Auto-restart (dev)** | ✅ Yes | ✅ Yes |
| **Display messages** | ✅ Yes | ✅ Yes |

---

## Detailed Usage

### Windows (`start.bat`)

#### Method 1: Double-Click
1. Open File Explorer
2. Navigate to your project folder
3. Double-click `start.bat`
4. Server starts automatically

#### Method 2: Command Prompt
```bash
# Production mode
start.bat

# Development mode (auto-restart)
start.bat dev
```

#### Method 3: PowerShell
```powershell
# Production mode
.\start.bat

# Development mode
.\start.bat dev
```

### Linux/Mac (`start.sh`)

#### First Time Only
Make the script executable:
```bash
chmod +x start.sh
```

#### Run Production
```bash
./start.sh
```

#### Run Development (auto-restart)
```bash
./start.sh dev
```

#### Using with bash explicitly
```bash
bash start.sh        # Production
bash start.sh dev    # Development
```

---

## Expected Output

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

[immediately shows running server]
```

---

## Production vs Development

### Production Mode
```bash
start.bat         # Windows
./start.sh        # Linux/Mac
```

**Use when:**
- Playing the actual game
- Showing to friends/testing
- Code is stable
- You don't need auto-restart

**Features:**
- ⚡ Fast startup
- No file watching
- Stable, predictable
- Best performance

### Development Mode
```bash
start.bat dev     # Windows
./start.sh dev    # Linux/Mac
```

**Use when:**
- Writing new code
- Testing features
- Debugging issues
- Making changes

**Features:**
- 🔄 Auto-restarts on file change
- Faster development cycle
- Hot reload support
- Better for development

---

## Windows-Specific Notes

### Making Windows Batch Executable
The `.bat` file works on all Windows versions. Just:
1. Open Command Prompt or PowerShell
2. Navigate to project folder
3. Type: `start.bat`

### PowerShell Execution Policy
If you get an error about execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Double-Click Issues
If double-clicking doesn't work:
1. Right-click `start.bat`
2. Select "Edit"
3. File opens in Notepad
4. Close Notepad
5. Try double-clicking again

---

## Linux/Mac-Specific Notes

### Making Bash Script Executable
Required on first use:
```bash
chmod +x start.sh
```

**What this does:**
- Adds execute permission to the script
- Only needs to be done once
- Safe to run multiple times

### Using Without chmod
If you don't want to chmod:
```bash
bash start.sh        # Production
bash start.sh dev    # Development
```

### macOS Gatekeeper
If Mac warns about untrusted script:
1. Control-click `start.sh`
2. Select "Open"
3. Click "Open" in dialog
4. Script now runs normally

---

## Troubleshooting

### Issue: "Command not found" (Linux/Mac)
**Solution**: Make script executable first
```bash
chmod +x start.sh
./start.sh
```

### Issue: Port 3000 already in use
**Solution**: Edit `.env` file
```
PORT=8080
```
Then run script again.

### Issue: npm install hangs
**Solution**: Stop the script (Ctrl+C) and try:
```bash
npm cache clean --force
npm install
```

### Issue: Dependencies not installing
**Solution**: Remove node_modules and reinstall
```bash
# Windows
rmdir /s /q node_modules

# Linux/Mac
rm -rf node_modules

# Then run script
start.bat          # Windows
./start.sh         # Linux/Mac
```

### Issue: Script doesn't start dev mode
**Make sure you're passing the argument correctly:**
```bash
start.bat dev      # Windows (with space)
./start.sh dev     # Linux/Mac (with space)
```

---

## Advanced Usage

### Environment Variables

#### Windows
```bash
set PORT=8080 && start.bat
```

#### Linux/Mac
```bash
PORT=8080 ./start.sh
```

### Running in Background

#### Windows (PowerShell)
```powershell
Start-Process -NoNewWindow start.bat
```

#### Linux/Mac
```bash
nohup ./start.sh &
```

### Running with Different Node Versions (nvm)

#### Linux/Mac with nvm
```bash
nvm use 16        # Use Node v16
./start.sh        # Start with that version
```

---

## Integration with IDEs

### VS Code
1. Open integrated terminal (Ctrl + `)
2. Type: `start.bat dev` (Windows) or `./start.sh dev` (Linux/Mac)
3. View output in terminal
4. Click on localhost URL

### JetBrains IDEs (WebStorm, IntelliJ)
1. Open Terminal in IDE
2. Type: `./start.sh` or `start.bat`
3. View output in console
4. Click on localhost URL

### Sublime Text
1. Tools → Build System → New Build System
2. Add:
   ```json
   {
     "cmd": ["start.bat"],
     "shell": true
   }
   ```
3. Tools → Build to run

---

## File Contents Summary

### start.bat Features
- ✅ Batch script for Windows
- ✅ Auto-installs dependencies
- ✅ Supports dev mode flag
- ✅ Error handling
- ✅ Emoji support
- ✅ Pauses at end

### start.sh Features
- ✅ Bash script for Linux/Mac
- ✅ Auto-installs dependencies
- ✅ Supports dev mode flag
- ✅ Error handling
- ✅ Emoji support
- ✅ Shebang for direct execution

---

## Quick Reference

### Most Common Commands

**Windows Production:**
```
start.bat
```

**Windows Development:**
```
start.bat dev
```

**Linux/Mac Production:**
```
./start.sh
```

**Linux/Mac Development:**
```
./start.sh dev
```

---

## Summary

| Feature | start.bat | start.sh |
|---------|-----------|----------|
| **OS** | Windows | Linux/Mac |
| **Usage** | Double-click or `start.bat` | `./start.sh` or `bash start.sh` |
| **Dev Mode** | `start.bat dev` | `./start.sh dev` |
| **Auto-Install** | ✅ | ✅ |
| **Auto-Restart** | ✅ (with dev flag) | ✅ (with dev flag) |
| **Error Handling** | ✅ | ✅ |
| **Emoji Output** | ✅ | ✅ |

---

## Next Steps

1. **Windows Users**: Double-click `start.bat` or run `start.bat dev`
2. **Linux/Mac Users**: Run `chmod +x start.sh` then `./start.sh` or `./start.sh dev`
3. **Open Browser**: Navigate to `http://localhost:3000`
4. **Share Network URL**: With friends on your WiFi

---

**You're all set with easy-to-use start scripts!** 🚀

For detailed usage, see `SCRIPTS_GUIDE.md`
