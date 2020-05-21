class Board {
    private board: string[][];

    constructor() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    // Displays the game board with numerical labels
    public display(): void {
        this.printTopLabels();
        this.printRowsWithSideLabels();
    }

    // Finds a potential winner in the rows
    // Stops any iteration if the first mark of a row is empty
    // or if there's a mismatch in the middle of the search
    public findWinnerInRows(): string {
        let foundWinner = false;
        for (let row = 0; row < this.board.length; row++) {
            const firstMark: string = this.board[row][0];
            if (firstMark === "") {
                continue;
            }
            for (let column = 1; column < this.board[row].length; column++) {
                if (firstMark !== this.board[row][column]) {
                    foundWinner = false;
                    break;
                }
                foundWinner = true;
            }
            if (foundWinner) {
                return firstMark;
            }
        }
        return "none";
    }

    // Finds a potential winner in the columns
    // Stops any iteration if the first mark of a column is empty
    // or if there's a mismatch in the middle of the search
    public findWinnerInColumns(): string {
        let foundWinner = false;
        for (let column = 0; column < this.board[0].length; column++) {
            const firstMark: string = this.board[0][column];
            if (firstMark === "") {
                continue;
            }
            for (let row = 1; row < this.board.length; row++) {
                if (firstMark !== this.board[row][column]) {
                    foundWinner = false;
                    break;
                }
                foundWinner = true;
            }
            if (foundWinner) {
                return firstMark;
            }
        }
        return "none";
    }

    // Finds a potential winner in the diagonals
    public findWinnerInDiagonals(): string {
        const dirSE = [1, 1];
        const dirNE = [-1, 1];
        const topLeftCorner = [0, 0];
        const bottomLeftCorner = [this.board.length - 1, 0];

        let winner = this.checkDiagonals(topLeftCorner, dirSE);
        if (winner === "none") {
            winner = this.checkDiagonals(bottomLeftCorner, dirNE);
        }
        return winner;
    }

    // Returns true if the board is full, returns false if not
    public isBoardFull(): boolean {
        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[row].length; column++) {
                if (this.board[row][column] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    // Checks to see if the move is a valid move:
    //  Checks if coordinate is valid and if the the coordinate is not taken
    public isValidMove(row: number, col: number): boolean {
        return this.isValidCoordinate(row, col) && this.board[row][col] == "";
    }

    // Updates the board with a given move and based on who's turn it is
    public update(row: number, column: number, isPlayerOne: boolean): void {
        if (isPlayerOne) {
            this.board[row][column] = "X";
        } else {
            this.board[row][column] = "O";
        }
    }

    // Helper function to check each diagonal. Takes a corner and a direction of 
    // the diagonal
    // Stops any iteration if the first mark of a diagonal is empty
    // or if there's a mismatch in the middle of the search
    private checkDiagonals(corner: number[], direction: number[]): string {
        const firstMark = this.board[corner[0]][corner[1]];
        let currPoint = corner;
        let foundWinner = true;
        if (firstMark !== "") {
            while (this.isValidCoordinate(currPoint[0], currPoint[1])) {
                if (firstMark !== this.board[currPoint[0]][currPoint[1]]) {
                    foundWinner = false;
                    break;
                }
                currPoint = currPoint.map((num, index) => {
                    return num + direction[index]
                })
            }
            if (foundWinner) {
                return firstMark;
            }
        }
        return "none";
    }

    // Helper function that checks if a move is a valid coordinate 
    // in the game board
    private isValidCoordinate(row: number, col: number): boolean {
        return row >= 0 && col >= 0 && 
            row < this.board.length && col < this.board.length
    }

    // Helper function that prints the top label of the board
    private printTopLabels(): void {
        let topLabel: string = "   "; // to account for side labels
        for (let col = 0; col < this.board[0].length; col++) {
            topLabel += " " + col;
        }
        console.log(topLabel);
    }

    // Helper function that prints the rows of the boards with the
    // numerical side labels
    private printRowsWithSideLabels(): void {
        for (let row = 0; row < this.board.length; row++) {
            let printRow: string = row + " |"
            for (let col = 0; col < this.board[0].length; col++) {
                let mark = this.board[row][col];
                if (mark == "") {
                    printRow += " -";
                } else {
                    printRow += " " + mark;
                }
            }
            console.log(printRow);
        }
    }
}

export default Board;