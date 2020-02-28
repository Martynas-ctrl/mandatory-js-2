function startGame() {
   document.turn = '😈'; //<---player turn

   if(Math.random() < 0.5) { //<--- random turn, either 😈 or 😇
     document.turn = '😇';
   }
   setMessage( ' Player ' + document.turn + ' will go first! ');
   document.winner = null; //<--- kod to decide who won the game

   for( let i = 1; i <= 9; i++) { //<---reset the game whenever you want
    playAgain(i);
  }
}

// <--- function for different kind of messages that appears when you click on boxes--->
function setMessage(msg) {
   document.querySelector('.message').innerHTML = msg;
   document.querySelector('.message').style.color = 'rgb(209, 207, 209)';
   document.querySelector('.message').style.fontSize = '17px';
}

//<--- when you click on the box and document.winner is not longer null set message 'The game is already over!', set also 😈 on the box you click on--->
//<---if td is emty(no text), make the next move but if its not emty call the message 'That box is already used'
function nextMove() {
    let td = document.querySelectorAll('td');
    for(let i = 0; i < td.length; i++) {
      td[i].addEventListener('click', function(){
        if(document.winner != null) {
            setMessage(' The game is already over! ')
      } else if(td[i].innerHTML === '') {
          td[i].innerHTML = document.turn;
          checkWhichPlayersTurn();
      } else{
           setMessage('That box is already used');
      }
    });
  }
}

nextMove();
let moveCounter = 0;

//<---check if it`s p1 or p2 turn and set text for whose turn it is, check also if it is a draw and set text for a draw, also if we have a winner which will be true set winbox with message if not it will be false and set drawbox instead -->
function checkWhichPlayersTurn() {
  if(checkWhichPlayerWon(document.turn)) {
    if(document.turn === '😈'){
       document.winner = document.turn;
       button0.remove(button0);
       winBoxP1();
       buttonPlayAgainP1();
       buttonQuitP1();
       deleteButton1();
  } else if(document.turn === '😇'){
      document.winner = document.turn;
      button0.remove(button0);
      winBoxP2();
      buttonPlayAgainP2();
      buttonQuitP2();
      deleteButton1();
    }
  } else if (document.turn === '😈'){
      moveCounter++;
      document.turn = '😇';
      setMessage(' It`s Player 😇 turn ');
      if (moveCounter === 9 && checkWhichPlayerWon() === false){
        button0.remove(button0);
        drawBox();
        drawButtonPlayAgain();
        drawbuttonQuit();
        deleteButton1();
    };
  } else if (document.turn === '😇'){
        moveCounter++;
        document.turn = '😈';
        setMessage(' It`s Player 😈 turn ');
        if (moveCounter === 9 && checkWhichPlayerWon() === false){
          button0.remove(button0);
          drawBox();
          drawButtonPlayAgain();
          drawbuttonQuit();
          deleteButton1();
      };
  } else {
      moveCounter++;
      console.log(moveCounter);
      document.turn = '😈';
      setMessage(' It`s Player 😈 turn ');
    }
  }

// <---Winning Conditions for player1 and player2--->
function checkWhichPlayerWon(winCondition) {
  let result = false;
  if(checkRow(1,2,3, winCondition) ||
     checkRow(4,5,6, winCondition) ||
     checkRow(7,8,9, winCondition) ||
     checkRow(1,4,7, winCondition) ||
     checkRow(2,5,8, winCondition) ||
     checkRow(3,6,9, winCondition) ||
     checkRow(1,5,9, winCondition) ||
     checkRow(3,5,7, winCondition)) {

     result = true;
  }
  return result;
}

// <---compare boxes with the winning conditions.If 3 X or 3 O are in a row the result will be true--->
function checkRow(firstRow, secondRow, thirdRow, winCondition) {
  let result = false;
  if(getBox(firstRow) === winCondition && getBox(secondRow) === winCondition && getBox(thirdRow) === winCondition) {
    result = true;
  }
  return result;
}

//<---Get the HTML content of a <td> element with id="box" and their number--->
// <---the function is used to identify the position of every box and tell what we have in a box--->
function getBox(number) {
  return document.querySelector('#box' + number).innerHTML;
}

// <---the function to reset the game in other words to start the game from the begining--->
function playAgain(number) {
  document.querySelector('#box' + number).innerHTML = '';
  moveCounter = 0;
}

//<---function to create winBox which appears when player one wins--->
function winBoxP1() {
  let body = document.querySelector('body');
  let winBoxElement = document.createElement('div');
  winBoxElement.className = 'winBoxElementP1';
  body.appendChild(winBoxElement);
  let pElement = document.createElement('p');
  pElement.className = 'winnerText';
  pElement.textContent = 'Well Done Player 😈! You win the game!';
  winBoxElement.appendChild(pElement);
  let buttonPlayAgain = document.createElement('button');
  buttonPlayAgain.className = 'buttonPlayAgainP1';
  buttonPlayAgain.innerHTML = 'Play Again';
  winBoxElement.appendChild(buttonPlayAgain);
  let buttonQuit = document.createElement('button');
  buttonQuit.className = 'buttonQuitP1';
  buttonQuit.innerHTML = 'Quit';
  winBoxElement.appendChild(buttonQuit);
}

//<---function to create winBox which appears when player two wins--->
function winBoxP2() {
  let body = document.querySelector('body');
  let winBoxElement = document.createElement('div');
  winBoxElement.className = 'winBoxElementP2';
  body.appendChild(winBoxElement);
  let pElement = document.createElement('p');
  pElement.className = 'winnerText';
  pElement.textContent = 'Well Done Player 😇! You win the game!';
  winBoxElement.appendChild(pElement);
  let buttonPlayAgain = document.createElement('button');
  buttonPlayAgain.className = 'buttonPlayAgainP2';
  buttonPlayAgain.innerHTML = 'Play Again';
  winBoxElement.appendChild(buttonPlayAgain);
  let buttonQuit = document.createElement('button');
  buttonQuit.className = 'buttonQuitP2';
  buttonQuit.innerHTML = 'Quit';
  winBoxElement.appendChild(buttonQuit);
}

//<---function to create drawBox which appears when no one wins--->
function drawBox() {
  let body = document.querySelector('body');
  let drawBoxElement = document.createElement('div');
  drawBoxElement.className = 'drawBoxElement';
  body.appendChild(drawBoxElement);
  let pElement = document.createElement('p');
  pElement.className = 'winnerTextDraw';
  pElement.textContent = 'It`s a draw!';
  drawBoxElement.appendChild(pElement);
  let buttonPlayAgain = document.createElement('button');
  buttonPlayAgain.className = 'drawButtonPlayAgain';
  buttonPlayAgain.innerHTML = 'Play Again';
  drawBoxElement.appendChild(buttonPlayAgain);
  let buttonQuit = document.createElement('button');
  buttonQuit.className = 'drawButtonQuit';
  buttonQuit.innerHTML = 'Quit';
  drawBoxElement.appendChild(buttonQuit);
}

//<--- add function for button playAgain for player one that removes win box for player one and creates new reset button when the win box is closed--->
//added function also resets the game and starts the game from the begining--->
function buttonPlayAgainP1() {
  let buttonPlayAgain = document.querySelector('.buttonPlayAgainP1');
  buttonPlayAgain.addEventListener('click', function(){
    for( let i = 1; i <= 9; i++) {
     playAgain(i);
     startGame();
     let winBox = document.querySelector('.winBoxElementP1');
     winBox.remove(winBox);
     createButton1();
   }
 });
}

//<--- a function that adds function for quit button for player one to close the whole game/website when the quitbutton is clicked on--->
function buttonQuitP1() {
  let buttonQuit = document.querySelector('.buttonQuitP1');
  buttonQuit.addEventListener('click' , function(){
    window.open('', '_self', '');
    window.close();
  });
}

//<--- add function for button playAgain for player two that removes win box for player two and creates new reset button when the win box is closed--->
//added function also resets the game and starts the game from the begining--->
function buttonPlayAgainP2() {
  let buttonPlayAgain = document.querySelector('.buttonPlayAgainP2');
  buttonPlayAgain.addEventListener('click', function(){
    for( let i = 1; i <= 9; i++) {
     playAgain(i);
     startGame();
     let winBox = document.querySelector('.winBoxElementP2');
     winBox.remove(winBox);
     createButton1();
   }
 });
}

//<--- add function for button playAgain for drawBox that removes draw box for players and creates new reset button when the draw box is closed--->
//added function also resets the game and starts the game from the begining--->
function drawButtonPlayAgain() {
  let buttonPlayAgain = document.querySelector('.drawButtonPlayAgain');
  buttonPlayAgain.addEventListener('click', function(){
    for( let i = 1; i <= 9; i++) {
     playAgain(i);
     startGame();
     let winBox = document.querySelector('.drawBoxElement');
     winBox.remove(winBox);
     createButton1();
   }
 });
}

//<--- a function that adds function for drawButtonQuit to close the whole game/website when the button with text Quit in a drawBox is clicked on--->
function drawbuttonQuit() {
  let buttonQuit = document.querySelector('.drawButtonQuit');
  buttonQuit.addEventListener('click' , function(){
    window.open('', '_self', '');
    window.close();
  });
}

//<--- a function that adds function for quit button for player two to close the whole game/website when the quitbutton is clicked on--->
function buttonQuitP2() {
  let buttonQuit = document.querySelector('.buttonQuitP2');
  buttonQuit.addEventListener('click' , function(){
    window.open('', '_self', '');
    window.close();
  });
}

//<---create button and add function to reset the game--->
let body = document.querySelector('body');
let button0 = document.createElement('button');
button0.className = 'button0';
body.appendChild(button0);
button0.innerHTML = 'Reset the game';
button0.addEventListener('click', function(){
  for( let i = 1; i <= 9; i++) {
  playAgain(i);
  startGame();
  }
});

//<---function to create second reset button and add function for reset button to reset the game when reset button is clicked--->
function createButton1() {
  let body = document.querySelector('body');
  let button1 = document.createElement('button');
  button1.className = 'button1';
  body.appendChild(button1);
  button1.innerHTML = 'Reset the game';
  button1.addEventListener('click', function(){
    for( let i = 1; i <= 9; i++) {
    playAgain(i);
    startGame();
    }
  });
}

//<---function to delete second reset button--->
function deleteButton1() {
  let deleteButton1 = document.querySelector('.button1');
  deleteButton1.remove(deleteButton1);
}
