class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }

  get symbol() {
    return this._symbol;
  }

  set symbol(value) {
    this._symbol = value;
  }

  get position() {
    return [Math.floor(this._position / 3), this._position % 3];
  }

  set position(value) {
    this._position = value;
  }
}

class GameLogic {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  constructor(player1, player2) {
    this.player1 = new Player("X");
    this.player2 = new Player("O");
    this.totalMove = 0;
    this.currentPlayer = Math.random() < 0.5 ? player1 : player2;
    this.nextPlayer = this.currentPlayer == player1 ? player2 : player1;
  }

  processTurn() {
    const playerMove = this.currentPlayer.position;
    this.totalMoves += 1;
    this.board[playerMove[0]][playerMove[1]] = this.currentPlayer.symbol;
  }

  nextTurn() {
    [this.currentPlayer, this.nextPlayer] = [
      this.nextPlayer,
      this.currentPlayer,
    ];
    return this.currentPlayer.symbol;
  }

  winCheck = (position) => {
    // given a position, check if there is a win
    const directions = [
      [1, 0], // up
      [1, 1], // up right
      [0, 1], // right
      [-1, 1], // down right
      [-1, 0], // down
      [-1, -1], // down left
      [0, -1], // left
      [1, -1], // up left
    ];

    const [a, b] = position;

    const inBounds = (x, y) =>
      x >= 0 && y >= 0 && x < this.board.length && y < this.board[0].length;

    for (let dir of directions) {
      const x1 = a + dir[0];
      const y1 = b + dir[1];
      const x2 = a + dir[0] * 2;
      const y2 = b + dir[1] * 2;
      const x3 = a - dir[0]; // to check the opposite direction for middle input wins
      const y3 = b - dir[1];

      if (inBounds(x1, y1) && this.board[a][b] === this.board[x1][y1]) {
        if (inBounds(x2, y2) && this.board[a][b] === this.board[x2][y2]) {
          return true;
        } else if (
          inBounds(x3, y3) &&
          this.board[a][b] === this.board[x3][y3]
        ) {
          return true;
        }
      }
    }

    return false;
  };

  resetGame() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = "";
      }
    }
    this.totalMoves = 0;
  }
}

class GameBoard {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
    this.playerLabel = document.querySelector(".name");
    this.container = document.querySelector(".container");
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", () => this.resetBoard());
  }

  renderBoard() {
    const displayBoard = document.createElement("div");
    displayBoard.className = "board";
    this.container.appendChild(displayBoard);

    this.playerLabel.textContent = this.gameLogic.currentPlayer.symbol;
    for (
      let i = 0;
      i < this.gameLogic.board[0].length * this.gameLogic.board.length;
      i++
    ) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = i;
      tile.addEventListener("click", () => {
        if (tile.textContent == "") {
          this.gameLogic.currentPlayer.position = tile.id;
          const move = this.gameLogic.currentPlayer.position;
          tile.textContent = this.gameLogic.currentPlayer.symbol;
          this.gameLogic.processTurn();
          if (this.gameLogic.winCheck(move)) {
            this.stopBoard();
            this.playerLabel.textContent =
              this.playerLabel.textContent + "\nWinner!";
          } else if (this.gameLogic.totalMoves == 9) {
            this.stopBoard();
            this.playerLabel.textContent =
              this.playerLabel.textContent + "\nDraw!";
          } else {
            this.playerLabel.textContent = this.gameLogic.nextTurn();;
          }
        }
      });
      displayBoard.appendChild(tile);
    }
  }

  resetBoard = () => {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.renderBoard();
    this.gameLogic.resetGame();
    this.container.style.pointerEvents = "";
  };

  stopBoard = () => {
    this.container.style.pointerEvents = "none";
  };
}

const player1 = new Player("X");
const player2 = new Player("O");

const newGame = new GameBoard(new GameLogic(player1, player2));
newGame.renderBoard();
