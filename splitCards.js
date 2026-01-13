const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function splitCards() {
  // Create cards directory if it doesn't exist
  const cardsDir = path.join(__dirname, 'cards');
  if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir);
  }

  // Load the main UNO cards image (4 rows x 14 columns)
  const mainImage = await loadImage(path.join(__dirname, 'UnoCards.png'));
  
  const rows = 4;
  const cols = 14;
  const cardWidth = mainImage.width / cols;
  const cardHeight = mainImage.height / rows;

  const colors = ['red', 'yellow', 'green', 'blue'];
  const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2', 'wild'];

  // Extract each card
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const canvas = createCanvas(cardWidth, cardHeight);
      const ctx = canvas.getContext('2d');
      
      // Draw the specific card portion
      ctx.drawImage(
        mainImage,
        col * cardWidth, row * cardHeight, cardWidth, cardHeight,
        0, 0, cardWidth, cardHeight
      );
      
      // Save the card
      const color = colors[row];
      const value = values[col];
      const filename = `${color}_${value}.png`;
      
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(path.join(cardsDir, filename), buffer);
      
      console.log(`Created: ${filename}`);
    }
  }

  // Process Draw 4 card
  const draw4Image = await loadImage(path.join(__dirname, 'Draw4.png'));
  const draw4Canvas = createCanvas(draw4Image.width, draw4Image.height);
  const draw4Ctx = draw4Canvas.getContext('2d');
  draw4Ctx.drawImage(draw4Image, 0, 0);
  
  const draw4Buffer = draw4Canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(cardsDir, 'wild_draw4.png'), draw4Buffer);
  
  console.log('Created: wild_draw4.png');
  console.log('\nAll cards extracted successfully!');
  console.log(`Total cards: ${rows * cols + 1}`);
}

// Run the script
splitCards().catch(console.error);
