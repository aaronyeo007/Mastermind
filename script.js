const colorsArray = ["black", "blue", "green", "red", "yellow", "white"]; // Declare array for colors used in the game
let secretCode = []; // Declare empty array for secret code
let breakerCode = []; // Declare empty array for code breaking
let checkResultCounter = 10; // Declare counter for checking results
const $buttonStart = $('#start'); // Select button for start of game
let startPlay = false; // Declare variable startPlay as false before $buttonStart is pressed
let breakerCodeRowCounter = 10; // Declare variable to start count at row 10
let redHint = 0; // Declare variable for the number of red hints
let whiteHint = 0; // Declare variable for the number of white hints
let hintPegCounter = 0; // Declare variable for coloring of hint pegs
let restartCounter = 0; // Declare variable for restarting game

$(() => {
    
    const render = () => { // Generate secret code at start of game
        $('.secret-code').css('background', 'grey');
        startPlay = true; // Assign true to variable at start of play
        for (let i = 0; i < 4; i++) { // For loop to generate secret code
            let secretCodeColor = Math.floor(Math.random() * colorsArray.length);
            secretCode.push(colorsArray[secretCodeColor]);
            i === 3 ? console.log('secretCode ', secretCode) : 0;
        };
        $('.peg').css('background', 'grey');
        $('.hint-peg').css('background', 'grey');
    };
    
    const selectPeg = () => { // Declare function when code breaker selects peg to be colored
        let breakerCodeColorCounter = 1;
        $('.color-board-peg').css('pointer-events', 'auto');
        $('.color-board-peg').on('click', (event) => {
            console.log('event.currentTarget', event.currentTarget);
            event.stopPropagation();
            let colorPegClicked = event.currentTarget.id;
            breakerCode.push(colorPegClicked);

            if (breakerCodeRowCounter === 10 && breakerCodeColorCounter < 5) { // if-else statement to indicate color selected on the breaker rows
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 9 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 8 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 7 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 6 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 5 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 4 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 3 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 2 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
                if (breakerCodeColorCounter === 5) {
                    breakerCodeRowCounter--;
                    breakerCodeColorCounter = 1;
                };
            } else if (breakerCodeRowCounter === 1 && breakerCodeColorCounter < 5) {
                $(`#r${breakerCodeRowCounter}p${breakerCodeColorCounter}`).css('background', colorPegClicked);
                breakerCodeColorCounter++;
            }

            if (breakerCode.length === 4 && checkResultCounter === 10) { // if-else statements to compare results of each rows with secretCode
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 9) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 8) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 7) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 6) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 5) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 4) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 3) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 2) {
                checkResult();
            } else if (breakerCode.length === 4 && checkResultCounter === 1) {
                checkResult();
            };
        })
    }
    
    const checkResult = () => { // Function to compare breakerCode and secretCode
        if (secretCode[0] === breakerCode[0] && secretCode[1] === breakerCode[1] && secretCode[2] === breakerCode[2] && secretCode[3] === breakerCode[3]) {
            console.log('Solved!');
            $('.result').text('SOLVED!').css('color', 'green');
            for (let i = 0; i < secretCode.length; i++) {
                $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'red');
                hintPegCounter++;
            }
            for (let i = 1; i <= secretCode.length; i++) {
                $(`.secret-code.${i}`).css('background-color', secretCode[i-1]);
            }
            restart();
        } else if (checkResultCounter === 1) {
            console.log('Computer Wins!');
            $('.result').text('COMPUTER WINS!').css('color', 'blue');
            hint();
            for (let i = 0; i < redHint; i++) {
                $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'red');
                hintPegCounter++;
            }
            for (let i = 0; i < whiteHint && whiteHint + redHint  < 5; i++) {
                $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'white');
                hintPegCounter++;
            }
            for (let i = 1; i <= secretCode.length; i++) {
                $(`.secret-code.${i}`).css('background-color', secretCode[i-1]);
            }
            restart();
        } else {
            console.log('Try again!');
            checkResultCounter % 2 === 1 ? $('.result').text('TRY AGAIN!').css('color', 'red') : $('.result').text('TRY AGAIN!').css('color', 'brown');
            hint();
            for (let i = 0; i < redHint; i++) {
                $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'red');
                hintPegCounter++;
            }
            for (let i = 0; i < whiteHint && whiteHint + redHint  < 5; i++) {
                $(`.hint-peg#r${checkResultCounter}p${hintPegCounter+1}`).css('background-color', 'white');
                hintPegCounter++;
            }
            breakerCode = [];
            redHint = 0;
            whiteHint = 0;
            hintPegCounter = 0;
            checkResultCounter--;
        }
    }
    
    const restart = () => {
        $('#start').text('CLICK TO RE-START').css('pointer-events', 'auto');
        $('.color-board-peg').css('pointer-events', 'none');
        secretCode = [];
        breakerCode = [];
        redHint = 0;
        whiteHint = 0;
        hintPegCounter = 0;
        breakerCodeRowCounter = 10;
        checkResultCounter = 10;
        restartCounter = 1;
        startPlay = false;
        $('.color-board-peg').unbind('click');
    }

    const hint = () => { // Function to count the number of correct red hints and white hints
        let secretCodeHint = secretCode.concat();
        let remainingCode = [];
        
        for (let i = 0; i < secretCodeHint.length; i++) { // For loop to check for number of red hints
            if (breakerCode[i] === secretCodeHint[i]) {
                redHint++;
                secretCodeHint.splice(i, 1, ""); // The secret codes that are guessed correctly will be removed from further comparison.
            } else {
                remainingCode.push(breakerCode[i]); // If the code does not match, it will be pushed to another array for checking of white hints.
            }
        };
        for (let i = 0; i < remainingCode.length; i++) {
            if (secretCodeHint.includes(remainingCode[i])) {
                whiteHint++;
                secretCodeHint.splice(secretCodeHint.indexOf(remainingCode[i]), 1, "");
            };
        }
    };
    
    for (let i = 1; i <= 4; i++) { // For loop to generate random colors of the secret code
        const $divSecretCode = $('<div>');
        $('.secret-code-row').append($divSecretCode);
        $divSecretCode.addClass(`secret-code ${i}`);
    };

    for (let i = 1; i <= 10; i++) { // For loop to generate rows for code breaker and hints
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
        $divHint.addClass(`hint-container ${i}`)
        for (let j = 1; j <= 4; j++) {
            let $divPeg = $('<div>');
            $divHint.append($divPeg);
            $divPeg.addClass('hint-peg');
            $divPeg.attr('id', `r${i}p${j}`);
        };
    };

    for (let i = 0; i <= colorsArray.length; i++) { // For loop to generate color pegs for selection
        const $divColorPeg = $('.color-board').children().eq(i);
        $divColorPeg.css('background', colorsArray[i]);
    };

    $buttonStart.on('click', (event) => {
        $('#start').css('pointer-events', 'none');
        render();
        if (startPlay) {
            selectPeg();
        } else {
            alert('Error');
        }
        if (restartCounter) {
            $('.result').text('NEW ROUND!').css('color', 'black');
            restartCounter = 0;
        }
    });
});