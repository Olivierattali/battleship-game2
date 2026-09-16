class SoundManager {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = true;
        this.initialized = false;
    }

    init() {
        if (!this.initialized) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        }
    }

    playHit() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Explosion sound using layered noise
        const bufferSize = this.audioContext.sampleRate * 0.6;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        // Lowpass filter for explosion
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        noise.start(now);
        noise.stop(now + 0.5);
        
        // Add impact boom
        const oscillator = this.audioContext.createOscillator();
        const oscGain = this.audioContext.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(60, now);
        oscillator.frequency.exponentialRampToValueAtTime(20, now + 0.4);
        
        oscGain.gain.setValueAtTime(0.4, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        oscillator.connect(oscGain);
        oscGain.connect(this.audioContext.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        
        // Add rumble
        const rumble = this.audioContext.createOscillator();
        const rumbleGain = this.audioContext.createGain();
        
        rumble.type = 'sine';
        rumble.frequency.setValueAtTime(40, now);
        rumble.frequency.exponentialRampToValueAtTime(15, now + 0.6);
        
        rumbleGain.gain.setValueAtTime(0.3, now);
        rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        rumble.connect(rumbleGain);
        rumbleGain.connect(this.audioContext.destination);
        
        rumble.start(now);
        rumble.stop(now + 0.6);
    }

    playMiss() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Water splash using filtered noise
        const bufferSize = this.audioContext.sampleRate * 0.4;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        // Bandpass filter for water sound
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.3);
        filter.Q.setValueAtTime(2, now);
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        noise.start(now);
        noise.stop(now + 0.4);
        
        // Add bubble sounds
        const bubbleCount = 7;
        for (let i = 0; i < bubbleCount; i++) {
            const bubbleTime = now + Math.random() * 0.25;
            const bubble = this.audioContext.createOscillator();
            const bubbleGain = this.audioContext.createGain();
            
            bubble.type = 'sine';
            bubble.frequency.setValueAtTime(1000 + Math.random() * 600, bubbleTime);
            bubble.frequency.exponentialRampToValueAtTime(300, bubbleTime + 0.12);
            
            bubbleGain.gain.setValueAtTime(0.06, bubbleTime);
            bubbleGain.gain.exponentialRampToValueAtTime(0.01, bubbleTime + 0.12);
            
            bubble.connect(bubbleGain);
            bubbleGain.connect(this.audioContext.destination);
            
            bubble.start(bubbleTime);
            bubble.stop(bubbleTime + 0.12);
        }
        
        // Add water drop sound
        const drop = this.audioContext.createOscillator();
        const dropGain = this.audioContext.createGain();
        
        drop.type = 'sine';
        drop.frequency.setValueAtTime(600, now + 0.1);
        drop.frequency.exponentialRampToValueAtTime(200, now + 0.25);
        
        dropGain.gain.setValueAtTime(0.08, now + 0.1);
        dropGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        
        drop.connect(dropGain);
        dropGain.connect(this.audioContext.destination);
        
        drop.start(now + 0.1);
        drop.stop(now + 0.25);
    }

    playSink() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    playWin() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 150);
        });
    }

    playLose() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const notes = [400, 350, 300, 250];
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 200);
        });
    }

    toggle() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
}

class BattleshipGame {
    constructor() {
        this.boardSize = 10;
        this.playerBoard = [];
        this.enemyBoard = [];
        this.playerShips = [];
        this.enemyShips = [];
        this.gameStarted = false;
        this.playerTurn = true;
        this.gameOver = false;
        this.playerName = 'Admiral';
        this.placementMode = 'random';
        this.manualPlacementActive = false;
        this.currentShipIndex = 0;
        this.isHorizontal = true;
        
        this.ships = [
            { name: 'USS Nimitz', size: 5, class: 'Aircraft Carrier' },
            { name: 'USS Iowa', size: 4, class: 'Battleship' },
            { name: 'USS Ticonderoga', size: 3, class: 'Cruiser' },
            { name: 'USS Virginia', size: 3, class: 'Submarine' },
            { name: 'USS Arleigh Burke', size: 2, class: 'Destroyer' }
        ];

        this.aiHits = [];
        this.aiMisses = [];
        this.aiTargetMode = false;
        this.aiCurrentTarget = null;
        this.aiHuntDirection = null;

        this.soundManager = new SoundManager();
        this.autoPlayActive = false;
        this.autoPlayInterval = null;

        this.initializeUI();
    }

    initializeUI() {
        this.playerSetup = document.getElementById('playerSetup');
        this.gameArea = document.getElementById('gameArea');
        this.manualPlacement = document.getElementById('manualPlacement');
        this.playerBoardElement = document.getElementById('playerBoard');
        this.enemyBoardElement = document.getElementById('enemyBoard');
        this.placementBoardElement = document.getElementById('placementBoard');
        this.playerFleetTitle = document.getElementById('playerFleetTitle');
        this.enemyShipStatus = document.getElementById('enemyShipStatus');
        this.playerShipStatus = document.getElementById('playerShipStatus');
        this.statusElement = document.getElementById('gameStatus');
        this.turnIndicator = document.getElementById('turnIndicator');
        this.startGameBtn = document.getElementById('startGameBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.autoPlayBtn = document.getElementById('autoPlayBtn');
        this.soundToggle = document.getElementById('soundToggle');
        this.playerNameInput = document.getElementById('playerName');
        this.playerNameDisplay = document.getElementById('playerNameDisplay');
        this.logContent = document.getElementById('logContent');
        this.currentShipPlacement = document.getElementById('currentShipPlacement');
        this.rotateBtn = document.getElementById('rotateBtn');
        this.autoPlaceBtn = document.getElementById('autoPlaceBtn');

        this.startGameBtn.addEventListener('click', () => this.handleStartGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.autoPlayBtn.addEventListener('click', () => this.toggleAutoPlay());
        this.soundToggle.addEventListener('click', () => this.toggleSound());
        this.rotateBtn.addEventListener('click', () => this.toggleRotation());
        this.autoPlaceBtn.addEventListener('click', () => this.autoPlaceShips());

        this.createBoards();
    }

    handleStartGame() {
        const playerName = this.playerNameInput.value.trim();
        if (playerName) {
            this.playerName = playerName;
        }

        const placementRadios = document.getElementsByName('placement');
        for (const radio of placementRadios) {
            if (radio.checked) {
                this.placementMode = radio.value;
                break;
            }
        }

        this.soundManager.init();

        if (this.placementMode === 'manual') {
            this.startManualPlacement();
        } else {
            this.startGame();
        }
    }

    startManualPlacement() {
        this.playerSetup.style.display = 'none';
        this.manualPlacement.style.display = 'block';
        this.manualPlacementActive = true;
        this.currentShipIndex = 0;
        this.isHorizontal = true;
        
        this.initializeBoards();
        this.createPlacementBoard();
        this.updatePlacementInstructions();
    }

    createPlacementBoard() {
        this.placementBoardElement.innerHTML = '';

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.handlePlacementClick(row, col));
                cell.addEventListener('mouseenter', () => this.showPlacementPreview(row, col));
                cell.addEventListener('mouseleave', () => this.clearPlacementPreview());
                this.placementBoardElement.appendChild(cell);
            }
        }
    }

    showPlacementPreview(row, col) {
        if (!this.manualPlacementActive) return;

        const currentShip = this.ships[this.currentShipIndex];
        if (!currentShip) return;

        this.clearPlacementPreview();

        const positions = this.getShipPositions(row, col, currentShip.size, this.isHorizontal);
        const isValid = this.canPlaceShip(this.playerBoard, row, col, currentShip.size, this.isHorizontal);

        positions.forEach(pos => {
            const cell = this.placementBoardElement.querySelector(
                `[data-row="${pos.row}"][data-col="${pos.col}"]`
            );
            if (cell) {
                cell.classList.add(isValid ? 'preview' : 'invalid');
            }
        });
    }

    clearPlacementPreview() {
        const cells = this.placementBoardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('preview', 'invalid');
        });
    }

    handlePlacementClick(row, col) {
        if (!this.manualPlacementActive) return;

        const currentShip = this.ships[this.currentShipIndex];
        if (!currentShip) return;

        if (this.canPlaceShip(this.playerBoard, row, col, currentShip.size, this.isHorizontal)) {
            this.placeShip(this.playerBoard, row, col, currentShip.size, this.isHorizontal, currentShip.name);
            
            this.playerShips.push({
                name: currentShip.name,
                size: currentShip.size,
                hits: 0,
                positions: this.getShipPositions(row, col, currentShip.size, this.isHorizontal)
            });

            this.currentShipIndex++;
            this.updatePlacementBoard();

            if (this.currentShipIndex >= this.ships.length) {
                this.completeManualPlacement();
            } else {
                this.updatePlacementInstructions();
            }
        }
    }

    updatePlacementBoard() {
        const cells = this.placementBoardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellValue = this.playerBoard[row][col];

            cell.className = 'cell';
            if (cellValue !== null && typeof cellValue === 'object') {
                cell.classList.add('ship');
                if (cellValue.class) {
                    cell.classList.add(cellValue.class);
                }
            }
        });
    }

    updatePlacementInstructions() {
        const currentShip = this.ships[this.currentShipIndex];
        if (currentShip) {
            this.currentShipPlacement.textContent = `Place: ${currentShip.name} (${currentShip.class} - ${currentShip.size} cells)`;
        }
    }

    toggleRotation() {
        this.isHorizontal = !this.isHorizontal;
        this.clearPlacementPreview();
    }

    autoPlaceShips() {
        this.initializeBoards();
        const placedShips = this.placeShipsRandomly(this.playerBoard, this.playerShips);
        if (placedShips) {
            this.playerShips = placedShips;
            this.completeManualPlacement();
        }
    }

    completeManualPlacement() {
        this.manualPlacementActive = false;
        this.manualPlacement.style.display = 'none';
        
        // Reset auto-play state
        this.autoPlayActive = false;
        this.autoPlayBtn.classList.remove('active');
        this.autoPlayBtn.textContent = '🤖 Auto Play';
        
        this.startGame();
    }

    createBoards() {
        this.playerBoardElement.innerHTML = '';
        this.enemyBoardElement.innerHTML = '';

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const playerCell = document.createElement('div');
                playerCell.className = 'cell';
                playerCell.dataset.row = row;
                playerCell.dataset.col = col;
                this.playerBoardElement.appendChild(playerCell);

                const enemyCell = document.createElement('div');
                enemyCell.className = 'cell';
                enemyCell.dataset.row = row;
                enemyCell.dataset.col = col;
                enemyCell.addEventListener('click', () => this.handlePlayerShot(row, col));
                this.enemyBoardElement.appendChild(enemyCell);
            }
        }
    }

    initializeBoards() {
        this.playerBoard = Array(this.boardSize).fill(null).map(() => 
            Array(this.boardSize).fill(null)
        );
        this.enemyBoard = Array(this.boardSize).fill(null).map(() => 
            Array(this.boardSize).fill(null)
        );
        this.playerShips = [];
        this.enemyShips = [];
    }

    placeShipsRandomly(board, ships) {
        const placedShips = [];

        for (const ship of this.ships) {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!placed && attempts < maxAttempts) {
                const isHorizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * this.boardSize);
                const col = Math.floor(Math.random() * this.boardSize);

                if (this.canPlaceShip(board, row, col, ship.size, isHorizontal)) {
                    this.placeShip(board, row, col, ship.size, isHorizontal, ship.name);
                    placedShips.push({
                        name: ship.name,
                        size: ship.size,
                        hits: 0,
                        positions: this.getShipPositions(row, col, ship.size, isHorizontal)
                    });
                    placed = true;
                }
                attempts++;
            }

            if (!placed) {
                console.error(`Failed to place ${ship.name} after ${maxAttempts} attempts`);
                return false;
            }
        }

        return placedShips;
    }

    canPlaceShip(board, row, col, size, isHorizontal) {
        if (isHorizontal) {
            if (col + size > this.boardSize) return false;
            for (let i = 0; i < size; i++) {
                const cell = board[row][col + i];
                if (cell !== null && cell !== 'hit' && cell !== 'miss') return false;
            }
        } else {
            if (row + size > this.boardSize) return false;
            for (let i = 0; i < size; i++) {
                const cell = board[row + i][col];
                if (cell !== null && cell !== 'hit' && cell !== 'miss') return false;
            }
        }
        return true;
    }

    placeShip(board, row, col, size, isHorizontal, shipName) {
        const ship = this.ships.find(s => s.name === shipName);
        let shipClass = 'ship';
        
        if (ship) {
            if (ship.name === 'USS Nimitz') shipClass = 'aircraft-carrier';
            else if (ship.name === 'USS Iowa') shipClass = 'battleship';
            else if (ship.name === 'USS Ticonderoga') shipClass = 'cruiser';
            else if (ship.name === 'USS Virginia') shipClass = 'submarine';
            else if (ship.name === 'USS Arleigh Burke') shipClass = 'destroyer';
        }
        
        for (let i = 0; i < size; i++) {
            if (isHorizontal) {
                board[row][col + i] = { name: shipName, class: shipClass };
            } else {
                board[row + i][col] = { name: shipName, class: shipClass };
            }
        }
    }

    getShipPositions(row, col, size, isHorizontal) {
        const positions = [];
        for (let i = 0; i < size; i++) {
            if (isHorizontal) {
                positions.push({ row, col: col + i });
            } else {
                positions.push({ row: row + i, col });
            }
        }
        return positions;
    }

    startGame() {
        if (this.placementMode === 'random') {
            this.initializeBoards();
            
            const playerShipsPlaced = this.placeShipsRandomly(this.playerBoard, this.playerShips);
            const enemyShipsPlaced = this.placeShipsRandomly(this.enemyBoard, this.enemyShips);

            if (!playerShipsPlaced || !enemyShipsPlaced) {
                this.statusElement.textContent = 'Error: Could not place all ships. Please try again.';
                return;
            }

            this.playerShips = playerShipsPlaced;
            this.enemyShips = enemyShipsPlaced;
        }

        // Place enemy ships if manual placement was used
        if (this.enemyShips.length === 0) {
            const enemyShipsPlaced = this.placeShipsRandomly(this.enemyBoard, this.enemyShips);
            if (!enemyShipsPlaced) {
                this.statusElement.textContent = 'Error: Could not place enemy ships. Please try again.';
                return;
            }
            this.enemyShips = enemyShipsPlaced;
        }

        this.playerSetup.style.display = 'none';
        this.gameArea.style.display = 'block';

        this.gameStarted = true;
        this.playerTurn = true;
        this.gameOver = false;
        this.aiHits = [];
        this.aiMisses = [];
        this.aiTargetMode = false;
        this.aiCurrentTarget = null;
        this.aiHuntDirection = null;

        this.playerNameDisplay.textContent = `${this.playerName}`;
        this.playerFleetTitle.textContent = `${this.playerName}'s Fleet`;
        this.initializeShipStatus();
        this.updateBoards();
        this.statusElement.textContent = `Battle in progress! ${this.playerName}'s turn - fire at enemy waters!`;
        this.turnIndicator.textContent = `${this.playerName}'s Turn`;
        this.updateTurnIndicator();
        this.logContent.innerHTML = '';
        this.addLogEntry(`⚔️ Battle commenced! ${this.playerName}, command ${this.playerName}'s fleet!`, 'player');
        
        // Reset auto-play state
        this.autoPlayActive = false;
        this.autoPlayBtn.classList.remove('active');
        this.autoPlayBtn.textContent = '🤖 Auto Play';
    }

    resetGame() {
        this.gameStarted = false;
        this.gameOver = false;
        this.playerTurn = true;
        this.manualPlacementActive = false;
        this.currentShipIndex = 0;
        this.isHorizontal = true;
        
        // Stop auto-play if active
        if (this.autoPlayActive) {
            this.autoPlayActive = false;
            this.autoPlayBtn.classList.remove('active');
            this.autoPlayBtn.textContent = '🤖 Auto Play';
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
        
        this.initializeBoards();
        this.updateBoards();
        
        this.playerSetup.style.display = 'flex';
        this.gameArea.style.display = 'none';
        this.manualPlacement.style.display = 'none';
        
        this.statusElement.textContent = 'Click "Start Game" to begin';
        this.turnIndicator.textContent = '';
        this.playerNameDisplay.textContent = '';
        this.playerFleetTitle.textContent = 'Your Fleet';
        this.logContent.innerHTML = '';
        this.enemyShipStatus.innerHTML = '';
        this.playerShipStatus.innerHTML = '';
        this.enemyBoardElement.classList.remove('player-turn', 'enemy-turn');
    }

    toggleSound() {
        const enabled = this.soundManager.toggle();
        this.soundToggle.textContent = enabled ? '🔊 Sound On' : '🔇 Sound Off';
    }

    updateBoards() {
        const playerCells = this.playerBoardElement.querySelectorAll('.cell');
        const enemyCells = this.enemyBoardElement.querySelectorAll('.cell');

        playerCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellValue = this.playerBoard[row][col];

            cell.className = 'cell';
            if (cellValue === 'hit') {
                cell.classList.add('hit');
                cell.classList.add('ship');
            } else if (cellValue === 'miss') {
                cell.classList.add('miss');
            } else if (cellValue !== null && typeof cellValue === 'object') {
                cell.classList.add('ship');
                if (cellValue.class) {
                    cell.classList.add(cellValue.class);
                }
            }
        });

        enemyCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellValue = this.enemyBoard[row][col];

            cell.className = 'cell';
            if (cellValue === 'hit') {
                cell.classList.add('hit');
            } else if (cellValue === 'miss') {
                cell.classList.add('miss');
            } else if (cellValue === 'ship-sunk') {
                // Show sunk ships on enemy board with skull icon
                cell.classList.add('ship-sunk');
            }
            // Don't show enemy ships - they should be hidden until hit
        });
    }

    handlePlayerShot(row, col) {
        if (!this.gameStarted || this.gameOver || !this.playerTurn) {
            return;
        }

        const cellValue = this.enemyBoard[row][col];
        const coordinate = this.getCoordinate(row, col);
        
        if (cellValue === 'hit' || cellValue === 'miss') {
            return;
        }

        if (cellValue !== null && typeof cellValue === 'object') {
            const shipName = cellValue.name;
            this.enemyBoard[row][col] = 'hit';
            this.markShipHit(this.enemyShips, shipName);
            this.soundManager.playHit();
            this.addLogEntry(`🎯 Direct hit at ${coordinate}!`, 'player');
            
            if (this.checkShipSunk(this.enemyShips, shipName)) {
                this.soundManager.playSink();
                this.addLogEntry(`💥 Enemy ${shipName} sunk!`, 'player');
                this.revealSunkShip(this.enemyShips, shipName, this.enemyBoardElement);
                this.updateShipStatus(this.enemyShips, this.enemyShipStatus, true);
                this.updateBoards(); // Force board update after ship is sunk
            }

            if (this.checkWinCondition()) {
                this.soundManager.playWin();
                this.endGame(true);
                return;
            }
        } else {
            this.enemyBoard[row][col] = 'miss';
            this.soundManager.playMiss();
            this.addLogEntry(`💭 Missed shot at ${coordinate}.`, 'player');
        }

        this.updateBoards();
        this.playerTurn = false;
        this.turnIndicator.textContent = "Enemy's Turn";
        this.updateTurnIndicator();
        
        setTimeout(() => {
            this.aiTurn();
            // Schedule next auto-play move after AI responds
            if (this.autoPlayActive && !this.gameOver) {
                setTimeout(() => this.autoPlayMove(), 1500);
            }
        }, 1500);
    }

    aiTurn() {
        if (this.gameOver) return;

        let row, col;
        let shot;

        if (this.aiTargetMode && this.aiCurrentTarget) {
            shot = this.aiTargetedShot();
        } else {
            shot = this.aiRandomShot();
        }

        if (!shot) {
            shot = this.aiRandomShot();
        }

        row = shot.row;
        col = shot.col;
        const coordinate = this.getCoordinate(row, col);

        const cellValue = this.playerBoard[row][col];

        if (cellValue !== null && typeof cellValue === 'object') {
            const shipName = cellValue.name;
            this.playerBoard[row][col] = 'hit';
            this.aiHits.push({ row, col });
            this.markShipHit(this.playerShips, shipName);
            this.soundManager.playHit();
            this.addLogEntry(`⚠️ Enemy hit ${this.playerName}'s ${shipName} at ${coordinate}!`, 'enemy');
            
            if (!this.aiTargetMode) {
                this.aiTargetMode = true;
                this.aiCurrentTarget = { row, col };
                this.aiHuntDirection = null;
            } else {
                this.aiCurrentTarget = { row, col };
            }

            if (this.checkShipSunk(this.playerShips, shipName)) {
                this.soundManager.playSink();
                this.addLogEntry(`☠️ ${this.playerName}'s ${shipName} has been sunk!`, 'enemy');
                this.revealSunkShip(this.playerShips, shipName, this.playerBoardElement);
                this.updateShipStatus(this.playerShips, this.playerShipStatus, false);
                this.updateBoards(); // Force board update after ship is sunk
                this.aiTargetMode = false;
                this.aiCurrentTarget = null;
                this.aiHuntDirection = null;
            }

            if (this.checkWinCondition()) {
                this.soundManager.playLose();
                this.endGame(false);
                return;
            }
        } else {
            this.playerBoard[row][col] = 'miss';
            this.aiMisses.push({ row, col });
            this.soundManager.playMiss();
            this.addLogEntry(`🌊 Enemy missed at ${coordinate}.`, 'player');
            
            if (this.aiTargetMode) {
                this.aiAdjustTarget();
            }
        }

        this.updateBoards();
        this.playerTurn = true;
        this.turnIndicator.textContent = `${this.playerName}'s Turn`;
        this.updateTurnIndicator();
        
        // Continue auto-play if active
        if (this.autoPlayActive && !this.gameOver) {
            setTimeout(() => this.autoPlayMove(), 1000);
        }
    }

    aiRandomShot() {
        const availableShots = [];
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cellValue = this.playerBoard[row][col];
                if (cellValue !== 'hit' && cellValue !== 'miss') {
                    availableShots.push({ row, col });
                }
            }
        }

        if (availableShots.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * availableShots.length);
        return availableShots[randomIndex];
    }

    aiTargetedShot() {
        const directions = [
            { row: -1, col: 0 },  // up
            { row: 1, col: 0 },   // down
            { row: 0, col: -1 },  // left
            { row: 0, col: 1 }    // right
        ];

        if (this.aiHuntDirection) {
            const newRow = this.aiCurrentTarget.row + this.aiHuntDirection.row;
            const newCol = this.aiCurrentTarget.col + this.aiHuntDirection.col;

            const cellValue = this.playerBoard[newRow]?.[newCol];
            if (this.isValidCell(newRow, newCol) && 
                cellValue !== 'hit' && 
                cellValue !== 'miss') {
                return { row: newRow, col: newCol };
            } else {
                this.aiHuntDirection = null;
            }
        }

        for (const dir of directions) {
            const newRow = this.aiCurrentTarget.row + dir.row;
            const newCol = this.aiCurrentTarget.col + dir.col;

            const cellValue = this.playerBoard[newRow]?.[newCol];
            if (this.isValidCell(newRow, newCol) && 
                cellValue !== 'hit' && 
                cellValue !== 'miss') {
                this.aiHuntDirection = dir;
                return { row: newRow, col: newCol };
            }
        }

        this.aiTargetMode = false;
        this.aiCurrentTarget = null;
        return this.aiRandomShot();
    }

    aiAdjustTarget() {
        if (!this.aiCurrentTarget) return;

        const directions = [
            { row: -1, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: -1 },
            { row: 0, col: 1 }
        ];

        for (const dir of directions) {
            const newRow = this.aiCurrentTarget.row + dir.row;
            const newCol = this.aiCurrentTarget.col + dir.col;

            const cellValue = this.playerBoard[newRow]?.[newCol];
            if (this.isValidCell(newRow, newCol) && 
                cellValue !== 'hit' && 
                cellValue !== 'miss') {
                this.aiHuntDirection = dir;
                return;
            }
        }

        this.aiTargetMode = false;
        this.aiCurrentTarget = null;
        this.aiHuntDirection = null;
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
    }

    getCoordinate(row, col) {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        return `${letters[row]}${col + 1}`;
    }

    markShipHit(ships, shipName) {
        const ship = ships.find(s => s.name === shipName);
        if (ship) {
            ship.hits++;
        }
    }

    checkShipSunk(ships, shipName) {
        const ship = ships.find(s => s.name === shipName);
        return ship && ship.hits >= ship.size;
    }

    revealSunkShip(ships, shipName, boardElement) {
        const ship = ships.find(s => s.name === shipName);
        if (ship) {
            let shipClass = 'ship';
            
            // Determine the ship class
            if (shipName === 'USS Nimitz') shipClass = 'aircraft-carrier';
            else if (shipName === 'USS Iowa') shipClass = 'battleship';
            else if (shipName === 'USS Ticonderoga') shipClass = 'cruiser';
            else if (shipName === 'USS Virginia') shipClass = 'submarine';
            else if (shipName === 'USS Arleigh Burke') shipClass = 'destroyer';
            
            const isEnemyBoard = boardElement.id === 'enemyBoard';
            
            ship.positions.forEach(pos => {
                const cell = boardElement.querySelector(
                    `[data-row="${pos.row}"][data-col="${pos.col}"]`
                );
                if (cell) {
                    // Remove hit class to hide explosion emoji
                    cell.classList.remove('hit');
                    // Add ship-sunk class to show skull emoji
                    cell.classList.add('ship-sunk');
                    if (!isEnemyBoard) {
                        // Add ship class on player board
                        cell.classList.add('ship', shipClass);
                    }
                    // Force immediate reflow
                    void cell.offsetWidth;
                }
            });
            
            // Force board update after revealing sunk ship
            this.updateBoards();
        }
    }

    checkWinCondition() {
        const allEnemyShipsSunk = this.enemyShips.every(ship => ship.hits >= ship.size);
        const allPlayerShipsSunk = this.playerShips.every(ship => ship.hits >= ship.size);

        return allEnemyShipsSunk || allPlayerShipsSunk;
    }

    endGame(playerWon) {
        this.gameOver = true;
        
        // Stop auto-play if active
        if (this.autoPlayActive) {
            this.autoPlayActive = false;
            this.autoPlayBtn.classList.remove('active');
            this.autoPlayBtn.textContent = '🤖 Auto Play';
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
        
        if (playerWon) {
            this.statusElement.textContent = `🎉 Victory! ${this.playerName} sunk all enemy ships!`;
            this.addLogEntry(`🏆 VICTORY! ${this.playerName} has destroyed the enemy fleet!`, 'win');
        } else {
            this.statusElement.textContent = `💀 Defeat! ${this.playerName}'s fleet has been destroyed!`;
            this.addLogEntry(`☠️ DEFEAT! ${this.playerName}'s fleet has been destroyed.`, 'win');
        }

        this.turnIndicator.textContent = 'Game Over';
    }

    addLogEntry(message, type) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        let icon = '';
        if (type === 'player') icon = '⚓';
        else if (type === 'enemy') icon = '⚔️';
        else if (type === 'win') icon = '🏆';
        
        entry.innerHTML = `<span class="timestamp">${timestamp}</span><span class="icon">${icon}</span>${message}`;
        this.logContent.appendChild(entry);
        this.logContent.scrollTop = this.logContent.scrollHeight;
    }

    initializeShipStatus() {
        this.playerShipStatus.innerHTML = '';
        this.enemyShipStatus.innerHTML = '';

        this.ships.forEach(ship => {
            const playerItem = this.createShipStatusItem(ship, false);
            const enemyItem = this.createShipStatusItem(ship, false);
            
            this.playerShipStatus.appendChild(playerItem);
            this.enemyShipStatus.appendChild(enemyItem);
        });
    }

    createShipStatusItem(ship, isSunk) {
        const item = document.createElement('div');
        item.className = `ship-status-item ${isSunk ? 'sunk' : ''}`;
        item.dataset.shipName = ship.name;

        const icon = isSunk ? '💀' : this.getShipIcon(ship.name);
        
        item.innerHTML = `
            <span class="ship-icon">${icon}</span>
            <span class="ship-name">${ship.name} (${ship.size} cells)</span>
            <span class="ship-status ${isSunk ? 'sunk' : ''}">${isSunk ? 'DESTROYED' : 'ACTIVE'}</span>
        `;

        return item;
    }

    getShipIcon(shipName) {
        if (shipName === 'USS Nimitz') return '✈️';
        if (shipName === 'USS Iowa') return '🚢';
        if (shipName === 'USS Ticonderoga') return '⛵';
        if (shipName === 'USS Virginia') return '🛥️';
        if (shipName === 'USS Arleigh Burke') return '🛳️';
        return '⚓';
    }

    updateShipStatus(ships, statusElement, isEnemy) {
        ships.forEach(ship => {
            const item = statusElement.querySelector(`[data-ship-name="${ship.name}"]`);
            if (item) {
                const isSunk = ship.hits >= ship.size;
                if (isSunk) {
                    item.classList.add('sunk');
                    const statusSpan = item.querySelector('.ship-status');
                    const iconSpan = item.querySelector('.ship-icon');
                    if (statusSpan) {
                        statusSpan.textContent = 'DESTROYED';
                        statusSpan.classList.add('sunk');
                    }
                    if (iconSpan) {
                        iconSpan.textContent = '💀';
                    }
                }
            }
        });
    }

    updateTurnIndicator() {
        if (this.playerTurn) {
            this.enemyBoardElement.classList.add('player-turn');
            this.enemyBoardElement.classList.remove('enemy-turn');
        } else {
            this.enemyBoardElement.classList.add('enemy-turn');
            this.enemyBoardElement.classList.remove('player-turn');
        }
    }

    toggleAutoPlay() {
        if (!this.gameStarted || this.gameOver) {
            this.addLogEntry('⚠️ Start a game first to use auto-play!', 'player');
            return;
        }

        this.autoPlayActive = !this.autoPlayActive;
        
        if (this.autoPlayActive) {
            this.autoPlayBtn.classList.add('active');
            this.autoPlayBtn.textContent = '⏹️ Stop Auto';
            this.addLogEntry('🤖 Auto-play activated! AI will play for you.', 'player');
            
            if (this.playerTurn) {
                this.autoPlayMove();
            }
        } else {
            this.autoPlayBtn.classList.remove('active');
            this.autoPlayBtn.textContent = '🤖 Auto Play';
            this.addLogEntry('🛑 Auto-play stopped. Manual control resumed.', 'player');
            
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }

    autoPlayMove() {
        if (!this.autoPlayActive || this.gameOver || !this.playerTurn) {
            return;
        }

        // Find a random valid target
        const availableShots = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cellValue = this.enemyBoard[row][col];
                if (cellValue !== 'hit' && cellValue !== 'miss') {
                    availableShots.push({ row, col });
                }
            }
        }

        if (availableShots.length === 0) {
            this.addLogEntry('⚠️ No valid targets available!', 'player');
            this.toggleAutoPlay();
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableShots.length);
        const shot = availableShots[randomIndex];

        // Execute the shot using the same logic as manual play
        this.handlePlayerShot(shot.row, shot.col);
    }
}

const game = new BattleshipGame();