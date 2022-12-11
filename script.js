const colorsArray = ["black", "blue", "green", "red", "yellow", "white"]; // Declare array for colors used in the game
let secretCode = []; // Declare empty array for secret code
let breakerCode = []; // Declare empty array for code breaking
let breakerCodeRowCounter = 10; // Declare variable to start count at row 10
let breakerCodeColorCounter = 1;
let checkResultCounter = 10; // Declare counter for checking results
let redHint = 0; // Declare variable for the number of red hints
let whiteHint = 0; // Declare variable for the number of white hints
let hintPegCounter = 0; // Declare variable for coloring of hint pegs
let startPlay = false;
let solved = false;

// For loop to generate random colors of the secret code
for (let i = 1; i <= 4; i++) {
    const $divSecretCode = $('<div>');
    $('.secret-code-row').append($divSecretCode);
    $divSecretCode.addClass(`secret-code ${i}`);
};

// Generate secret code
const render = () => {
    $('#start').text('Game in progress');
    $('.secret-code').css('background', 'grey');
    for (let i = 0; secretCode.length < 4; i++) {
        let secretCodeColor = Math.floor(Math.random() * colorsArray.length);
        secretCode.push(colorsArray[secretCodeColor]);
    };
    $('.peg').css('background', 'grey');
    $('.hint-peg').css('background', 'grey');
    solved = false;
};

// For loop to generate color pegs for selection
for (let i = 0; i <= colorsArray.length; i++) {
    const $divColorPeg = $('.color-board').children().eq(i);
    $divColorPeg.css('background', colorsArray[i]);
};

// For loop to generate rows for code breaker and hints
for (let i = 1; i <= 10; i++) {
    const $divRow = $('<div>');
    const $divHint = $('<div>');
    
    $('.mastermind-board').append($divRow);
    $divRow.addClass(`mastermind-row ${i}`);
    for (let j = 1; j <= 4; j++) {
        let $divPeg = $('<div>');
        $divRow.append($divPeg);
        $divPeg.addClass('peg');
        $divPeg.attr('id', `r${i}p${j}`);
    };
    
    $divRow.append($divHint);
    $divHint.addClass(`hint-container ${i}`);
    for (let j = 1; j <= 4; j++) {
        let $divPeg = $('<div>');
        $divHint.append($divPeg);
        $divPeg.addClass('hint-peg');
        $divPeg.attr('id', `r${i}p${j}`);
    };
};

// Display secret code
const showSecretCode = () => {
    for (let i = 1; i <= secretCode.length; i++) {
        $(`.secret-code.${i}`).css('background-color', secretCode[i-1]);
    };
};

const checkResult = () => {
    if (secretCode[0] === breakerCode[0] && secretCode[1] === breakerCode[1] && secretCode[2] === breakerCode[2] && secretCode[3] === breakerCode[3]) {
        $('.result').text('SOLVED!').css('color', 'green');
        solved = true;
        for (let i = 0; i < secretCode.length; i++) {
            $(`.hint-peg#r${checkResultCounter}p${i+1}`).css('background-color', 'red');
        };
        showSecretCode();
        restart();
    } else {
        hint();
        for (let i = 0; i < redHint; i++) {
            $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'red');
            hintPegCounter++;
        }
        for (let i = 0; i < whiteHint && whiteHint + redHint  < 5; i++) {
            $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'white');
            hintPegCounter++;
        }
        if (breakerCodeRowCounter >= 1) {
            checkResultCounter % 2 === 1 ? $('.result').text('TRY AGAIN!').css('color', 'red') : $('.result').text('TRY AGAIN!').css('color', `#FFCAC8`);
            nextRow();
        } else {
            $('.result').text('COMPUTER WINS!').css('color', 'blue');
            solved = true;
            showSecretCode();
            restart();
        };
    };
};

const restart = () => {
    $('#start').text('CLICK TO RE-START');
    secretCode = [];
    breakerCode = [];
    redHint = 0;
    whiteHint = 0;
    hintPegCounter = 0;
    checkResultCounter = 10;
    startPlay = false;
    breakerCodeColorCounter = 1;
    breakerCodeRowCounter = 10;
}

// Function to count the number of correct red hints and white hints
const hint = () => {
    let secretCodeHint = secretCode.concat();
    let remainingCode = [];
    // For loop to check for number of red hints
    for (let i = 0; i < secretCodeHint.length; i++) {
        if (breakerCode[i] === secretCodeHint[i]) {
            redHint++;
            secretCodeHint.splice(i, 1, ""); // The secret codes that are guessed correctly will be removed from further comparison.
        } else {
            remainingCode.push(breakerCode[i]); // If the code does not match, it will be pushed to another array for checking of white hints.
        }
    };
    // For loop to check for number of white hints
    for (let i = 0; i < remainingCode.length; i++) {
        if (secretCodeHint.includes(remainingCode[i])) {
            whiteHint++;
            secretCodeHint.splice(secretCodeHint.indexOf(remainingCode[i]), 1, "");
        };
    }
};

const nextRow = () => {
    breakerCode = [];
    redHint = 0;
    whiteHint = 0;
    hintPegCounter = 0;
    checkResultCounter--;
}

$('#start').on('click', () => {
    startPlay = true;
    render();
    $('.result').text('');
});

$('.color-board-peg').on('click', (event) => {
    let colorPegClicked = event.currentTarget.id;
    if (startPlay) {
        if (breakerCodeRowCounter >= 1 && breakerCode.length < 4) { // if-else statement to indicate color selected on the breaker rows
            breakerCode.push(colorPegClicked);
            $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
            breakerCodeColorCounter++;
        }
    }
});

$('.submit').on('click', () => {
    if (!solved && breakerCode.length === 4) {
        breakerCodeRowCounter--;
        breakerCodeColorCounter = 1;
        checkResult();
    }
});

$('.reset').on('click', () => {
    if (!solved) {
        breakerCode = [];
        for (i = 1; i <= breakerCodeColorCounter; i++) {
            $(`#r${breakerCodeRowCounter}p${i}`).css('background', 'grey');
        };
        breakerCodeColorCounter = 1;
    }
});