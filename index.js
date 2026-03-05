
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


const gameBoard = function () {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = function () {
        return board;
    }



    const placeMark = (index, mark) => {
        if (board[index] === ""){
            board[index] = mark;
            return true;
        } 
        return false;
    };

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };

    return {
        getBoard,
        placeMark,
        resetBoard
    }
}


const board = gameBoard();
console.log(board.getBoard());
board.placeMark(0, "X");
console.log(board.getBoard());

const GameController = (function() {
    let currentPlayer = player1;
    const players = [player1, player2];

    const switchPlayer = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };

    const playRound = function(index) {
        const success = board.placeMark(index, currentPlayer.mark);
        if (!success) {
            console.log("Spot already taken!");
            return;
        }
        console.log(board.getBoard());
        switchPlayer();
    };

    return {
        playRound
    };
})();

