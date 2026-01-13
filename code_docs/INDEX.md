# 📚 Rocket UNO - Documentation Index

Welcome! This file will guide you to the right documentation for your needs.

## 🚀 Quick Start (5 minutes)

**New to the project?** Start here:

1. Read: `QUICK_REFERENCE.md` (2 min)
   - Quick commands
   - File organization at a glance
   - Common tasks

2. Run: 
   ```bash
   npm install
   npm start
   ```

3. Open: `http://localhost:3000`

**Done!** Your game is running.

---

## 📖 Documentation Guide

### For Setup & Installation
- **`SETUP.md`** ⭐ Most detailed
  - Prerequisites
  - Step-by-step installation
  - Configuration options
  - Troubleshooting guide

### For Project Organization
- **`PROJECT_STRUCTURE.md`** ⭐ Most detailed
  - Directory structure explanation
  - File purposes
  - How to add new features
  - Development workflow

### For Understanding Architecture
- **`ARCHITECTURE.md`** ⭐ Best for understanding
  - Application flow diagrams
  - Module dependencies
  - Socket event flow
  - Data flow examples

### For Quick Reference
- **`QUICK_REFERENCE.md`** ⭐ Fastest lookup
  - Common commands
  - File tree
  - Common tasks
  - Code examples

### For Project Overview
- **`README.md`**
  - Game features
  - Game rules
  - General project info

### For Understanding Changes
- **`REORGANIZATION.md`**
  - What was reorganized
  - Why changes were made
  - Benefits of new structure

---

## 🗂️ File Structure at a Glance

```
RocketUno/
├── init.js ......................... ⭐ Run this to start
├── config/app.js ................... Settings (modify here)
├── src/socketHandlers.js ........... Socket events
├── utils/ .......................... Helper functions
├── game/Game.js .................... Game logic
├── public/ ......................... Frontend (HTML/CSS/JS)
└── cards/ .......................... Card images
```

---

## 🎯 Find What You Need

### I want to...

#### Start the Application
→ `QUICK_REFERENCE.md` - "Start the Game"

#### Understand the Project
→ `README.md` - Project overview
→ `ARCHITECTURE.md` - System design

#### Set Up for Development
→ `SETUP.md` - Complete setup guide
→ `PROJECT_STRUCTURE.md` - File organization

#### Change Settings
→ `QUICK_REFERENCE.md` - "Common Tasks"
→ `config/app.js` - Edit directly

#### Add a New Feature
→ `PROJECT_STRUCTURE.md` - "Adding New Features"
→ `ARCHITECTURE.md` - Understand data flow

#### Debug an Issue
→ `SETUP.md` - "Troubleshooting"
→ `QUICK_REFERENCE.md` - "Debugging"

#### Understand Socket Events
→ `ARCHITECTURE.md` - "Socket Event Flow"
→ `QUICK_REFERENCE.md` - "Socket Events"

#### Learn the Code Organization
→ `PROJECT_STRUCTURE.md` - Complete overview
→ `REORGANIZATION.md` - What changed and why

---

## 📊 Documentation Comparison

| File | Best For | Read Time |
|------|----------|-----------|
| `QUICK_REFERENCE.md` | Fast lookup, commands | 3-5 min |
| `SETUP.md` | Installation, troubleshooting | 10-15 min |
| `PROJECT_STRUCTURE.md` | Understanding organization | 10-15 min |
| `ARCHITECTURE.md` | Understanding design | 10 min |
| `README.md` | Project overview, rules | 5 min |
| `REORGANIZATION.md` | Understanding changes | 5 min |

---

## 🚀 Getting Started Checklist

- [ ] Read `QUICK_REFERENCE.md` (3 min)
- [ ] Run `npm install` (2 min)
- [ ] Run `npm start` (1 min)
- [ ] Open `http://localhost:3000` in browser
- [ ] Create a game room
- [ ] Play a test game
- [ ] Read `SETUP.md` for detailed setup (optional)
- [ ] Read `ARCHITECTURE.md` to understand the code (optional)
- [ ] Explore the code in your editor

---

## 💡 Pro Tips

1. **Quick Command Lookup?** → `QUICK_REFERENCE.md`
2. **Need to Configure?** → `config/app.js` + `QUICK_REFERENCE.md`
3. **Adding New Code?** → `PROJECT_STRUCTURE.md` - "Adding New Features"
4. **Understanding Flow?** → `ARCHITECTURE.md` - Diagrams
5. **Stuck?** → `SETUP.md` - "Troubleshooting"

---

## 📝 Files Created in Reorganization

New files added to improve organization:

### Application Files
- ✅ `init.js` - Main entry point
- ✅ `config/app.js` - Configuration
- ✅ `src/socketHandlers.js` - Socket events
- ✅ `utils/logger.js` - Logging
- ✅ `utils/networkUtils.js` - Network helpers

### Documentation Files
- ✅ `QUICK_REFERENCE.md` - Quick guide
- ✅ `SETUP.md` - Setup guide
- ✅ `PROJECT_STRUCTURE.md` - Structure docs
- ✅ `ARCHITECTURE.md` - Architecture diagrams
- ✅ `REORGANIZATION.md` - Changes summary
- ✅ `.env.example` - Environment template
- ✅ `INDEX.md` - This file!

---

## 🆘 Need Help?

### If you have a question about...

- **Commands** → `QUICK_REFERENCE.md`
- **Setup** → `SETUP.md`
- **Organization** → `PROJECT_STRUCTURE.md`
- **How it works** → `ARCHITECTURE.md`
- **What changed** → `REORGANIZATION.md`
- **Game rules** → `README.md`

---

## ✨ What's Next?

1. **Read** `QUICK_REFERENCE.md` (3 min)
2. **Run** `npm start`
3. **Play** at `http://localhost:3000`
4. **Explore** the code structure
5. **Customize** `config/app.js` as needed
6. **Build** your own features!

---

**Happy developing!** 🚀

**Last Updated:** January 13, 2026  
**Project:** Rocket UNO v1.0.0  
**Status:** ✅ Reorganized & Ready to Go
