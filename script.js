const app = {

  playerOneTurn: true,
  playerTwoTurn: false,
  playerOne: 'Joueur 1',
  playerTwo: 'Joueur 2',
  playerOneChoice: '',
  playerTwoChoice: '',
  option: '',
  isGameStart: false,
  isWinnerExist: false,
  equality: false,
  currentPlayer: '',
  playersChoice: [],
  
  // function init in object app to initialize and handle the app
  init: () => {
    // initialize document objects needed to select an option
    playersChoose = document.querySelector('.players-choose');
    chooseOptions = document.querySelectorAll('.players-options');
    clearOptions = document.querySelector('.players-clear');
    gamePlayerTurn = document.querySelector('.game-round');
    gameCells = document.querySelectorAll('.game-cell');

    // listening on click on the options to give player a choice 
    chooseOptions.forEach(option => {
      option.addEventListener('click', app.getOption)
    });

    clearOptions.addEventListener('click', app.clearAll);

    playersChoices = document.querySelectorAll('.players-choice');

    // first display with player one on starting by default
    app.updateDisplay();

    gameCells.forEach(el => {
      el.addEventListener('click', app.setPlayerChoiceToCell);
    });
  },

  // put player choice to cells
  setPlayerChoiceToCell: (e) => {
    if (!app.isGameStart) return
    if (app.isWinnerExist) return
    if(e.currentTarget.innerText !== '') return
    currentCell = e.currentTarget;
    currentCell.innerText = `${app.currentPlayer}`;
    currentData = currentCell.getAttribute('data-id');
    const parsedData = parseInt(currentData);
    app.insertToArray(parsedData, app.currentPlayer);
  },

  // insert the current value to an empty array. To know if we have a winner after that
  insertToArray: (currentIndex, currentValue) => {
    app.playersChoice[currentIndex] = currentValue;
    app.verification();
    if (app.equality) return app.createRestartButton();
    if (!app.isWinnerExist) return app.switchPlayerTurn();
    if (app.isWinnerExist) return app.createRestartButton();
  },

  // once we have a winner let's create a restart button
  createRestartButton: () => {
    const game = document.querySelector('.game');
    const restartButton = document.createElement('button');
    restartButton.classList.add('game-restart');
    restartButton.innerText = 'Rejouer ?';
    game.appendChild(restartButton);
    restartButton.addEventListener('click', () => app.reboot(restartButton));
  },

  // reboot all the game
  reboot: (restartButton) => {
    app.playerOneTurn = true;
    app.playerTwoTurn = false;
    app.playerOne = 'Joueur 1';
    app.playerTwo = 'Joueur 2';
    app.playerOneChoice = '';
    app.playerTwoChoice = '';
    app.option = '';
    app.isGameStart = false;
    app.isWinnerExist = false;
    app.currentPlayer = '';
    app.playersChoice = [];
    app.equality = false;

    playersChoices.forEach(playerChoice => {
      playerChoice.innerText = null;
    });

    gamePlayerTurn.innerText = null;

    const game = document.querySelector('.game');
    game.removeChild(restartButton);

    gameCells.forEach(el => {
      el.innerText = null;
    }); 

    app.updateDisplay();
    app.gameTurnUpdateDisplay();
  },

  // verify if there are a match in the array then show a success message
  verification: () => {
    if (app.playersChoice[1] !== undefined && app.playersChoice[2] !== undefined && app.playersChoice[3] !== undefined && app.playersChoice[1] === app.playersChoice[2] && app.playersChoice[2] === app.playersChoice[3]){

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[4] !== undefined && app.playersChoice[5] !== undefined && app.playersChoice[6] !== undefined && app.playersChoice[4] === app.playersChoice[5] && app.playersChoice[5] === app.playersChoice[6]) {
 
      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[7] !== undefined && app.playersChoice[8] !== undefined && app.playersChoice[9] !== undefined && app.playersChoice[7] === app.playersChoice[8] && app.playersChoice[8] === app.playersChoice[9]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[1] !== undefined && app.playersChoice[4] !== undefined && app.playersChoice[7] !== undefined && app.playersChoice[1] === app.playersChoice[4] && app.playersChoice[4] === app.playersChoice[7]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[2] !== undefined && app.playersChoice[5] !== undefined && app.playersChoice[8] !== undefined && app.playersChoice[2] === app.playersChoice[5] && app.playersChoice[5] === app.playersChoice[8]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[3] !== undefined && app.playersChoice[6] !== undefined && app.playersChoice[9] !== undefined && app.playersChoice[3] === app.playersChoice[6] && app.playersChoice[6] === app.playersChoice[9]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[1] !== undefined && app.playersChoice[5] !== undefined && app.playersChoice[9] !== undefined && app.playersChoice[1] === app.playersChoice[5] && app.playersChoice[5] === app.playersChoice[9]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[3] !== undefined && app.playersChoice[5] !== undefined && app.playersChoice[7] !== undefined && app.playersChoice[3] === app.playersChoice[5] && app.playersChoice[5] === app.playersChoice[7]) {

      app.isWinnerExist = true;
      app.gameTurnUpdateDisplay();

    } else if (app.playersChoice[1] !== undefined && app.playersChoice[2] !== undefined && app.playersChoice[3] !== undefined && app.playersChoice[4] !== undefined && app.playersChoice[5] !== undefined && app.playersChoice[6] !== undefined && app.playersChoice[7] !== undefined && app.playersChoice[8] !== undefined && app.playersChoice[9] !== undefined) {

      app.equality = true;
      app.gameTurnUpdateDisplay();

    }
  },

  // function to update the display and to know which player is choosing
  updateDisplay: () => {
    if (app.isGameStart === true) {
      playersChoose.innerText = 'Bonne chance !';
    } else if (app.playerOneTurn) {
      playersChoose.innerText = `${app.playerOne} choisit`;
    } else if (app.playerTwoTurn) {
      playersChoose.innerText = `${app.playerTwo} choisit`;
    }
  },

  // if the user click on the clear button then we clean all props by default
  clearAll: () => {
    if (app.isGameStart) return;
    app.playerOneTurn = true;
    app.playerTwoTurn = false;
    app.playerOne = 'Joueur 1';
    app.playerTwo = 'Joueur 2';
    app.playerOneChoice = '';
    app.playerTwoChoice = '';
    app.option = '';
    app.isGameStart = false;

    playersChoices.forEach(playerChoice => {
      playerChoice.innerText = null;
    });

    gamePlayerTurn.innerText = null;

    app.updateDisplay();
  },

  // getting the option values and setting it to the option propertie
  getOption: (e) => {
    const currentOption = e.currentTarget.innerText;
    app.option = currentOption;
    if (app.playerOneTurn && app.playerTwoTurn === false ) {
      app.setOptionToPlayerOne();
    } else {
      app.setOptionToPlayerTwo();
    } 
  },

  // setting a choice to player one
  setOptionToPlayerOne: () => {
    if (app.playerTwoChoice !== '') return
    if (app.playerOneTurn && app.playerTwoTurn === false)  {
      app.playerOneChoice = app.option;
      playersChoices.forEach(playerChoice => {
        const choice = playerChoice.getAttribute('data-choice');
        if (choice === '1') { 
          playerChoice.innerText = `${app.playerOne}: ${app.playerOneChoice}`;
          app.switchPlayerTurn();
        }; 
      });
    }
  },

  // setting a choice to player two
  setOptionToPlayerTwo: () => {
    if (app.playerOneChoice === app.option || app.playerTwoChoice !== '') return
    if (app.playerTwoTurn && app.playerOneTurn === false) {
      app.playerTwoChoice = app.option;
      playersChoices.forEach(playerChoice => {
        const choice = playerChoice.getAttribute('data-choice');
        if (choice === '2') {
          playerChoice.innerText = `${app.playerTwo}: ${app.playerTwoChoice}`;
          // The game can start, switch this prop to true
          app.isGameStart = !app.isGameStart;
          window.scrollTo(0, document.body.scrollHeight);
          app.switchPlayerTurn();
        };
      });
    }
  },

  // handle the display by the boolean playerTurn state
  switchPlayerTurn: () => {
    if (app.isGameStart) {
      app.playerOneTurn = !app.playerOneTurn;
      app.playerTwoTurn = !app.playerTwoTurn;
      app.setChoiceToCurrentPlayer();
    }
    if (app.playerOneChoice !== '' && app.playerTwoChoice !== '') {
      app.updateDisplay();
    } else {
      app.playerOneTurn = !app.playerOneTurn;
      app.playerTwoTurn = !app.playerTwoTurn;
      app.updateDisplay();
    }
  },

  // set an option to the current player
  setChoiceToCurrentPlayer: () => {
    if (!app.isGameStart) return
    if (app.playerOneTurn) {
      app.currentPlayer = app.playerOneChoice;
      app.gameTurnUpdateDisplay();
    } else if (app.playerTwoTurn) {
      app.currentPlayer = app.playerTwoChoice;
      app.gameTurnUpdateDisplay();
    }
  },

  // handle the display of the player's turn when the game is started, if the game is not started, return nothing
  gameTurnUpdateDisplay: () => {
    if (!app.isGameStart) return
    if (app.equality) return gamePlayerTurn.innerText = 'Egalité !';
    if (app.isWinnerExist) {
      if (app.currentPlayer === app.playerOneChoice) {
        gamePlayerTurn.innerText = `Victoire du ${app.playerOne} !`;
      } else if (app.currentPlayer === app.playerTwoChoice) {
        gamePlayerTurn.innerText = `Victoire du ${app.playerTwo} `;
      }
    }
    if (app.playerOneTurn && !app.isWinnerExist) gamePlayerTurn.innerText = `Tour du ${app.playerOne} `;
    if (app.playerTwoTurn && !app.isWinnerExist) gamePlayerTurn.innerText = `Tour du ${app.playerTwo}`;
  },

};

document.addEventListener('DOMContentLoaded', app.init);