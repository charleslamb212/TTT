const statusDisplay = document.querySelector('.status');
let gameActive = true; //`true` if game is live
let currentPlayer = "X"; //`X` always goes first
let gameState = ["", "", "", "", "", "", "", "", ""]; //Array of 9 strings, each to be updated with a move

const winningMessage = () => `Player ${currentPlayer} has won!`; //Template literal used to display winning message
const drawMessage = () => `Game ended in a draw!`; //Template literal used to display draw message
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; //Template literal used to display whose turn it is

statusDisplay.innerHTML = currentPlayerTurn(); //Displays whose turn it is

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); //Adds event listener to each cell
document.querySelector('.reset').addEventListener('click', handleRestartGame); //Adds event listener to reset button

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target; //   "event.target" is the element that was clicked on
  const clickedCellIndex = parseInt( //   "parseInt" converts a string to an integer
    clickedCell.getAttribute('data-cell-index') //   "getAttribute" gets the value of an attribute on the specified element
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) { //If the cell has already been played or the game is not live,
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex); //Calls function to handle cell played
  handleResultValidation(); //Calls function to handle result validation
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; //Updates the gameState array with the current player
    clickedCell.innerHTML = currentPlayer; //Updates the HTML with the current player
    }

    const winningConditions = [ //Array of arrays containing winning conditions for the game
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) { //Loops through the winning conditions array
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') { //If any of the conditions are not met, the loop continues
                continue;
            }
            if (a === b && b === c) { //If any of the conditions are met, the loop breaks
                roundWon = true;
                break
            }
        }

        if (roundWon) { //If roundWon is true, the game is over and the winning message is displayed
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes(""); //If roundWon is false, the game continues
        if (roundDraw) { //If roundDraw is true, the game is over and the draw message is displayed
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange(); //If roundDraw is false, the game continues
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; //Changes the current player
        statusDisplay.innerHTML = currentPlayerTurn(); //Displays whose turn it is
    }

    function handleRestartGame() {
        gameActive = true; //Sets gameActive to true
        currentPlayer = "X"; //Sets currentPlayer to "X"
        gameState = ["", "", "", "", "", "", "", "", ""]; //Resets the gameState array
        statusDisplay.innerHTML = currentPlayerTurn(); //Displays whose turn it is
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); //Resets the innerHTML of each cell
    }

