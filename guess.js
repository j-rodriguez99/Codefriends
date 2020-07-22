(async () => {

const prompt = require('prompt-sync')();
const { Toggle } = require('enquirer');

let correct;
let attempt;  
let again;
let boolean;  
let guess;

do {
 
    again = new Toggle({
    message: 'Would you like to play again?',
    enabled: 'Yes',
    disabled: 'No'
    });

    guess = Math.floor(Math.random() * 100 +1)

    // Next a while loop within the do while loop here: 

    while (!correct){
    console.log('')
    attempt = prompt('I\'m thinking of a whole number between 1 and 100. What is it: ');


    if (attempt == guess){console.log(`Congratulations, the number was ${guess}. Your guess of ${attempt} was correct!`);
    correct = 'achieved'; 
    }
    else if (attempt > guess) {console.log(`Your guess of ${attempt} is greater than the number I'm thinking of.`);}
    else {console.log(`Your guess of ${attempt} is less than the number I'm thinking of`);}
    }

    console.log('');

    await again.run()
    .then(answer => {boolean = answer;
    correct = false;
    if (answer === false){console.log('\nThank you for playing. Goodbye!');}
    })
    .catch(console.error);

} while (boolean); 


})()