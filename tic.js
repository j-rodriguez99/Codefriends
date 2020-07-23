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

const winCondition = (a, b, c, A, B, C) => { 

  if (a === b && b === c && a !== ' '){
    gameOn = 'we have a winner';
    if (a === 'X'){
      console.log(`Congratulations Player X, you won!`);}
    else {console.log(`Congratulations Player O, you won!`);}
  }
  else if (a === b && c === ' ' && a !== ' '){
    computerMove = C;
    if (a === 'X'){defense = C}
    else {offense = C}
  }
  else if (a === c && b === ' ' && a !== ' '){computerMove = B;
    if (a === 'X'){defense = B}
    else {offense = B}
  }
  else if (b === c && a === ' ' && b !== ' '){computerMove = A;
    if (b === 'X'){defense = A}
    else {offense = A}
  }
};

const interface = () => {
  console.log('    A   B   C ');
  console.log('  -------------');
  console.log(`1 | ${row1[0]} | ${row1[1]} | ${row1[2]} |`);
  console.log('  -------------');
  console.log(`2 | ${row2[0]} | ${row2[1]} | ${row2[2]} |`);
  console.log('  -------------');
  console.log(`3 | ${row3[0]} | ${row3[1]} | ${row3[2]} |`);
  console.log('  -------------');
}

let row1 = [' ', ' ', ' ']; 
let row2 = [' ', ' ', ' ']; 
let row3 = [' ', ' ', ' ']; 
// Outer loop starts here. 

do {
  
  // resets the arrays that hold the Xs and Os. 
  row1 = [' ', ' ', ' ']; 
  row2 = [' ', ' ', ' ']; 
  row3 = [' ', ' ', ' ']; 
  
  
  // game instructions. 
  console.log(`\nBelow you will find a tic tac toe board. You can choose your move based on the column headers. For example, a move at 1B will be at the center top row. Your opponent will be Zippy, the AI 3-in-row champ.\n`);

  interface();
  
  again = new Toggle({
    message: 'Would you like to play again?',
    enabled: 'Yes',
    disabled: 'No'
    });

  // resets the choices that player x can make. 
  gameBoard = [...board]; 

  gameOn = '';

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

  console.clear();
  interface();

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

  if (!computerMove) {
    if (row2[1] === 'O' && row1[0] === 'X' && row3[2] === 'X' && row1[1] === ' '){computerMove = '1B';}
    else if (row2[1] === 'O' && row1[2] === 'X' && row3[0] === 'X' && row1[1] === ' '){computerMove = '1B';}
    else if (row2[1] === ' '){computerMove = '2B'}
    else if (row1[2] === ' ') {computerMove = '1C'}
    else if (row3[2] === ' ') {computerMove = '3C'}
    else if (row3[0] === ' ') {computerMove = '3A'}
    else if (row1[0] === ' ') {computerMove = '1A'}
    else if (row1[1] === ' ') {computerMove = '1B'}
    else if (row3[1] === ' ') {computerMove = '3B'}
    else if (row2[2] === ' ') {computerMove = '2C'}
    else if (row2[0] === ' ') {computerMove = '2A'}
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

  console.clear();
  interface();


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



