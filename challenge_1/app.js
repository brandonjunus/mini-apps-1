// game setup

// matrix of tuples as game board
// first part of tuple to keep track of which cell is being toggled
var gameMatrix = [
  [[1, 0],[2, 0], [3, 0]],
  [[4, 0],[5, 0], [6, 0]],
  [[7, 0],[8, 0], [9, 0]]
]

var currentPlayer = "x"

// create event listener function for each div
var cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++){

  // note: it has to be wrapped in an IFFE because the forloop is not async while the rest is async
  (function(index) {
    var currentcell = cells[index].id
    cells[index].addEventListener("click", () => {
      // The game starts when someone makes a move. 
      // this function hides the reset button when you start the game
      hideResetButton();

      // check board to see if that move is available. If not, do nothing 
      currentMatrixPosition = parseInt(currentcell.slice(4)); // should be a single digit number
      
      if (isMovePlayable(currentMatrixPosition)){
        // move is playable

        // changes the innerHTML of that cell to the right player
        document.getElementById(currentcell).innerHTML = currentPlayer;
        // changes the gameMatrix to reflect that the move has changed
        playMove(currentMatrixPosition)
        // see if anyone one because of that move
        isGameComplete()
        

      } else {
        // move is not playable
        alert("move is not playable! Try again")
      }
    })
  })(i)
}

// resets the game
document.getElementById('reset').addEventListener('click', () => {
  gameMatrix = [  
    [[1, 0],[2, 0], [3, 0]],
    [[4, 0],[5, 0], [6, 0]],
    [[7, 0],[8, 0], [9, 0]]
  ];
  currentPlayer = "x";
  for (let j = 0; j < cells.length; j++){
    cells[j].innerHTML = "";
  }
})


// returns true or false, depending on wether the move has been played or not 
isMovePlayable = (currentMatrixPosition) => {
  for (let j = 0; j < gameMatrix.length; j++){
    for (let k = 0; k < gameMatrix[j].length; k++){
      if (currentMatrixPosition === gameMatrix[j][k][0] && gameMatrix[j][k][1] !== 0){
        return false;
      }
    }
  }
  return true;
}

// toggles the game matrix accordingly
playMove = (currentMatrixPosition) => {
  for (let j = 0; j < gameMatrix.length; j++){
    for (let k = 0; k < gameMatrix[j].length; k++){
      if (currentMatrixPosition === gameMatrix[j][k][0]){
        gameMatrix[j][k][1] = currentPlayer;
        if(currentPlayer === 'x'){
          currentPlayer = 'o'
        } else {
          currentPlayer = 'x'
        }
      }
    }
  }
}

isGameComplete = () => {
  var players = ['x', 'o'];

  // check rows for winner
  for (let playerIteration = 0; playerIteration < players.length; playerIteration++){
    for (let j = 0; j < gameMatrix.length; j++){
      if (
        gameMatrix[j][0][1] === players[playerIteration] &&
        gameMatrix[j][1][1] === players[playerIteration] &&
        gameMatrix[j][2][1] === players[playerIteration]
      ) {
        alert(players[playerIteration] + "has won the game!")
        renderResetButton();
        return;
      } 
    }
  }

  // check columns for winner
  for (let playerIteration = 0; playerIteration < players.length; playerIteration++){
    for (let j = 0; j < gameMatrix.length; j++){
      if (
        gameMatrix[0][j][1] === players[playerIteration] &&
        gameMatrix[1][j][1] === players[playerIteration] &&
        gameMatrix[2][j][1] === players[playerIteration]
      ) {
        alert(players[playerIteration] + " has won the game!")
        renderResetButton();
        return;
      } 
    }
  }

  // check major diagonals for winner
  for (let playerIteration = 0; playerIteration < players.length; playerIteration++){
      if (
        gameMatrix[0][0][1] === players[playerIteration] &&
        gameMatrix[1][1][1] === players[playerIteration] &&
        gameMatrix[2][2][1] === players[playerIteration]
      ) {
        alert(players[playerIteration] + " has won the game!")
        renderResetButton();
        return;
    }
  }

  // check minor diagonals for winner
  for (let playerIteration = 0; playerIteration < players.length; playerIteration++){
      if (
        gameMatrix[0][2][1] === players[playerIteration] &&
        gameMatrix[1][1][1] === players[playerIteration] &&
        gameMatrix[2][0][1] === players[playerIteration]
      ) {
        alert(players[playerIteration] + " has won the game!")
        renderResetButton();
        return;
    }
  }



  
}

renderResetButton = () => {
  document.getElementById('reset').style.visibility = "visible"
}

hideResetButton = () => {
  document.getElementById('reset').style.visibility = "hidden"
}