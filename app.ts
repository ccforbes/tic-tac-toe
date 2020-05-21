import TicTacToe from './TicTacToe';

// Play a new game of TicTacToe!
function playTicTacToe() {
    let game: TicTacToe = new TicTacToe();
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