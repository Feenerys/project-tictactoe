function createPlayer(_symbol) {
  const symbol = _symbol;
  let position = "";

  const getSymbol = () => symbol;

  const getPosition = () => [Math.floor(position / 3), position % 3];
  const newPosition = () => {
    position = prompt("Enter position on board (0-8)", "0");
    return [Math.floor(position / 3), position % 3];
  };

  return { getSymbol, getPosition, newPosition };
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

  function instruction(symbol, move) {
    this.symbol = symbol;
    this.move = move;
  }

  const gameLogic = () => {
    currentPlayer.newPosition();
    const playerMove = new instruction(
      currentPlayer.getSymbol(),
      currentPlayer.getPosition()
    );

    [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];

    return playerMove;
  };

  const renderBoard = () => {
    alert(board);
    playerMove = gameLogic();
    board[playerMove.move[0]][playerMove.move[1]] = playerMove.symbol;
  };

  const winCheck = () => true;
  return { renderBoard, winCheck, };
})();

while (true) {
  gameBoard.renderBoard();
}

