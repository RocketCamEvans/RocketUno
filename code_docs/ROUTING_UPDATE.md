# Routing & Pages Update

## Changes Made

### 1. Lobby Page (`/lobby` or `/`)
- Restructured with sections:
  - **Player Name Section**: Input field for player name
  - **Room Selection**: Choose to create or join a room
- Added **Wiki button** (📖) in top right corner
- Better organized UI with descriptive sections

### 2. Wiki Page (`/wiki`)
- Complete wiki for UNO card types
- Covers all card types:
  - Number Cards (🔢)
  - Skip Cards (⏭️)
  - Reverse Cards (🔄)
  - Draw Two (📊)
  - Wild Cards (🌈)
  - Wild Draw Four (🎲)
- Each article includes:
  - What the card does
  - Points value
  - Strategy tips
  - Special rules

### 3. Client-Side Routing
- Created `wiki.js` for page management
- Handles:
  - Navigation between pages
  - Page state management
  - Browser back/forward buttons
  - Table of Contents linking

## Files Modified
- ✅ `public/index.html` - Updated structure and added wiki page
- ✅ `public/style.css` - Added lobby and wiki styling
- ✅ `public/wiki.js` - Created new wiki system

## Navigation Flow

```
Lobby (/home or /)
    ↓ Click Wiki button
Wiki (/wiki)
    ↓ Click Back button
Lobby (/)
```

## Browser History
- Works with browser back/forward buttons
- Uses `window.history.pushState()` for clean URLs
- No page reloads required

## Features
- ✅ Client-side navigation
- ✅ Wiki with 6 card type articles
- ✅ Responsive design
- ✅ Smooth scrolling to articles
- ✅ Active link highlighting
- ✅ Beautiful UI matching game theme
