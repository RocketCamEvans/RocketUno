from PIL import Image
import os

def split_cards():
    # Create cards directory if it doesn't exist
    if not os.path.exists('cards'):
        os.makedirs('cards')

    # Load the main UNO cards image (4 rows x 14 columns)
    main_image = Image.open('UnoCards.png')
    
    rows = 4
    cols = 14
    card_width = main_image.width // cols
    card_height = main_image.height // rows

    colors = ['red', 'yellow', 'green', 'blue']
    values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2', 'wild']

    # Extract each card
    for row in range(rows):
        for col in range(cols):
            # Calculate the crop box
            left = col * card_width
            top = row * card_height
            right = left + card_width
            bottom = top + card_height
            
            # Crop the card
            card = main_image.crop((left, top, right, bottom))
            
            # Save the card
            color = colors[row]
            value = values[col]
            filename = f'{color}_{value}.png'
            
            card.save(os.path.join('cards', filename))
            print(f'Created: {filename}')

    # Process Draw 4 card
    draw4_image = Image.open('Draw4.png')
    draw4_image.save(os.path.join('cards', 'wild_draw4.png'))
    print('Created: wild_draw4.png')

    print(f'\nAll cards extracted successfully!')
    print(f'Total cards: {rows * cols + 1}')

if __name__ == '__main__':
    split_cards()
