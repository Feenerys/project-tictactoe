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

  function instruction(symbol, move) {
    this.symbol = symbol;
    this.move = move;
  }

  const gameLogic = () => {
    const playerMove = new instruction(
      currentPlayer.getSymbol(),
      currentPlayer.getPosition()
    );

    [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];

    return playerMove;
  };

  const renderBoard = () => {
    const playerMove = gameLogic();
    
    board[playerMove.move[0]][playerMove.move[1]] = playerMove.symbol;
    // TODO: finish render board logic
    console.log(board);
  };

  const submitButton = document.querySelector(".submit");
  const inputBox = document.querySelector("#player-input");
  submitButton.addEventListener("click", () => {
    currentPlayer.setPosition(inputBox.value);
    renderBoard();
    playerLabel.textContent = currentPlayer.getSymbol();
  });

  const winCheck = () => true;
  return { renderBoard, winCheck };
})();

