
   // PLAYER FACTORY
// This function creates a player object.
// Each player has a name and a mark ("X" or "O").
   function Player(name, mark){
        return {
            name: name,
            mark: mark
        }
    }
    const player1 = Player("Sotiris", "X")
    const player2 = Player("Computer", "O");

// This function creates the game board and controls everything related to the board itself
const gameBoard = function () {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = function () {
        return board;
    }


// This function places a mark ("X" or "O") on the board
    // It checks first if the spot is empty
    const placeMark = (index, mark) => {
         // If the chosen position is empty
        if (board[index] === ""){ 
            board[index] = mark; //place the mark
            return true; //action successfull
        } 
        // If the spot is already taken
        return false;
    };
    
    //This function resets the board to start a new game
    const resetBoard = () => {
        // Loop through the board and empty all spots
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };
    // Return only the functions we want accessible outside
    return {
        getBoard,
        placeMark,
        resetBoard
    }
}

// CREATE AN INSTANCE OF THE GAMEBOARD
// Now we actually run the gameBoard function and store its returned object
const board = gameBoard();

// GAME CONTROLLER MODULE
// This module controls the game flow (turns, win checking, tie checking)
const GameController = (function() {
    // The game starts with player1
    let currentPlayer = player1;
    

    // SWITCH PLAYER FUNCTION
    // This changes the turn after each valid move
    const switchPlayer = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };
// ALL POSSIBLE WINNING COMBINATIONS
    // Each array represents three board positions that form a win
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // CHECK WINNER FUNCTION
    // Looks at the board and checks if someone has 3 in a row
    const checkWinner = function() {
         // Get the current board
        const b = board.getBoard();
        // Loop through every winning combination
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, bIndex, c] = winningCombos[i];
            // If all three positions match and are not empty
            if (b[a] !== "" && b[a] === b[bIndex] && b[a] === b[c]) {
                return true;
            }
        }
        return false;
    };
        // CHECK TIE FUNCTION
    // A tie happens if the board is full and nobody won
    const checkTie = function() {
        const b = board.getBoard();
        // Check if any spot is still empty
        for (let i = 0; i < b.length; i++) {
            if (b[i] === "") return false;
        }
        // If no empty spots remain, it's a tie
        return true;
    };

      // PLAY ROUND FUNCTION
    // This runs one move of the game
    const playRound = function(index) {
         // Try to place the current player's mark on the board
        const success = board.placeMark(index, currentPlayer.mark);
        if (!success) {
            return;
        }

        //update board display
        displayController.render();

        // Check if the current player won
        if (checkWinner()) {
            displayController.showResult(currentPlayer.name + " wins!");
            return; // game over
        }

         // Check if the board is full (tie)
        if (checkTie()) {
            displayController.showResult("It's a tie!");
            return; // game over
        }

        // If the game is not over, switch to the next player
        switchPlayer();
    };
    // Expose only the playRound function outside the module
    return { playRound };
})();


// DISPLAY CONTROLLER
// Handles everything related to the webpage display
const displayController = (function () {

    // Get all board cells from the HTML
    const cells = document.querySelectorAll(".cell");

     // Get result display element
    const resultDisplay = document.querySelector("#result");

    // RENDER FUNCTION
    // Updates the webpage so it matches the board array
    const render = function () {

        const boardArray = board.getBoard();

        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = boardArray[i];
        }
    };

     // SHOW RESULT FUNCTION
    const showResult = function(message){
        resultDisplay.textContent = message;
    };

     // ADD CLICK EVENTS TO CELLS
    const addCellListeners = function () {
        cells.forEach((cell) => {
            cell.addEventListener("click", function () {
                const index = Number(cell.dataset.index);
                GameController.playRound(index);
                render();
            });
        });
    };

    // Expose functions
    return {
        render,
        addCellListeners,
        showResult
    };

})();


displayController.render();


//get result display element
const resultDisplay = document.querySelector("#result");



    // GET UI ELEMENTS
const startBtn = document.querySelector("#startBtn");
const player1Input = document.querySelector("#player1Name");
const player2Input = document.querySelector("#player2Name");

// START / RESTART GAME
startBtn.addEventListener("click", function () {
    // update player names
    if (player1Input.value !== "") player1.name = player1Input.value;
    if (player2Input.value !== "") player2.name = player2Input.value;

    // reset board
    board.resetBoard();

    // clear result
    displayController.showResult("");

    // redraw board
    displayController.render();
});

displayController.addCellListeners();