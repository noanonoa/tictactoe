/**
 * Selectors
 */
const app = document.querySelector('.app');
const playerOptions = document.createElement('div');
const onePlayer = document.createElement('div');
const twoPlayers = document.createElement('div');
const radioInputOne = document.createElement('input');
const radioInputTwo = document.createElement('input');
const inputLabelOne = document.createElement('label');
const inputLabelTwo = document.createElement('label');
const startButtonContainer = document.createElement('div');
const startButton = document.createElement('button');

/**
 * One Player Element Settings
 */
radioInputOne.setAttribute('id', 'one-player');
radioInputOne.setAttribute('name', 'player options');
radioInputOne.setAttribute('type', 'radio');
radioInputOne.checked = true;
radioInputOne.value = 'one player';
inputLabelOne.setAttribute('for', 'one-player');
inputLabelOne.innerText = '1 Player';
onePlayer.appendChild(radioInputOne);
onePlayer.appendChild(inputLabelOne);

/**
 * Two Player Element Settings
 */
radioInputTwo.setAttribute('id', 'two-players');
radioInputTwo.setAttribute('name', 'player options');
radioInputTwo.setAttribute('type', 'radio');
radioInputTwo.value = 'two players';
inputLabelTwo.setAttribute('for', 'two-players');
inputLabelTwo.innerText = '2 Players';
twoPlayers.appendChild(radioInputTwo);
twoPlayers.appendChild(inputLabelTwo);

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
  if (radioInputOne.checked) {
    game = new TicTacToe(radioInputOne.value);
  } else if (radioInputTwo.checked) {
    game = new TicTacToe(radioInputTwo.value);
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
   * 2. Check For Win
   */
  if (checkWin(currentClass)) {
    endGame(false);
  }

  /**
   * 3. Check For Draw
   */

  switchTurns();
  setBoardHoverClass();
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
 * Ending The Game
 */
const endGame = (draw) => {
  if (draw) {

  } else {
    const board = document.querySelector('.board');
    const overlayDisplay = document.createElement('div');
    const winningMessage = document.createTextNode(`${circleTurn ? 'O' : 'X'} Wins!`);
    overlayDisplay.appendChild(winningMessage);
    overlayDisplay.classList.add('show');
    board.appendChild(overlayDisplay);
  }
};

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