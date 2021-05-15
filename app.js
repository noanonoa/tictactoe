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
