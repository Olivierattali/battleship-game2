# Deployment Guide

## Option 1: GitHub Pages (Recommended)

Since you need to host the game online and create a public GitHub repository, follow these steps:

### Step 1: Create GitHub Repository
1. Go to https://github.com and sign in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it "battleship-game" (or any name you prefer)
5. Make it "Public"
6. Click "Create repository"

### Step 2: Upload Files
1. In your new repository, click "uploading an existing file"
2. Drag and drop these files from your "Battleship Game" folder:
   - index.html
   - style.css
   - game.js
   - README.md
   - BUG_DOCUMENTATION.md
3. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "main" (or "master") branch and "/ (root)" folder
6. Click "Save"

### Step 4: Access Your Game
1. Wait about 1-2 minutes for deployment
2. Your game will be available at: `https://yourusername.github.io/battleship-game/`

## Option 2: Netlify Drop (Quick Alternative)

1. Go to https://app.netlify.com/drop
2. Drag and drop your entire "Battleship Game" folder
3. Your game will be instantly deployed with a unique URL
4. You can customize the URL if desired

## Option 3: Vercel (Alternative)

1. Go to https://vercel.com
2. Sign up/login
3. Import your repository or drag and drop the folder
4. Your game will be deployed automatically

## Files to Deploy

Make sure these files are included:
- `index.html` - Main game file
- `style.css` - Styling
- `game.js` - Game logic
- `README.md` - Documentation
- `BUG_DOCUMENTATION.md` - Bug report

## Testing the Deployment

After deployment, test:
1. Click "Start Game" button
2. Fire at enemy cells
3. Verify AI responds
4. Check win/lose conditions
5. Test on mobile if possible

## Share Your Game

Once deployed, share these links:
- Game URL: (from GitHub Pages or your chosen host)
- GitHub Repository: (your repository URL)
- Bug Documentation: (link to BUG_DOCUMENTATION.md in your repo)