class Game {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.players = [];
    this.hostId = null;
    this.deck = [];
    this.discardPile = [];
    this.currentPlayerIndex = 0;
    this.direction = 1; // 1 for clockwise, -1 for counter-clockwise
    this.started = false;
    this.currentColor = null;
    this.drawStack = 0; // For stacking Draw 2 and Draw 4
  }

  addPlayer(id, name) {
    if (this.players.length === 0) {
      this.hostId = id;
    }
    
    this.players.push({
      id,
      name,
      hand: [],
      calledUno: false
    });
  }

  removePlayer(id) {
    const index = this.players.findIndex(p => p.id === id);
    if (index !== -1) {
      this.players.splice(index, 1);
      
      // Reassign host if needed
      if (this.hostId === id && this.players.length > 0) {
        this.hostId = this.players[0].id;
      }
      
      // Adjust current player index if needed
      if (this.started && this.players.length > 0) {
        if (this.currentPlayerIndex >= this.players.length) {
          this.currentPlayerIndex = 0;
        }
      }
    }
  }

  initializeDeck() {
    this.deck = [];
    const colors = ['red', 'yellow', 'green', 'blue'];
    
    // Add numbered cards (0-9)
    colors.forEach(color => {
      // One 0 per color
      this.deck.push({ color, value: '0', type: 'number' });
      
      // Two of each 1-9 per color
      for (let i = 1; i <= 9; i++) {
        this.deck.push({ color, value: i.toString(), type: 'number' });
        this.deck.push({ color, value: i.toString(), type: 'number' });
      }
      
      // Two of each action card per color
      ['skip', 'reverse', 'draw2'].forEach(action => {
        this.deck.push({ color, value: action, type: 'action' });
        this.deck.push({ color, value: action, type: 'action' });
      });
    });
    
    // Add wild cards (4 of each)
    for (let i = 0; i < 4; i++) {
      this.deck.push({ color: 'wild', value: 'wild', type: 'wild' });
      this.deck.push({ color: 'wild', value: 'draw4', type: 'wild' });
    }
    
    // Add custom humorous cards (one of each)
    this.deck.push({ color: 'custom', value: 'BigDuro', type: 'custom' });
    this.deck.push({ color: 'custom', value: 'BigTyson', type: 'custom' });
    this.deck.push({ color: 'custom', value: 'Darebear', type: 'custom' });
    this.deck.push({ color: 'custom', value: 'Chugg', type: 'custom' });
    
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCards() {
    // Deal 7 cards to each player
    this.players.forEach(player => {
      player.hand = [];
      for (let i = 0; i < 7; i++) {
        player.hand.push(this.deck.pop());
      }
    });
    
    // Place first card on discard pile (can't be a wild or custom card)
    let firstCard;
    do {
      firstCard = this.deck.pop();
      // Put it back if it's wild or custom, we'll draw again
      if (firstCard.type === 'wild' || firstCard.type === 'custom') {
        this.deck.unshift(firstCard); // Put back at bottom of deck
        firstCard = null;
      }
    } while (!firstCard);
    
    this.discardPile.push(firstCard);
    this.currentColor = firstCard.color;
    
    // Handle first card effects
    if (firstCard.value === 'skip') {
      this.currentPlayerIndex = 1;
    } else if (firstCard.value === 'reverse') {
      this.direction = -1;
      this.currentPlayerIndex = this.players.length - 1;
    } else if (firstCard.value === 'draw2') {
      this.drawStack = 2;
    }
  }

  startGame() {
    this.initializeDeck();
    this.dealCards();
    this.started = true;
    this.currentPlayerIndex = 0;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getTopCard() {
    return this.discardPile[this.discardPile.length - 1];
  }

  canPlayCard(card, topCard) {
    if (card.type === 'wild') return true;
    if (card.type === 'custom') return true; // Custom cards can be played anytime
    if (card.color === this.currentColor) return true;
    if (card.value === topCard.value) return true;
    return false;
  }

  playCard(playerId, cardIndex, chosenColor = null, targetPlayerId = null) {
    const player = this.players.find(p => p.id === playerId);
    
    if (!player) {
      return { success: false, error: 'Player not found' };
    }
    
    if (this.getCurrentPlayer().id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }
    
    if (cardIndex < 0 || cardIndex >= player.hand.length) {
      return { success: false, error: 'Invalid card index' };
    }
    
    const card = player.hand[cardIndex];
    const topCard = this.getTopCard();
    
    // Check if must draw first (when draw cards are stacked)
    if (this.drawStack > 0 && card.value !== 'draw2' && card.value !== 'draw4') {
      return { success: false, error: `Must draw ${this.drawStack} cards or play a draw card` };
    }
    
    if (!this.canPlayCard(card, topCard)) {
      return { success: false, error: 'Cannot play this card' };
    }
    
    // Remove card from player's hand
    player.hand.splice(cardIndex, 1);
    this.discardPile.push(card);
    
    // Reset UNO call if player has more than 1 card
    if (player.hand.length !== 1) {
      player.calledUno = false;
    }
    
    // Handle wild cards
    if (card.type === 'wild') {
      if (!chosenColor || !['red', 'yellow', 'green', 'blue'].includes(chosenColor)) {
        // Default to a color from player's hand if not specified
        chosenColor = this.chooseColorForPlayer(player);
      }
      this.currentColor = chosenColor;
    } else if (card.type === 'custom') {
      // BigDuro allows color choice like a wild card
      if (card.value === 'BigDuro') {
        if (!chosenColor || !['red', 'yellow', 'green', 'blue'].includes(chosenColor)) {
          chosenColor = this.chooseColorForPlayer(player);
        }
        this.currentColor = chosenColor;
      }
      // Other custom cards maintain current color
    } else {
      this.currentColor = card.color;
    }
    
    // Handle card effects
    let skipNext = false;
    let customEffect = null;
    
    if (card.value === 'skip') {
      skipNext = true;
    } else if (card.value === 'reverse') {
      if (this.players.length === 2) {
        // In 2-player game, reverse acts as skip
        skipNext = true;
      } else {
        this.direction *= -1;
      }
    } else if (card.value === 'draw2') {
      this.drawStack += 2;
    } else if (card.value === 'draw4') {
      this.drawStack += 4;
    } else if (card.value === 'BigDuro') {
      // BigDuro: Player goes again (don't advance turn)
      customEffect = { type: 'BigDuro', playerName: player.name };
      // Set flag to prevent nextPlayer from being called
      skipNext = 'stay'; // Special flag to indicate staying on current player
    } else if (card.value === 'BigTyson') {
      // BigTyson: Trade decks with target player
      if (!targetPlayerId) {
        return { success: false, error: 'Must choose a player to trade with' };
      }
      const targetPlayer = this.players.find(p => p.id === targetPlayerId);
      if (!targetPlayer || targetPlayer.id === playerId) {
        return { success: false, error: 'Invalid target player' };
      }
      // Swap hands
      const tempHand = player.hand;
      player.hand = targetPlayer.hand;
      targetPlayer.hand = tempHand;
      customEffect = { type: 'BigTyson', playerName: player.name, targetName: targetPlayer.name };
    } else if (card.value === 'Darebear') {
      // Darebear: Just a lightshow, no game effect
      customEffect = { type: 'Darebear' };
    } else if (card.value === 'Chugg') {
      // Chugg: Target player draws 5 cards
      if (!targetPlayerId) {
        return { success: false, error: 'Must choose a player to give cards to' };
      }
      const targetPlayer = this.players.find(p => p.id === targetPlayerId);
      if (!targetPlayer) {
        return { success: false, error: 'Invalid target player' };
      }
      // Give target player 5 cards
      for (let i = 0; i < 5; i++) {
        if (this.deck.length === 0) {
          this.reshuffleDiscardPile();
        }
        if (this.deck.length > 0) {
          targetPlayer.hand.push(this.deck.pop());
        }
      }
      customEffect = { type: 'Chugg', playerName: player.name, targetName: targetPlayer.name };
    }
    
    // Check for win condition
    if (player.hand.length === 0) {
      return { success: true, gameOver: true, winner: player, customEffect };
    }
    
    // Move to next player (unless BigDuro was played which keeps current player)
    if (skipNext !== 'stay') {
      this.nextPlayer(skipNext ? 2 : 1);
    }
    
    // If next player must draw, and draw stack exists
    if (this.drawStack > 0) {
      const nextPlayer = this.getCurrentPlayer();
      const hasDrawCard = nextPlayer.hand.some(c => c.value === 'draw2' || c.value === 'draw4');
      
      if (!hasDrawCard) {
        // Auto-draw for next player if they can't stack
        // (they can manually draw on their turn)
      }
    }
    
    return { success: true, customEffect };
  }

  drawCard(playerId) {
    const player = this.players.find(p => p.id === playerId);
    
    if (!player) {
      return { success: false, error: 'Player not found' };
    }
    
    if (this.getCurrentPlayer().id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }
    
    let cardsToDraw = 1;
    
    // Handle draw stack
    if (this.drawStack > 0) {
      cardsToDraw = this.drawStack;
      this.drawStack = 0;
    }
    
    for (let i = 0; i < cardsToDraw; i++) {
      if (this.deck.length === 0) {
        this.reshuffleDiscardPile();
      }
      
      if (this.deck.length > 0) {
        player.hand.push(this.deck.pop());
      }
    }
    
    player.calledUno = false;
    
    // Move to next player after drawing (UNO rules: draw and skip turn)
    this.nextPlayer(1);
    
    return { success: true, drew: cardsToDraw };
  }

  reshuffleDiscardPile() {
    if (this.discardPile.length <= 1) return;
    
    // Keep top card, reshuffle rest into deck
    const topCard = this.discardPile.pop();
    this.deck = [...this.discardPile];
    this.discardPile = [topCard];
    this.shuffleDeck();
  }

  nextPlayer(skip = 1) {
    this.currentPlayerIndex = (this.currentPlayerIndex + (this.direction * skip) + this.players.length) % this.players.length;
  }

  callUno(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (player && player.hand.length === 1) {
      player.calledUno = true;
    }
  }

  challengeUno(targetPlayerId) {
    const player = this.players.find(p => p.id === targetPlayerId);
    
    if (!player) {
      return { success: false };
    }
    
    // If player has 1 card and didn't call UNO, they draw 2 cards as penalty
    if (player.hand.length === 1 && !player.calledUno) {
      for (let i = 0; i < 2; i++) {
        if (this.deck.length === 0) {
          this.reshuffleDiscardPile();
        }
        if (this.deck.length > 0) {
          player.hand.push(this.deck.pop());
        }
      }
      return { success: true, penalized: true, playerName: player.name };
    }
    
    return { success: false, penalized: false };
  }

  chooseColorForPlayer(player) {
    // Count colors in player's hand
    const colorCounts = { red: 0, yellow: 0, green: 0, blue: 0 };
    
    player.hand.forEach(card => {
      if (card.color !== 'wild') {
        colorCounts[card.color]++;
      }
    });
    
    // Return most common color, or red as default
    let maxColor = 'red';
    let maxCount = 0;
    
    for (const [color, count] of Object.entries(colorCounts)) {
      if (count > maxCount) {
        maxCount = count;
        maxColor = color;
      }
    }
    
    return maxColor;
  }

  getState() {
    return {
      roomCode: this.roomCode,
      started: this.started,
      hostId: this.hostId,
      players: this.players.map(p => ({
        id: p.id,
        name: p.name,
        cardCount: p.hand.length,
        calledUno: p.calledUno
      })),
      currentPlayerId: this.started ? this.getCurrentPlayer().id : null,
      topCard: this.discardPile.length > 0 ? this.getTopCard() : null,
      currentColor: this.currentColor,
      direction: this.direction,
      drawStack: this.drawStack,
      deckSize: this.deck.length
    };
  }

  getPlayerHand(playerId) {
    const player = this.players.find(p => p.id === playerId);
    return player ? player.hand : [];
  }
}

module.exports = Game;
