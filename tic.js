(async () => {

/* 
The first priority is to check if a win condition exists. If so, fill that spot. 
The second priority is to play defense by preventing a win condition for the enemy.
The thrid priority is to occupy strategic locations. 

In order to accomplish the first priority, you need to check all 8 possible paths to victory. You need to see that you are occupying
two of the spaces and that the third is unoccupied. 

Defense is similar in that you check if two of the spaces in the victory paths are occupied by the enemy. 

If all three spaces in a victory path are occupied by a player. End the game. 

Ask the player if they would like to play again. 
*/

// Instructions: 
const { Select } = require('enquirer');

console.log(`\nBelow you will find a tic tac toe board. You can choose your move based on the column headers. For example, a move at 1B will be at the center top row. Moves at 1A, 2B, and 3C would give you a diagonal 3 in a row!\n`);

const header = ['A', 'B', 'C',];
const ex1 = ['1A', ' ', ' ',]; 
const ex2 = [' ', '2B', ' ',];
const ex3 = [' ', ' ', '3C',];


console.log(header); console.log('');
console.log(ex1); console.log('');
console.log(ex2); console.log('');
console.log(ex3); console.log('');

// variables and arrays needed in game. 
let gameOn; 
const board = ['1A', '2A', '3A', '1B', '2B', '3B', '1C', '2C', '3C', 'exit']
let play; 
let gameBoard;
let player = 'Player X'; 
let placeholder;
let computerMove;  

// function to remove a particular string from an array. 
const removeString = (array, string) => {
    for (let i = 0; i < array.length; i++){
        if (array[i] === string || array[i].name === string) {
            array.splice(i, 1);
        } 
    }
}

// somehow this function is only passing in the values at each array index and thus changing the paramater names only changes what values were passed in not the actually array location. 
//we somehow need to change the values in the array location. 


const winCondition = (a, b, c, A, B, C) => { 

    if (a === b && b === c && c === a && a){
        gameOn = 'we have a winner';
        console.log(`Congratulations ${player}, you won!`);
    }
    else if (a === b && !c){computerMove = C;}
    else if (a === c && !b){computerMove = B;}
    else if (b === c && !a){computerMove = A;}

}; 


// larger loop starts here. 

gameBoard = [...board]; 

const row1 = ['', '', '']; 
const row2 = ['', '', '']; 
const row3 = ['', '', '']; 


// Innerloop starts here. The actual game.

while (!gameOn){


 
    play = new Select({
  name: 'play',
  message: 'Place an X on the board!',
  choices: gameBoard
});


    await play.run()
  .then(answer => {
      if (answer === '1A') {row1[0] = 'X'; removeString(gameBoard, '1A');}
      else if (answer === '2A') {row2[0] = 'X'; removeString(gameBoard, '2A');}
      else if (answer === '3A') {row3[0] = 'X'; removeString(gameBoard, '3A');}
      else if (answer === '1B') {row1[1] = 'X'; removeString(gameBoard, '1B');}
      else if (answer === '2B') {row2[1] = 'X'; removeString(gameBoard, '2B');}
      else if (answer === '3B') {row3[1] = 'X'; removeString(gameBoard, '3B');}
      else if (answer === '1C') {row1[2] = 'X'; removeString(gameBoard, '1C');}
      else if (answer === '2C') {row2[2] = 'X'; removeString(gameBoard, '2C');}
      else if (answer === '3C') {row3[2] = 'X'; removeString(gameBoard, '3C');}
      else {process.exit();}
    })
  .catch(console.error);

winCondition(row1[0], row2[0], row3[0], '1A', '2A', '3A'); 
winCondition(row1[1], row2[1], row3[1], '1B', '2B', '3B');
winCondition(row1[2], row2[2], row3[2], '1C', '2C', '3C');
winCondition(row1[0], row1[1], row1[2], '1A', '1B', '1C');
winCondition(row2[0], row2[1], row2[2], '2A', '2B', '2C');
winCondition(row3[0], row3[1], row3[2], '3A', '3B', '3C');
winCondition(row1[0], row2[1], row3[2], '1A', '2B', '3C');
winCondition(row1[2], row2[1], row3[0], '1C', '2B', '3A');


      if (computerMove === '1A') {row1[0] = 'O'; removeString(gameBoard, '1A');}
      else if (computerMove === '2A') {row2[0] = 'O'; removeString(gameBoard, '2A');}
      else if (computerMove === '3A') {row3[0] = 'O'; removeString(gameBoard, '3A');}
      else if (computerMove === '1B') {row1[1] = 'O'; removeString(gameBoard, '1B');}
      else if (computerMove === '2B') {row2[1] = 'O'; removeString(gameBoard, '2B');}
      else if (computerMove === '3B') {row3[1] = 'O'; removeString(gameBoard, '3B');}
      else if (computerMove === '1C') {row1[2] = 'O'; removeString(gameBoard, '1C');}
      else if (computerMove === '2C') {row2[2] = 'O'; removeString(gameBoard, '2C');}
      else if (computerMove === '3C') {row3[2] = 'O'; removeString(gameBoard, '3C');}


console.log(header); console.log('');
console.log(row1); console.log('');
console.log(row2); console.log('');
console.log(row3); console.log('');



}

})()
