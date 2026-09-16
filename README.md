# Battleship Game

A stunning Battleship game built with HTML, CSS, and JavaScript where you can play against an AI opponent. Features real war ship names, sound effects, manual ship placement, and enhanced graphics.

## Features

### 🎮 Core Gameplay
- **Enhanced Visual Effects**: Immersive board design with CSS animations and gradients
- **Real War Ships**: Authentic US Navy ship names and classes
- **Sound Effects**: Dynamic audio feedback for hits, misses, ship sinks, and game outcomes
- **Player Customization**: Enter your captain's name for personalized gameplay
- **Flexible Ship Placement**: Choose between random or manual ship placement
- **Intelligent AI**: Smart targeting system that hunts for ships after scoring hits
- **Enhanced Visual Feedback**: Animated indicators for hits, misses, and sunk ships
- **Advanced Battle Log**: Real-time log with timestamps, icons, and improved graphics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🚢 War Ships
Each player commands 5 authentic US Navy vessels:
- **USS Nimitz** (Aircraft Carrier - 5 cells)
- **USS Iowa** (Battleship - 4 cells) 
- **USS Ticonderoga** (Cruiser - 3 cells)
- **USS Virginia** (Submarine - 3 cells)
- **USS Arleigh Burke** (Destroyer - 2 cells)

### 🔊 Sound System
- **Hit Sound**: Deep explosion effect
- **Miss Sound**: Water splash effect
- **Sink Sound**: Dramatic ship destruction
- **Win Sound**: Victory fanfare
- **Lose Sound**: Defeat sequence
- **Toggle Option**: Enable/disable sounds during gameplay

### 🎯 Manual Placement Mode
- Interactive ship placement with visual preview
- Rotate ships between horizontal and vertical orientation
- Real-time validation showing valid/invalid placement
- Auto-place option for quick setup
- Step-by-step placement instructions

## How to Play

### Getting Started
1. Open `index.html` in a web browser
2. Enter your captain's name (optional)
3. Choose ship placement mode:
   - **Random**: Ships placed automatically
   - **Manual**: Place ships strategically yourself
4. Click "Start Battle" to begin

### Manual Placement
1. Click on your board to place the current ship
2. Use "Rotate Ship" button to change orientation
3. Yellow preview shows valid placement
4. Red preview indicates invalid placement
5. Place all 5 ships or use "Auto Place All"

### Combat
1. Your ships (green cells) are displayed on the left board
2. Click on any cell in "Enemy Waters" (right board) to fire
3. Red cells with 💥 indicate hits
4. Gray cells with • indicate misses
5. 💀 appears when ships are sunk
6. The AI responds automatically after your turn
7. Sink all enemy ships to win!

## Game Rules

- Ships cannot overlap during placement
- Shots cannot be fired at the same cell twice
- The game ends when all ships of one fleet are sunk
- AI uses hunt-and-target strategy after scoring hits
- Sound effects can be toggled on/off

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no frameworks)
- **Graphics**: CSS animations, gradients, and visual effects
- **Audio**: Web Audio API for procedural sound generation
- **AI Logic**: Random shots until a hit, then targeted hunting in adjacent cells
- **Responsive**: CSS Grid and Flexbox for adaptive layouts

## File Structure

```
battleship-game/
├── index.html          # Main HTML structure with 3D elements
├── style.css           # 3D styling and responsive design
├── game.js             # Game logic, AI, and sound management
├── README.md           # This file
├── BUG_DOCUMENTATION.md # Documentation of bugs found and fixed
└── DEPLOYMENT_GUIDE.md # Instructions for online deployment
```

## Bug Documentation

See [BUG_DOCUMENTATION.md](BUG_DOCUMENTATION.md) for details about bugs found during development and how they were fixed.

## Running the Game

Simply open `index.html` in a web browser to play the game. No server required. The game works offline and uses the Web Audio API for sound effects.

## Deployment

For online deployment, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions on hosting via GitHub Pages, Netlify, or Vercel.

## Enhancements Implemented

✅ Enhanced visual effects with CSS animations  
✅ Real US Navy war ship names  
✅ Web Audio API sound effects  
✅ Player name customization  
✅ Manual ship placement mode  
✅ Enhanced battle log with graphics  
✅ Responsive design  

## Future Enhancements

Potential improvements for future versions:
- Multiple difficulty levels for the AI
- Multiplayer support (local and online)
- Drag-and-drop ship placement
- Ship selection and customization
- Campaign mode with multiple battles
- Leaderboard system
- Additional ship types and classes

## License

This project is open source and available for educational purposes.