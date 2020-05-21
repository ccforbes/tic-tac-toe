"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./Board"));
const readlineSync = __importStar(require("readline-sync"));
class TicTacToe {
    constructor() {
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.board = new Board_1.default();
        this.isPlayerOne = true;
        this.winner = "none";
    }
    // Asks the players if they want to keep playing
    askToKeepPlaying() {
        let keepPlaying = readlineSync.question("Keep playing? (yes/no) ");
        keepPlaying = keepPlaying.toLowerCase();
        while (keepPlaying !== "yes" && keepPlaying !== "no") {
            keepPlaying = readlineSync.question("Invalid answer. Keep playing? (yes/no) ");
            keepPlaying = keepPlaying.toLowerCase();
        }
        return keepPlaying;
    }
    // Changes player
    changePlayer() {
        this.isPlayerOne = !this.isPlayerOne;
    }
    // Returns the current player, for prompting use
    currentPlayer() {
        if (this.isPlayerOne) {
            return "X";
        }
        else {
            return "O";
        }
    }
    // Displays the TicTacToe Board
    displayBoard() {
        this.board.display();
    }
    // Displays the scores of each player
    displayScores() {
        console.log("Player X: ", this.playerOneScore);
        console.log("Player O: ", this.playerTwoScore);
    }
    // Get's the winner of the game, or if there is a "Draw!"
    // or if there is "none" Checks all possible rows, columns,
    // and diagonals
    getWinner() {
        if (this.board.isBoardFull()) {
            return "Draw!";
        }
        let winner = this.board.findWinnerInRows();
        if (winner === "none") {
            winner = this.board.findWinnerInColumns();
        }
        if (winner === "none") {
            winner = this.board.findWinnerInDiagonals();
        }
        this.winner = winner;
        return winner;
    }
    // Gets the input move from a user. Will keep prompting until an 
    // input is valid and converts from string to numbers when valid
    getInputMove() {
        console.log("Player " + this.currentPlayer() + ", pick a spot: ");
        let move = readlineSync.question("(row, column): ");
        while (!this.isValidMove(move)) {
            move = readlineSync.question("Invalid move. Pick a square: ");
        }
        return this.convertInputCoordinates(move);
    }
    // starts a new game: clean board, no winner
    startNewGame() {
        this.board = new Board_1.default();
        this.winner = "none";
    }
    // Updates the board based on the given move
    updateBoard(move) {
        this.board.update(move[0], move[1], this.isPlayerOne);
    }
    // Updates the score of winner
    updateScores() {
        if (this.winner == "X") {
            this.playerOneScore++;
        }
        else {
            this.playerTwoScore++;
        }
    }
    // Helper function to convert string input to numbers.
    convertInputCoordinates(input) {
        let numCoordinates = [];
        let stringCoordinates = input.split(",");
        for (let i in stringCoordinates) {
            let coordinate = stringCoordinates[i].trim();
            numCoordinates[i] = +coordinate;
        }
        return numCoordinates;
    }
    // Helper function to check if an input is valid
    isValidMove(move) {
        if (!move.includes(",")) {
            return false;
        }
        let coord = this.convertInputCoordinates(move);
        if (!this.board.isValidMove(coord[0], coord[1])) {
            return false;
        }
        return true;
    }
}
exports.default = TicTacToe;
