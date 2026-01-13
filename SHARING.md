# 🌐 Share Your UNO Game Online

Your game is currently running on `http://localhost:3000` but only accessible on your computer. Here are the easiest ways to share it with friends:

## Option 1: ngrok (Recommended - Most Reliable)

1. **Download ngrok**: Go to https://ngrok.com/download
2. **Extract and run**:
   ```bash
   ngrok http 3000
   ```
3. **Share the URL**: ngrok will display a public URL like `https://abc123.ngrok.io`
4. **Send to friends**: They can open that URL in their browser and join your game!

**Pros**: Very stable, HTTPS support, works great
**Cons**: Requires download (but it's free and easy)

## Option 2: Cloudflare Tunnel (Free, No Account Needed)

1. **Download cloudflared**: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
2. **Run**:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
3. **Share the URL**: Copy the URL it provides (looks like `https://random-words.trycloudflare.com`)

**Pros**: Free, no account required, reliable
**Cons**: Requires download

## Option 3: Deploy to a Free Hosting Service

### Railway (Easiest Deploy)
1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repository
4. Railway auto-detects Node.js and deploys
5. Get a permanent URL like `https://your-game.up.railway.app`

### Render (Another Good Option)
1. Create account at https://render.com
2. Click "New" → "Web Service"
3. Connect repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy and get permanent URL

### Glitch (Quick Testing)
1. Go to https://glitch.com
2. Create new project
3. Upload your files
4. Get instant URL

## Option 4: Local Network (Same WiFi Only)

If your friends are on the same WiFi network:

1. **Find your local IP**:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (something like 192.168.1.x)

2. **Share**: `http://YOUR-IP:3000` (e.g., `http://192.168.1.5:3000`)

**Pros**: No setup needed
**Cons**: Only works on same WiFi network

---

## Current Status

Your server is running at:
- **Local**: http://localhost:3000
- **Needs**: A tunnel or deployment for internet access

## Quick Start with ngrok

The fastest way to get started right now:

1. Download ngrok from https://ngrok.com/download
2. Open a new terminal in the game folder
3. Run: `ngrok http 3000`
4. Copy the HTTPS URL it shows
5. Share with friends!

Your UNO server will stay running as long as this terminal stays open.
