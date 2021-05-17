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
 * Markers And Toggles
 */
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;

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

  /**
   * 3. Check For Draw
   */

  /**
   * 4. Switch Turns
   */
  switchTurns();
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