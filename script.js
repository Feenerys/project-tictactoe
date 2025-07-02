const gameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const gameLogic = (player1, player2) => {};

  const renderBoard = (player1, player2) => {};

  return { renderBoard };
})();

function createPlayer(symbol) {
  const symbol = symbol;
  let position = "";

  const getSymbol = () => symbol;

  const getPosition = () => position;
  const newPosition = () => {
    position = prompt("Enter position on board (0-8)", "0");
  };

  return { getSymbol, getPosition, newPosition };
}

const player1 = createPlayer("X");
const player2 = createPlayer("O");
