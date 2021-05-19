/**
 * Selectors
 */
const app = document.querySelector('.app');
const playerOptions = document.createElement('div');
const onePlayer = document.createElement('div');
const twoPlayers = document.createElement('div');
const onePlayerMode = document.createElement('input');
const twoPlayerMode = document.createElement('input');
const onePlayerLabel = document.createElement('label');
const twoPlayerLabel = document.createElement('label');
const startButtonContainer = document.createElement('div');
const startButton = document.createElement('button');

/**
 * One Player Element Settings
 */
onePlayerMode.setAttribute('id', 'one-player');
onePlayerMode.setAttribute('name', 'player options');
onePlayerMode.setAttribute('type', 'radio');
onePlayerMode.checked = true;
onePlayerMode.value = 'one player';
onePlayerLabel.setAttribute('for', 'one-player');
onePlayerLabel.innerText = '1 Player';
onePlayer.appendChild(onePlayerMode);
onePlayer.appendChild(onePlayerLabel);

/**
 * Two Player Element Settings
 */
twoPlayerMode.setAttribute('id', 'two-players');
twoPlayerMode.setAttribute('name', 'player options');
twoPlayerMode.setAttribute('type', 'radio');
twoPlayerMode.value = 'two players';
twoPlayerLabel.setAttribute('for', 'two-players');
twoPlayerLabel.innerText = '2 Players';
twoPlayers.appendChild(twoPlayerMode);
twoPlayers.appendChild(twoPlayerLabel);

/**
 * Start Button Element Settings
 */
startButton.setAttribute('id', 'start-button');
startButton.setAttribute('onclick', 'handleStartButton()');
startButton.innerText = 'Start Game';
startButtonContainer.appendChild(startButton);

/**
* Player Options Element Settings
*/
playerOptions.classList.add('player-options');
playerOptions.appendChild(onePlayer);
playerOptions.appendChild(twoPlayers);
playerOptions.appendChild(startButtonContainer);
app.appendChild(playerOptions);

/**
 * Markers, Toggles, And Game Conditions
 */
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**
 * Starting The Game
 */
const handleStartButton = () => {
  let game;
  if (onePlayerMode.checked) {
    game = new TicTacToe(onePlayerMode.value);
  } else if (twoPlayerMode.checked) {
    game = new TicTacToe(twoPlayerMode.value);
  }

  /**
  * 1. Hide Player Options
  */
  game.hide(playerOptions);

  /**
  * 2. Render Board Game And Reset Button
  */
  game.renderBoard('board');
  game.renderReset('reset-button');
};

/**
 * Resetting The Game
 */
const handleResetButton = () => {
  const playerOptions = document.querySelector('.player-options');
  const board = document.querySelector('.board');
  const resetButton = document.querySelector('.reset-button');

  /**
  * App Default Settings
  */
  playerOptions.style.display = 'flex';
  app.removeChild(board)
  app.removeChild(resetButton)
};

/**
 * Clicking On A Cell
 */
const handleClick = (e) => {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  /**
   * On One Player Mode
   */
  if (onePlayerMode.checked) {
    let availableCells = [...document.querySelector('.board').childNodes].filter(cell => (
      ![...cell.classList].includes(X_CLASS) && ![...cell.classList].includes(CIRCLE_CLASS)
    ))
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerChoice = availableCells[randomIndex];
    if (computerChoice) computerChoice.removeEventListener('click', handleClick);
    if (checkWin(X_CLASS)) {
      endGame(false);
    } 
    else if (availableCells.length === 0) {
      endGame(true);
    }
    else {
      availableCells.forEach(cell => cell.removeEventListener('click', handleClick));
      const waitForComputerToPlay = new Promise((resolve, reject) => {
        setTimeout(() => {
          placeMark(computerChoice, CIRCLE_CLASS);
          availableCells = [...document.querySelector('.board').childNodes].filter(cell => (
            ![...cell.classList].includes(X_CLASS) && ![...cell.classList].includes(CIRCLE_CLASS)
          )) 
          resolve(availableCells);
        }, 500)
      });
      waitForComputerToPlay.then(availableCells => {
        availableCells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
        if (checkWin(CIRCLE_CLASS)) {
          circleTurn = true;
          endGame(false);
        }
      })
    }
  }

  /** 
   * On Two Player Mode
   */
  else if (twoPlayerMode.checked) {
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      switchTurns();
      setBoardHoverClass();
    }
  }
};

/**
 * Placing Mark
 */
const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
};

/**
 * Switching Turns
 */
const switchTurns = () => {
  circleTurn = !circleTurn;
};

/**
 * Checking For Win
 */
const checkWin = (currentClass) => {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return document.getElementsByClassName('cell')[index].classList.contains(currentClass);
    })
  })
};

/**
 * When A Draw
 */
const isDraw = () => {
  const cellElements = document.getElementsByClassName('cell');
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS);
  })
};

/**
 * Ending The Game
 */
const endGame = (draw) => {
  const board = document.querySelector('.board');
  const overlayDisplay = document.createElement('div');
  const playAgainButton = document.createElement('button');
  let winningMessage;
  if (draw) {
    winningMessage = document.createTextNode(`Draw!`);
  } else {
    winningMessage = document.createTextNode(`${circleTurn ? 'O' : 'X'} Wins!`);
  }
  playAgainButton.innerText = 'Play Again';
  playAgainButton.setAttribute('onclick', 'playAgain()');
  overlayDisplay.appendChild(winningMessage);
  overlayDisplay.appendChild(playAgainButton);
  overlayDisplay.classList.add('show');
  board.appendChild(overlayDisplay);
};

/**
 * Determing Player Turn
 */
const setBoardHoverClass = () => {
  const board = document.querySelector('.board');
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};

/**
 * Play Again
 */
const playAgain = () => {
  const app = document.querySelector('.app');
  const board = document.querySelector('.board');
  const resetButton = document.querySelector('.reset-button');
  let game;
  if (onePlayerMode.checked) {
    game = new TicTacToe(onePlayerMode.value);
  } else if (twoPlayerMode.checked) {
    game = new TicTacToe(twoPlayerMode.value);
  }
  app.removeChild(board);
  app.removeChild(resetButton);
  game.renderBoard('board');
  game.renderReset('reset-button');
};

/**
 * Tic Tac Toe Settings
 */
class TicTacToe {
  constructor(option) {
    this.option = option;
  }

  disable(button){
    button.disabled = true;
  }

  hide(element){
    element.style.display = 'none';
  }

  mode(){
    return this.option;
  }

  renderBoard(className){
    const board = document.createElement('div');
    board.classList.add(className);
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', handleClick, { once: true })
      board.appendChild(cell);
    }
    app.appendChild(board);
    circleTurn = false;
    setBoardHoverClass();
  }

  renderReset(className){
    const resetButton = document.createElement('button');
    const text = document.createTextNode('Reset Game');
    resetButton.classList.add(className);
    resetButton.appendChild(text);
    resetButton.setAttribute('onclick', 'handleResetButton()')
    app.appendChild(resetButton);
  }
};