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

  const player1 = createPlayer("X");
  const player2 = createPlayer("O");

  let currentPlayer = Math.random() < 0.5 ? player1 : player2;
  let nextPlayer = currentPlayer == player1 ? player2 : player1;

  const playerLabel = document.querySelector(".name");
  playerLabel.textContent = currentPlayer.getSymbol();

  const processTurn = () => {
    const playerMove = currentPlayer.getPosition();
    board[playerMove[0]][playerMove[1]] = currentPlayer.getSymbol();
    [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];
    playerLabel.textContent = currentPlayer.getSymbol();
  };

  const container = document.querySelector(".board");
  const renderBoard = () => {
    for (let i = 0; i < board[0].length * board.length; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = i;
      tile.addEventListener("click", () => {
        currentPlayer.setPosition(tile.id);
        tile.textContent = currentPlayer.getSymbol();
        processTurn();
      });
      container.appendChild(tile);
    }
  };
  const winCheck = () => {
    // TODO: make win checker
    true;
  };
  return { renderBoard, winCheck };
})();

gameBoard.renderBoard();
