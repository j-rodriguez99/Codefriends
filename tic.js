(async () => {

const { Select } = require('enquirer');
const { Toggle } = require('enquirer');

// variables and arrays needed in game. 
let gameOn; 
const board = ['1A', '2A', '3A', '1B', '2B', '3B', '1C', '2C', '3C', 'I don\'t want to play anymore']
let play; 
let gameBoard;
let computerMove;  
let again;
let boolean;
let defense;
let offense; 

// function to remove a particular string from an array. 
const removeString = (array, string) => {
  for (let i = 0; i < array.length; i++){
    if (array[i] === string || array[i].name === string) {
      array.splice(i, 1);
    } 
  }
}

// function that checks a particular victory path. It also informs the computer which position to move to in order to secure a victory or play defense. 
// the function takes six paramaters - 3 array indexes that are a possible victory path and their corresponding string names. 

// Is it smart enough to choose victory over defense though? 

const winCondition = (a, b, c, A, B, C) => { 

  if (a === b && b === c && a){
    gameOn = 'we have a winner';
    if (a === 'X'){
      console.log(`Congratulations Player X, you won!`);}
    else {console.log(`Congratulations Player O, you won!`);}
  }
  else if (a === b && !c && a){
    computerMove = C;
    if (a === 'X'){defense = C}
    else {offense = C}
  }
  else if (a === c && !b && a){computerMove = B;
    if (a === 'X'){defense = B}
    else {offense = B}
  }
  else if (b === c && !a && b){computerMove = A;
    if (b === 'X'){defense = A}
    else {offense = A}
  }
}; 


// Outer loop starts here. 

do {
  // game instructions. 
  console.log(`\nBelow you will find a tic tac toe board. You can choose your move based on the column headers. For example, a move at 1B will be at the center top row. Moves at 1A, 2B, and 3C would give you a diagonal 3 in a row!\n`);

  const header = ['A', 'B', 'C',];
  const ex1 = ['1A', ' ', ' ',]; 
  const ex2 = [' ', '2B', ' ',];
  const ex3 = [' ', ' ', '3C',];
  
  
  console.log(header); console.log('');
  console.log(ex1); console.log('');
  console.log(ex2); console.log('');
  console.log(ex3); console.log('');

  again = new Toggle({
    message: 'Would you like to play again?',
    enabled: 'Yes',
    disabled: 'No'
    });

  // resets the choices that player x can make. 
  gameBoard = [...board]; 

  gameOn = '';

  // resets the arrays that hold the Xs and Os. 

  const row1 = ['', '', '']; 
  const row2 = ['', '', '']; 
  const row3 = ['', '', '']; 


// Innerloop starts here. The actual game.

while (!gameOn){

  computerMove = '';
  offense = '';
  defense = '';

  console.log('It is your turn to play. Choose wisely!');
 
  // re-create the play variable with updated gameBoard array on every loop. 

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

  console.log(header); console.log('');
  console.log(row1); console.log('');
  console.log(row2); console.log('');
  console.log(row3); console.log('');

  if (gameBoard.length === 1){ console.log('\n This game has ended in a stalemate!');
    break; 
  }

  winCondition(row1[0], row2[0], row3[0], '1A', '2A', '3A'); 
  winCondition(row1[1], row2[1], row3[1], '1B', '2B', '3B');
  winCondition(row1[2], row2[2], row3[2], '1C', '2C', '3C');
  winCondition(row1[0], row1[1], row1[2], '1A', '1B', '1C');
  winCondition(row2[0], row2[1], row2[2], '2A', '2B', '2C');
  winCondition(row3[0], row3[1], row3[2], '3A', '3B', '3C');
  winCondition(row1[0], row2[1], row3[2], '1A', '2B', '3C');
  winCondition(row1[2], row2[1], row3[0], '1C', '2B', '3A');

  console.log('The computer will now take it\'s turn.');

  if (!computerMove) {
    if (row2[1] === 'O' && row1[0] === 'X' && row3[2] === 'X' && !row1[1]){computerMove = '1B';}
    else if (row2[1] === 'O' && row1[2] === 'X' && row3[0] === 'X' && !row1[1]){computerMove = '1B';}
    else if (!row2[1]){computerMove = '2B'}
    else if (!row1[2]) {computerMove = '1C'}
    else if (!row3[2]) {computerMove = '3C'}
    else if (!row3[0]) {computerMove = '3A'}
    else if (!row1[0]) {computerMove = '1A'}
    else if (!row1[1]) {computerMove = '1B'}
    else if (!row3[1]) {computerMove = '3B'}
    else if (!row2[2]) {computerMove = '2C'}
    else if (!row2[0]) {computerMove = '2A'}
  }

  if (offense && defense) {computerMove = offense;}

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


  winCondition(row1[0], row2[0], row3[0], '1A', '2A', '3A'); 
  winCondition(row1[1], row2[1], row3[1], '1B', '2B', '3B');
  winCondition(row1[2], row2[2], row3[2], '1C', '2C', '3C');
  winCondition(row1[0], row1[1], row1[2], '1A', '1B', '1C');
  winCondition(row2[0], row2[1], row2[2], '2A', '2B', '2C');
  winCondition(row3[0], row3[1], row3[2], '3A', '3B', '3C');
  winCondition(row1[0], row2[1], row3[2], '1A', '2B', '3C');
  winCondition(row1[2], row2[1], row3[0], '1C', '2B', '3A');

  // end of while loop. 
}

console.log('');

await again.run()
.then(answer => {boolean = answer;
  if (answer === false){console.log('\nThank you for playing. Goodbye!');}
  })
.catch(console.error);

} while (boolean); 

})()



