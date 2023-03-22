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
