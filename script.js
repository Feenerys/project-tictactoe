function createPlayer(_symbol) {
  const symbol = _symbol;
  let position = "";

  const getSymbol = () => symbol;

  const getPosition = () => [Math.floor(position / 3), position % 3];
  const setPosition = (_position) => {
    position = _position;
  };

  return { getSymbol, getPosition, setPosition };
}

const gameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let totalMoves = 0;

  const player1 = createPlayer("X");
  const player2 = createPlayer("O");

  let currentPlayer = Math.random() < 0.5 ? player1 : player2;
  let nextPlayer = currentPlayer == player1 ? player2 : player1;

  const playerLabel = document.querySelector(".name");

  const processTurn = () => {
    const playerMove = currentPlayer.getPosition();
    board[playerMove[0]][playerMove[1]] = currentPlayer.getSymbol();
    totalMoves += 1;
  };

  const nextTurn = () => {
    [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];
    playerLabel.textContent = currentPlayer.getSymbol();
  };

  const container = document.querySelector(".container");
  const renderBoard = () => {
    const displayBoard = document.createElement("div");
    displayBoard.className = "board";
    container.appendChild(displayBoard);

    playerLabel.textContent = currentPlayer.getSymbol();
    for (let i = 0; i < board[0].length * board.length; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = i;
      tile.addEventListener("click", () => {
        if (tile.textContent == "") {
          currentPlayer.setPosition(tile.id);
          const move = currentPlayer.getPosition();
          tile.textContent = currentPlayer.getSymbol();
          processTurn();
          if (winCheck(move)) {
            stopGame();
            playerLabel.textContent = playerLabel.textContent + "\nWinner!";
          } else if (totalMoves == 9) {
            stopGame();
            playerLabel.textContent = playerLabel.textContent + "\nDraw!";
          } 
          else {
            nextTurn();
          }
        }
      });
      displayBoard.appendChild(tile);
    }
  };

  const winCheck = (position) => {
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
      x >= 0 && y >= 0 && x < board.length && y < board[0].length;

    for (let dir of directions) {
      const x1 = a + dir[0];
      const y1 = b + dir[1];
      const x2 = a + dir[0] * 2;
      const y2 = b + dir[1] * 2;
      const x3 = a - dir[0]; // to check the opposite direction for middle input wins
      const y3 = b - dir[1];

      if (inBounds(x1, y1) && board[a][b] === board[x1][y1]) {
        if (inBounds(x2, y2) && board[a][b] === board[x2][y2]) {
          return true;
        } else if (inBounds(x3,y3) && board[a][b] === board[x3][y3]) {
          return true;
        }
      }
    }

    return false;
  };

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", () => resetBoard());

  const resetBoard = () => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    renderBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
    container.style.pointerEvents = "";
    totalMoves = 0;
  };

  const stopGame = () => {
    container.style.pointerEvents = "none";
  };

  return { renderBoard };
})();

gameBoard.renderBoard();
