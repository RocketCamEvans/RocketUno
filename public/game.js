const socket = io();

let currentPlayerId = null;
let currentRoomCode = null;
let gameState = null;
let pendingWildCard = null;
let pendingCustomCard = null; // For cards that need target selection

// DOM Elements
const screens = {
  lobby: document.getElementById('lobby'),
  waitingRoom: document.getElementById('waitingRoom'),
  game: document.getElementById('game')
};

const lobbyElements = {
  playerName: document.getElementById('playerName'),
  createRoomBtn: document.getElementById('createRoomBtn'),
  roomCode: document.getElementById('roomCode'),
  joinRoomBtn: document.getElementById('joinRoomBtn')
};

const waitingRoomElements = {
  displayRoomCode: document.getElementById('displayRoomCode'),
  copyCodeBtn: document.getElementById('copyCodeBtn'),
  playersList: document.getElementById('playersList'),
  playerCount: document.getElementById('playerCount'),
  startGameBtn: document.getElementById('startGameBtn'),
  waitingMessage: document.getElementById('waitingMessage'),
  leaveRoomBtn: document.getElementById('leaveRoomBtn')
};

const gameElements = {
  gameRoomCode: document.getElementById('gameRoomCode'),
  deckCount: document.getElementById('deckCount'),
  turnIndicator: document.getElementById('turnIndicator'),
  otherPlayers: document.getElementById('otherPlayers'),
  topCard: document.getElementById('topCard'),
  currentColorIndicator: document.getElementById('currentColorIndicator'),
  drawStackIndicator: document.getElementById('drawStackIndicator'),
  deckPile: document.getElementById('deckPile'),
  currentPlayerName: document.getElementById('currentPlayerName'),
  unoBtn: document.getElementById('unoBtn'),
  playerHand: document.getElementById('playerHand'),
  colorPicker: document.getElementById('colorPicker'),
  playerSelector: document.getElementById('playerSelector'),
  playerSelectorTitle: document.getElementById('playerSelectorTitle'),
  playerSelectorList: document.getElementById('playerSelectorList'),
  gameOver: document.getElementById('gameOver'),
  winnerText: document.getElementById('winnerText'),
  backToLobbyBtn: document.getElementById('backToLobbyBtn')
};

const errorToast = document.getElementById('errorToast');
const customEffectToast = document.getElementById('customEffectToast');

// Utility Functions
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
}

function showError(message) {
  errorToast.textContent = message;
  errorToast.classList.add('show');
  setTimeout(() => errorToast.classList.remove('show'), 3000);
}

function showCustomEffect(message) {
  customEffectToast.textContent = message;
  customEffectToast.classList.add('show');
  setTimeout(() => customEffectToast.classList.remove('show'), 6000);
}

function getCardImage(card) {
  if (card.type === 'custom') {
    // Custom cards use their own image files
    return `/cards/${card.value}.${card.value === 'BigDuro' ? 'jpeg' : card.value === 'Darebear' ? 'jpeg' : 'png'}`;
  }
  return `/cards/${card.color}_${card.value}.png`;
}

// Lobby Event Listeners
lobbyElements.createRoomBtn.addEventListener('click', () => {
  const playerName = lobbyElements.playerName.value.trim();
  if (!playerName) {
    showError('Please enter your name');
    return;
  }
  socket.emit('createRoom', playerName);
});

lobbyElements.joinRoomBtn.addEventListener('click', () => {
  const playerName = lobbyElements.playerName.value.trim();
  const roomCode = lobbyElements.roomCode.value.trim().toUpperCase();
  
  if (!playerName) {
    showError('Please enter your name');
    return;
  }
  
  if (!roomCode) {
    showError('Please enter a room code');
    return;
  }
  
  socket.emit('joinRoom', { roomCode, playerName });
});

lobbyElements.roomCode.addEventListener('input', (e) => {
  e.target.value = e.target.value.toUpperCase();
});

// Waiting Room Event Listeners
waitingRoomElements.copyCodeBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(currentRoomCode);
  waitingRoomElements.copyCodeBtn.textContent = 'Copied!';
  setTimeout(() => {
    waitingRoomElements.copyCodeBtn.textContent = 'Copy Code';
  }, 2000);
});

waitingRoomElements.startGameBtn.addEventListener('click', () => {
  socket.emit('startGame');
});

waitingRoomElements.leaveRoomBtn.addEventListener('click', () => {
  location.reload();
});

// Game Event Listeners
gameElements.deckPile.addEventListener('click', () => {
  if (!gameState || gameState.currentPlayerId !== currentPlayerId) return;
  socket.emit('drawCard');
});

gameElements.unoBtn.addEventListener('click', () => {
  socket.emit('callUno');
  gameElements.unoBtn.style.display = 'none';
});

gameElements.backToLobbyBtn.addEventListener('click', () => {
  location.reload();
});

// Color picker
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    gameElements.colorPicker.classList.remove('active');
    
    if (pendingWildCard !== null) {
      socket.emit('playCard', { cardIndex: pendingWildCard, chosenColor: color });
      pendingWildCard = null;
    }
  });
});

// Socket Event Handlers
socket.on('roomCreated', ({ roomCode, playerId }) => {
  currentRoomCode = roomCode;
  currentPlayerId = playerId;
  waitingRoomElements.displayRoomCode.textContent = roomCode;
  showScreen('waitingRoom');
});

socket.on('roomJoined', ({ roomCode, playerId }) => {
  currentRoomCode = roomCode;
  currentPlayerId = playerId;
  waitingRoomElements.displayRoomCode.textContent = roomCode;
  showScreen('waitingRoom');
});

socket.on('gameState', (state) => {
  gameState = state;
  
  if (state.started) {
    updateGameUI(state);
  } else {
    updateWaitingRoom(state);
  }
});

socket.on('gameStarted', () => {
  showScreen('game');
  gameElements.gameRoomCode.textContent = currentRoomCode;
});

socket.on('gameOver', ({ winner }) => {
  gameElements.winnerText.textContent = `${winner.name} wins!`;
  gameElements.gameOver.classList.add('active');
});

socket.on('unoChallenged', ({ penalized, playerName }) => {
  if (penalized) {
    showError(`${playerName} forgot to call UNO and drew 2 cards!`);
  }
});

socket.on('customEffect', (effect) => {
  let message = '';
  
  switch(effect.type) {
    case 'BigDuro':
      message = `Big Duro steals yo gurl and yo turn. ${effect.playerName} goes again`;
      break;
    case 'BigTyson':
      message = `Big Tyson said he likes ${effect.targetName} deck better, how could you say no?`;
      break;
    case 'Darebear':
      message = 'Darebear is just here to chill and dance';
      // Trigger lightshow
      document.body.classList.add('lightshow');
      setTimeout(() => {
        document.body.classList.remove('lightshow');
      }, 8000);
      break;
    case 'Chugg':
      message = `Chugg has a present for you ${effect.targetName}, draw 5.`;
      break;
  }
  
  showCustomEffect(message);
});

socket.on('playerLeft', (playerId) => {
  showError('A player has left the game');
});

socket.on('error', (message) => {
  showError(message);
});

// Update Functions
function updateWaitingRoom(state) {
  waitingRoomElements.playersList.innerHTML = '';
  state.players.forEach(player => {
    const li = document.createElement('li');
    li.textContent = player.name;
    if (player.id === state.hostId) {
      li.classList.add('host');
    }
    waitingRoomElements.playersList.appendChild(li);
  });
  
  waitingRoomElements.playerCount.textContent = state.players.length;
  
  if (currentPlayerId === state.hostId) {
    waitingRoomElements.startGameBtn.style.display = 'block';
    waitingRoomElements.waitingMessage.style.display = 'none';
  } else {
    waitingRoomElements.startGameBtn.style.display = 'none';
    waitingRoomElements.waitingMessage.style.display = 'block';
  }
}

function updateGameUI(state) {
  // Update deck count
  gameElements.deckCount.textContent = `🃏 ${state.deckSize}`;
  
  // Track previous turn to detect changes
  const wasMyTurn = gameState && gameState.currentPlayerId === currentPlayerId;
  const isMyTurn = state.currentPlayerId === currentPlayerId;
  
  // Update turn indicator
  const currentPlayer = state.players.find(p => p.id === state.currentPlayerId);
  if (currentPlayer) {
    if (isMyTurn) {
      gameElements.turnIndicator.textContent = '🎯 Your Turn';
      gameElements.turnIndicator.style.color = '#ffd700';
      document.querySelector('.player-section').classList.add('my-turn');
      
      // Show turn banner when it becomes your turn
      if (!wasMyTurn) {
        const turnBanner = document.getElementById('turnBanner');
        turnBanner.style.display = 'block';
        setTimeout(() => {
          turnBanner.style.display = 'none';
        }, 1500);
      }
    } else {
      gameElements.turnIndicator.textContent = `${currentPlayer.name}'s Turn`;
      gameElements.turnIndicator.style.color = '#fff';
      document.querySelector('.player-section').classList.remove('my-turn');
    }
  }
  
  // Update top card
  if (state.topCard) {
    gameElements.topCard.style.backgroundImage = `url(${getCardImage(state.topCard)})`;
  }
  
  // Update current color
  if (state.currentColor) {
    gameElements.currentColorIndicator.className = `color-indicator ${state.currentColor}`;
  }
  
  // Update draw stack
  if (state.drawStack > 0) {
    gameElements.drawStackIndicator.textContent = `+${state.drawStack}`;
    gameElements.drawStackIndicator.style.display = 'block';
  } else {
    gameElements.drawStackIndicator.style.display = 'none';
  }
  
  // Update other players
  updateOtherPlayers(state);
  
  // Update player's hand
  updatePlayerHand(state);
  
  // Show UNO button if player has 1 card and hasn't called it
  const myPlayer = state.players.find(p => p.id === currentPlayerId);
  if (myPlayer && myPlayer.cardCount === 1 && !myPlayer.calledUno) {
    gameElements.unoBtn.style.display = 'block';
  } else {
    gameElements.unoBtn.style.display = 'none';
  }
  
  // Enable/disable deck pile
  if (state.currentPlayerId === currentPlayerId) {
    gameElements.deckPile.classList.remove('disabled');
  } else {
    gameElements.deckPile.classList.add('disabled');
  }
}

function updateOtherPlayers(state) {
  gameElements.otherPlayers.innerHTML = '';
  
  state.players.forEach(player => {
    if (player.id === currentPlayerId) return;
    
    const playerDiv = document.createElement('div');
    playerDiv.className = 'other-player';
    
    if (player.id === state.currentPlayerId) {
      playerDiv.classList.add('current-turn');
    }
    
    playerDiv.innerHTML = `
      <div class="other-player-name">${player.name}</div>
      <div class="card-count">🃏 ${player.cardCount}</div>
      ${player.calledUno ? '<div class="uno-badge">UNO!</div>' : ''}
    `;
    
    // Add challenge button if player has 1 card and didn't call UNO
    if (player.cardCount === 1 && !player.calledUno) {
      const challengeBtn = document.createElement('button');
      challengeBtn.className = 'btn btn-small';
      challengeBtn.textContent = 'Challenge!';
      challengeBtn.style.marginTop = '10px';
      challengeBtn.onclick = () => socket.emit('challengeUno', player.id);
      playerDiv.appendChild(challengeBtn);
    }
    
    gameElements.otherPlayers.appendChild(playerDiv);
  });
}

function updatePlayerHand(state) {
  // Request player's hand from server
  socket.emit('getHand');
}

// Get player's hand
socket.on('playerHand', (hand) => {
  gameElements.playerHand.innerHTML = '';
  
  hand.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    // Mark wild cards with special class and text
    if (card.type === 'wild') {
      cardDiv.classList.add('wild-card');
      if (card.value === 'draw4') {
        cardDiv.textContent = 'WILD +4';
      } else {
        cardDiv.textContent = 'WILD';
      }
    }
    
    // Mark custom cards
    if (card.type === 'custom') {
      cardDiv.classList.add('custom-card');
    }
    
    cardDiv.style.backgroundImage = `url(${getCardImage(card)})`;
    
    // Check if card is playable
    const canPlay = canPlayCard(card);
    
    if (!canPlay || gameState.currentPlayerId !== currentPlayerId) {
      cardDiv.classList.add('disabled');
    } else {
      cardDiv.addEventListener('click', () => {
        if (card.type === 'wild' || card.value === 'BigDuro') {
          // Wild cards and BigDuro need color selection
          pendingWildCard = index;
          gameElements.colorPicker.classList.add('active');
        } else if (card.value === 'BigTyson' || card.value === 'Chugg') {
          // These cards need target selection
          pendingCustomCard = { index, cardType: card.value };
          showPlayerSelector(card.value);
        } else {
          // Play card directly
          socket.emit('playCard', { cardIndex: index });
        }
      });
    }
    
    gameElements.playerHand.appendChild(cardDiv);
  });
});

// Request hand whenever game state updates
socket.on('gameState', (state) => {
  if (state.started) {
    socket.emit('getHand');
  }
});

function canPlayCard(card) {
  if (!gameState || !gameState.topCard) return false;
  
  const topCard = gameState.topCard;
  
  // Wild and custom cards can always be played
  if (card.type === 'wild' || card.type === 'custom') {
    // But if there's a draw stack, only draw cards can be played
    if (gameState.drawStack > 0) {
      return card.value === 'draw4';
    }
    return true;
  }
  
  // If there's a draw stack, only draw cards can be played
  if (gameState.drawStack > 0) {
    return card.value === 'draw2' || card.value === 'draw4';
  }
  
  // Match color or value
  if (card.color === gameState.currentColor) return true;
  if (card.value === topCard.value) return true;
  
  return false;
}

// Handle getHand request on server side
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Player selector for custom cards
function showPlayerSelector(cardType) {
  let title = '';
  if (cardType === 'BigTyson') {
    title = 'Choose a player to trade decks with';
  } else if (cardType === 'Chugg') {
    title = 'Choose a player to give 5 cards';
  }
  
  gameElements.playerSelectorTitle.textContent = title;
  gameElements.playerSelectorList.innerHTML = '';
  
  // Show all other players
  gameState.players.forEach(player => {
    if (player.id === currentPlayerId) return; // Can't select yourself
    
    const btn = document.createElement('button');
    btn.className = 'player-selector-btn';
    btn.textContent = `${player.name} (${player.cardCount} cards)`;
    btn.onclick = () => {
      gameElements.playerSelector.classList.remove('active');
      socket.emit('playCard', { 
        cardIndex: pendingCustomCard.index, 
        targetPlayerId: player.id 
      });
      pendingCustomCard = null;
    };
    gameElements.playerSelectorList.appendChild(btn);
  });
  
  gameElements.playerSelector.classList.add('active');
}
