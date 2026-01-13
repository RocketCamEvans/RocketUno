# Simplified Start Scripts

## Windows: `start.bat` (3 lines!)

```batch
@echo off

if not exist node_modules npm install
if "%1"=="dev" (npm run dev) else (npm start)
```

**Usage:**
```bash
start.bat              # Production mode
start.bat dev          # Development mode (auto-restart)
```

## Linux/Mac: `start.sh` (4 lines!)

```bash
#!/bin/bash

[ ! -d "node_modules" ] && npm install
[ "$1" = "dev" ] && npm run dev || npm start
```

**Usage:**
```bash
chmod +x start.sh      # First time only
./start.sh             # Production mode
./start.sh dev         # Development mode (auto-restart)
```

## What They Do

✅ Check if `node_modules` exists  
✅ Install dependencies if needed (first time only)  
✅ Start server in production or development mode  

That's it! Clean and simple.

## Manual Alternative

```bash
npm install            # Only on first run if deps missing
npm start              # Production
npm run dev            # Development with auto-restart
```
