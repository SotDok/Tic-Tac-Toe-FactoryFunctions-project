
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
    console.log(`${player1.name} has chosen "${player1.mark}" as his mark`)
    const player2 = Player("Computer", "O");
    console.log(`${player2.name} has chosen "${player2.mark}" as his mark`)

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
console.log(board.getBoard());
// Place an "X" in position 0 to test the board
board.placeMark(0, "X");
console.log(board.getBoard());

// GAME CONTROLLER MODULE
// This module controls the game flow (turns, win checking, tie checking)
const GameController = (function() {
    // The game starts with player1
    let currentPlayer = player1;
    // Store players in an array for convenience
    const players = [player1, player2];

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
            // If the move was invalid (spot already taken)
            console.log("Spot already taken!");
            return;
        }

        console.log(board.getBoard());

        // Check if the current player won
        if (checkWinner()) {
            console.log(currentPlayer.name + " wins!");
            return; // game over
        }

         // Check if the board is full (tie)
        if (checkTie()) {
            console.log("It's a tie!");
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

    // RENDER FUNCTION
    // Updates the webpage so it matches the board array
    const render = function () {

        const boardArray = board.getBoard();

        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = boardArray[i];
        }
    };

    // ADD CLICK EVENTS TO CELLS
    // This allows players to click the board
    const addCellListeners = function () {

        cells.forEach((cell, index) => {

            cell.addEventListener("click", function () {

                // Run the game logic
                GameController.playRound(index);

                // Re-render board after move
                render();

            });

        });

    };

    return {
        render,
        addCellListeners
    };

})();



displayController.render();


const addCellListeners = function () {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", function () {
            GameController.playRound(index);
            render;
        });
    });
};

displayController.render();
displayController.addCellListeners();