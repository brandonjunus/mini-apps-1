/****************** 
* GAME STATE
*******************/
var gameMatrix = [
  [[1, 0],[2, 0], [3, 0]],
  [[4, 0],[5, 0], [6, 0]],
  [[7, 0],[8, 0], [9, 0]]
]
var currentPlayer = "x";
var isGameComplete = false;
var wins = {
  x: 0,
  o: 0
}
var players = {
  x: 'brandon',
  o: 'eddie'
}

/****************** 
 * EVENT LISTNERS
 * CONTROLLERS (kinda)
 *******************/

// CREATES AN EVENT LISTENER FOR EVER DIV
var cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++){

  // note: it has to be wrapped in an IFFE because the forloop is not async while the rest is async
  (function(index) {
    var currentcell = cells[index].id
    cells[index].addEventListener("click", () => {
      // check if game is complete
      if(isGameComplete) {
        // if complete, only allow players to reset
        alert("Click RESET to play again!")
      } else {
        // if game is not complete
        // take current cell's ID to get its position in our matrix state
        var currentMatrixPosition = parseInt(currentcell.slice(4)); 
        
        // check if the move is playable
        if (isMovePlayable(currentMatrixPosition)){
          // render an image for the move
          renderMove(currentcell);
          // changes the gameMatrix to reflect that the move has changed
          playMove(currentMatrixPosition)
          // see if anyone won/tied as a result of move
          isGameWon();
          isGameTied();
          // changes to the next player
          changePlayer();
        } else {
          // if game is not playable, alert that the game is not playable
          alert("move is not playable! Try again")
        }
      }
    })
  })(i)
}

// RESET BUTTON FOR WHEN THE GAME IS OVER
document.getElementById('reset').addEventListener('click', () => {
  changePlayer();
  resetGameState();
  hideResetButton();
})

/****************** 
 * MODELS
 * (things that check or change the game state)
 *******************/

// RESETS GAME  
resetGameState = () => {
  gameMatrix = [  
    [[1, 0],[2, 0], [3, 0]],
    [[4, 0],[5, 0], [6, 0]],
    [[7, 0],[8, 0], [9, 0]]
  ];
  for (let j = 0; j < cells.length; j++){
    cells[j].innerHTML = "";
  }
  isGameComplete = false;
}

// CHANGES PLAYER
changePlayer = () => {
  if(currentPlayer === 'x'){
    currentPlayer = 'o'
  } else {
    currentPlayer = 'x'
  }
}

// CHECKS IF THE GAME IS PLAYABLE
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

// PLAYS MOVE TO GAME STATE
playMove = (currentMatrixPosition) => {
  for (let j = 0; j < gameMatrix.length; j++){
    for (let k = 0; k < gameMatrix[j].length; k++){
      if (currentMatrixPosition === gameMatrix[j][k][0]){
        gameMatrix[j][k][1] = currentPlayer;
      }
    }
  }
}

// CHECKS TO SEE IF GAME IS WON
isGameWon = () => {
  var players = ['x', 'o'];

  // check rows for winner
  for (let playerIteration = 0; playerIteration < players.length; playerIteration++){
    for (let j = 0; j < gameMatrix.length; j++){
      if (
        gameMatrix[j][0][1] === players[playerIteration] &&
        gameMatrix[j][1][1] === players[playerIteration] &&
        gameMatrix[j][2][1] === players[playerIteration]
      ) {
        completeGameWithWin(players[playerIteration])
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
        completeGameWithWin(players[playerIteration])
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
        completeGameWithWin(players[playerIteration])
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
        completeGameWithWin(players[playerIteration])
        return;
    }
  }
}

// CHECKS IF GAME IS TIED
isGameTied = () => {
  for(let j = 0; j < gameMatrix.length; j++){
    for(let k = 0; k < gameMatrix[j].length; k++){
      if (gameMatrix[j][k][1] === 0){
        return;
      }
    }
  }
  if (!isGameComplete){
    alert("game is tied!")
    isGameComplete = true;
  }
  renderResetButton();
}

/****************** 
 * VIEWS
 * (THINGS THAT UPDATE/RENDER DOM ELEMENTS)
 *******************/

 renderMove = (currentcell) => {
  if (currentPlayer === "x"){
    document.getElementById(currentcell).innerHTML = '<img src="x.png" style="height:150px"></img>';
  } else {
    document.getElementById(currentcell).innerHTML = '<img src="o.png" style="height:150px"></img>';
  }
}

completeGameWithWin = (player) => {
  alert(player + " has won the game!");
  isGameComplete = true;
  wins[player] = wins[player] + 1;
  // This commented out stuff is to allow players to choose their names. But that sounded way too boring so im going to go in a different direction
  // maybe if i get around to it i will allow for this functionality
  // document.getElementById('xwins').innerHTML = `${players['x']}'s Wins: ${wins['x']}`
  // document.getElementById('owins').innerHTML = `${players['o']}'s Wins: ${wins['o']}`
  document.getElementById('xwins').innerHTML = `Xs Wins: ${wins['x']}`
  document.getElementById('owins').innerHTML = `Os Wins: ${wins['o']}`
  changePlayer();
  renderResetButton();
}

renderResetButton = () => {
  document.getElementById('reset').style.visibility = "visible"
}

hideResetButton = () => {
  document.getElementById('reset').style.visibility = "hidden"
}