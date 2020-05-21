"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicTacToe_1 = __importDefault(require("./TicTacToe"));
// Play a new game of TicTacToe!
function playTicTacToe() {
    let game = new TicTacToe_1.default();
    do {
        game.startNewGame();
        while (game.getWinner() === "none") {
            game.displayBoard();
            const move = game.getInputMove();
            game.updateBoard(move);
            game.changePlayer();
        }
        game.displayBoard();
        console.log("Winner:", game.getWinner());
        game.updateScores();
        game.displayScores();
    } while (game.askToKeepPlaying() === "yes");
}
// Run's the app
playTicTacToe();
