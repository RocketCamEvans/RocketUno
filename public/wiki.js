/**
 * Wiki System
 * Handles wiki page routing and content display with card images and search
 */

class Wiki {
  constructor() {
    this.articles = {
      'number-cards': {
        title: 'Number Cards',
        emoji: '🔢',
        image: 'red_0.png',
        description: 'Cards numbered 0-9 in each color',
        content: `
          <h3>Overview</h3>
          <p>Number cards are the foundation of UNO. They form sequences by matching either the number or color of the top discard pile card.</p>
          
          <h3>Card Values</h3>
          <p>Each color has number cards from 0 to 9. Each card is valuable for building sequences and can be played whenever you have a matching number or color.</p>
          
          <h3>Points</h3>
          <p>Number 0 = 0 points, Number 1 = 1 point, etc. (up to 9 points)</p>
          
          <h3>Strategy Tips</h3>
          <p>Hold onto cards with the same color to build flexibility. Number cards are less valuable than action cards, so play them strategically to maintain options.</p>
        `
      },
      'skip-card': {
        title: 'Skip Card',
        emoji: '⏭️',
        image: 'red_skip.png',
        description: 'Force next player to skip their turn',
        content: `
          <h3>What It Does</h3>
          <p>The Skip card forces the next player to lose their turn. The turn passes to the player after them.</p>
          
          <h3>Points Value</h3>
          <p>Worth 20 points if left in your hand at game end.</p>
          
          <h3>Strategy Tips</h3>
          <ul style="margin-left: 20px;">
            <li>Use Skip to prevent opponents from playing dangerous cards</li>
            <li>Combine with other action cards for more impact</li>
            <li>Don't waste Skip early if you can avoid it</li>
            <li>In 2-player games, Skip acts like drawing 1 card (your turn comes back to you)</li>
          </ul>
        `
      },
      'reverse-card': {
        title: 'Reverse Card',
        emoji: '🔄',
        image: 'red_reverse.png',
        description: 'Change the direction of play',
        content: `
          <h3>What It Does</h3>
          <p>The Reverse card changes the direction of play. If playing clockwise, it switches to counter-clockwise, and vice versa.</p>
          
          <h3>Points Value</h3>
          <p>Worth 20 points if left in your hand at game end.</p>
          
          <h3>Strategy Tips</h3>
          <ul style="margin-left: 20px;">
            <li>Use Reverse to slow down winning opponents</li>
            <li>In 2-player games, Reverse acts like Skip (passes turn to opponent)</li>
            <li>Combine with other action cards for tactical advantage</li>
            <li>Reverse can disrupt carefully planned sequences</li>
          </ul>
        `
      },
      'draw-two': {
        title: 'Draw Two Card',
        emoji: '📊',
        image: 'red_draw2.png',
        description: 'Next player draws 2 cards and skips turn',
        content: `
          <h3>What It Does</h3>
          <p>The Draw Two card forces the next player to draw 2 cards and lose their turn. The turn passes to the player after them.</p>
          
          <h3>Points Value</h3>
          <p>Worth 20 points if left in your hand at game end.</p>
          
          <h3>Draw Stack Rule</h3>
          <p>If a player plays another Draw Two on you, the stack increases (2+2=4 cards). You keep drawing until someone doesn't stack, then you draw the total and lose your turn.</p>
          
          <h3>Strategy Tips</h3>
          <ul style="margin-left: 20px;">
            <li>Draw Two is more powerful than Skip in most situations</li>
            <li>Stack Draw Twos with other players to create massive penalties</li>
            <li>Hold onto Draw Two for critical moments</li>
            <li>Consider stacking if you have another Draw Two or Wild Draw Four</li>
          </ul>
        `
      },
      'wild-card': {
        title: 'Wild Card',
        emoji: '🌈',
        image: 'red_wild.png',
        description: 'Play on any card and choose the color',
        content: `
          <h3>What It Does</h3>
          <p>The Wild card can be played on any color or number. When played, you choose the next color to continue play.</p>
          
          <h3>Points Value</h3>
          <p>Worth 50 points if left in your hand at game end.</p>
          
          <h3>When to Use</h3>
          <ul style="margin-left: 20px;">
            <li>Play when you have no matching color or number</li>
            <li>Use strategically to change the game's color to suit your hand</li>
            <li>Change to a color that the opponent is weak in</li>
            <li>Don't waste Wild cards early if possible</li>
          </ul>
          
          <h3>Strategy Tips</h3>
          <p>Watch what colors opponents are playing frequently. When you use a Wild card, choose a color they seem to be avoiding.</p>
        `
      },
      'wild-draw-four': {
        title: 'Wild Draw Four Card',
        emoji: '🎲',
        image: 'wild_draw4.png',
        description: 'Most powerful card - choose color and force 4 card draw',
        content: `
          <h3>What It Does</h3>
          <p>The Wild Draw Four is the most powerful card in UNO. It can be played on any color or number, allows you to choose the next color, AND forces the next player to draw 4 cards and lose their turn.</p>
          
          <h3>Points Value</h3>
          <p>Worth 50 points if left in your hand at game end.</p>
          
          <h3>Draw Stack Rule</h3>
          <p>Like Draw Two, Wild Draw Four can be stacked. If played on you, another player can stack with their Wild Draw Four (4+4=8 cards).</p>
          
          <h3>Challenge Rule</h3>
          <p>Some players allow challenging a Wild Draw Four. If you think the player had a legal move, you can challenge. If wrong, you draw 6 cards instead!</p>
          
          <h3>Strategy Tips</h3>
          <ul style="margin-left: 20px;">
            <li>Save for critical moments - it's the most powerful card</li>
            <li>Use to create huge penalties when combined with stacking</li>
            <li>Choose a color wisely - control the game's direction</li>
            <li>Be careful about challenging - you could draw 6 cards!</li>
            <li>Only 4 Wild Draw Four cards exist in a deck, so use them wisely</li>
          </ul>
        `
      }
    };

    this.init();
  }

  init() {
    this.setupRouting();
    this.handlePageLoad();
    this.setupEventListeners();
  }

  setupRouting() {
    window.addEventListener('popstate', () => {
      this.handlePageLoad();
    });
  }

  handlePageLoad() {
    const path = window.location.pathname;
    
    if (path === '/wiki') {
      this.showWikiPage();
    } else if (path.startsWith('/lobby/') && path !== '/lobby/') {
      this.showWaitingRoom();
    } else {
      this.showLobbyPage();
    }
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wiki-btn')) {
        e.preventDefault();
        window.history.pushState({}, '', '/wiki');
        this.showWikiPage();
      }
      if (e.target.classList.contains('back-btn')) {
        e.preventDefault();
        const path = window.location.pathname;
        if (path.startsWith('/lobby/')) {
          // Go back to the specific room
          window.history.pushState({}, '', path);
          this.showWaitingRoom();
        } else {
          // Go back to lobby
          window.history.pushState({}, '', '/lobby');
          this.showLobbyPage();
        }
      }
      if (e.target.dataset.wikiLink) {
        e.preventDefault();
        this.scrollToArticle(e.target.dataset.wikiLink);
      }
    });

    // Setup search functionality
    const searchInput = document.getElementById('wikiSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterCards(e.target.value);
      });
    }
  }

  showLobbyPage() {
    document.getElementById('lobby').classList.add('active');
    document.getElementById('wiki').classList.remove('active');
    document.getElementById('waitingRoom').classList.remove('active');
    document.getElementById('game').classList.remove('active');
  }

  showWaitingRoom() {
    document.getElementById('waitingRoom').classList.add('active');
    document.getElementById('lobby').classList.remove('active');
    document.getElementById('wiki').classList.remove('active');
    document.getElementById('game').classList.remove('active');
  }

  showWikiPage() {
    this.renderWiki();
    document.getElementById('wiki').classList.add('active');
    document.getElementById('lobby').classList.remove('active');
    document.getElementById('waitingRoom').classList.remove('active');
    document.getElementById('game').classList.remove('active');
  }

  renderWiki() {
    // Render table of contents
    const toc = document.getElementById('wikiTOC');
    toc.innerHTML = Object.entries(this.articles)
      .map(([key, article]) => `
        <li><a href="#${key}" data-wiki-link="${key}">${article.emoji} ${article.title}</a></li>
      `)
      .join('');

    // Render articles with card images
    const articlesContainer = document.getElementById('wikiArticles');
    articlesContainer.innerHTML = Object.entries(this.articles)
      .map(([key, article]) => `
        <div id="${key}" class="wiki-article">
          <div class="article-grid">
            <div class="article-image">
              <img src="/cards/${article.image}" alt="${article.title}" class="card-image">
            </div>
            <div class="article-text">
              <h2>${article.emoji} ${article.title}</h2>
              <p class="article-description">${article.description}</p>
              ${article.content}
            </div>
          </div>
        </div>
      `)
      .join('');

    // Setup TOC click handlers
    document.querySelectorAll('.wiki-nav a[data-wiki-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = e.target.dataset.wikiLink;
        this.scrollToArticle(articleId);
        this.updateActiveLink(articleId);
      });
    });
  }

  filterCards(searchTerm) {
    const term = searchTerm.toLowerCase();
    const articles = document.querySelectorAll('.wiki-article');
    
    articles.forEach(article => {
      const title = article.querySelector('h2').textContent.toLowerCase();
      const description = article.querySelector('.article-description').textContent.toLowerCase();
      
      if (title.includes(term) || description.includes(term) || term === '') {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  }

  scrollToArticle(articleId) {
    const element = document.getElementById(articleId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateActiveLink(articleId) {
    document.querySelectorAll('.wiki-nav a').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.wikiLink === articleId) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize wiki when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Wiki();
  });
} else {
  new Wiki();
}
