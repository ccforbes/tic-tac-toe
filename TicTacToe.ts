import Board from './Board';
import * as readlineSync from 'readline-sync';

class TicTacToe {
    private playerOneScore: number;
    private playerTwoScore: number;
    private board: Board;
    private isPlayerOne: boolean;
    private winner: string;
    
    constructor() {
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.board = new Board();
        this.isPlayerOne = true;
        this.winner = "none";
    }

    // Asks the players if they want to keep playing
    public askToKeepPlaying(): string {
        let keepPlaying = readlineSync.question("Keep playing? (yes/no) ");
        keepPlaying = keepPlaying.toLowerCase();
        while (keepPlaying !== "yes" && keepPlaying !== "no") {
            keepPlaying = readlineSync.question(
                "Invalid answer. Keep playing? (yes/no) "
            );
            keepPlaying = keepPlaying.toLowerCase();    
        }
        return keepPlaying;
    }
    
    // Changes player
    public changePlayer(): void {
        this.isPlayerOne = !this.isPlayerOne;
    }
    
    // Returns the current player, for prompting use
    public currentPlayer(): string {
        if (this.isPlayerOne) {
            return "X";
        } else {
            return "O";
        }
    }

    // Displays the TicTacToe Board
    public displayBoard(): void {
        this.board.display();
    }

    // Displays the scores of each player
    public displayScores(): void {
        console.log("Player X: ", this.playerOneScore);
        console.log("Player O: ", this.playerTwoScore);
    }

    // Get's the winner of the game, or if there is a "Draw!"
    // or if there is "none" Checks all possible rows, columns,
    // and diagonals
    public getWinner(): string {
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
    public getInputMove(): number[] {
        console.log("Player " + this.currentPlayer() + ", pick a spot: ");
        let move = readlineSync.question("(row, column): ");
        while (!this.isValidMove(move)) {
            move = readlineSync.question("Invalid move. Pick a square: ")
        }
        return this.convertInputCoordinates(move);
    }

    // starts a new game: clean board, no winner
    public startNewGame(): void {
        this.board = new Board();
        this.winner = "none";
    }

    // Updates the board based on the given move
    public updateBoard(move: number[]): void {
        this.board.update(move[0], move[1], this.isPlayerOne);
    }

    // Updates the score of winner
    public updateScores(): void {
        if (this.winner == "X") {
            this.playerOneScore++;
        } else {
            this.playerTwoScore++;
        }
    }

    // Helper function to convert string input to numbers.
    private convertInputCoordinates(input: string): number[] {
        let numCoordinates: number[] = [];
        let stringCoordinates: string[] = input.split(",");
        for (let i in stringCoordinates) {
            let coordinate = stringCoordinates[i].trim();
            numCoordinates[i] = +coordinate;
        }
        return numCoordinates;
    }

    // Helper function to check if an input is valid
    private isValidMove(move: string): boolean {
        if (!move.includes(",")) {
            return false;
        }
        let coord: number[] = this.convertInputCoordinates(move);
        if (!this.board.isValidMove(coord[0], coord[1])) {
            return false;
        }
        return true;
    }
}

export default TicTacToe;