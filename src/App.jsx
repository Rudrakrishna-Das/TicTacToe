import Classes from "./App.module.css";
import Players from "/components/Players/Players";
import GameBoard from "/components/Game/GameBoard";
import { useState } from "react";
import Logs from "/components/Logs/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "/components/GameOver/GameOver";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const derivedActivePlayer = (gameTurns) => {
  let curActivePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    curActivePlayer = "O";
  }
  return curActivePlayer;
};

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...board.map((b) => [...b])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquarSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquarSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquarSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquarSymbol &&
      firstSquarSymbol === secondSquarSymbol &&
      firstSquarSymbol === thirdSquarSymbol
    ) {
      winner = firstSquarSymbol;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  const activePlayer = derivedActivePlayer(gameTurns);

  const handleActive = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const curActivePlayer = derivedActivePlayer(prevTurns);

      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: curActivePlayer },
        ...prevTurns,
      ];
      return updatedGameTurn;
    });
  };
  const handleGameOver = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerName((prevNames) => {
      const newNames = { ...prevNames, [symbol]: newName };
      return newNames;
    });
  };
  return (
    <main>
      <section>
        <div className={Classes.game}>
          <section className={Classes.players}>
            <Players
              name="Player 1"
              symbol="X"
              playerActive={activePlayer === "X"}
              onNameChange={handlePlayerNameChange}
            />
            <Players
              name="Player 2"
              symbol="O"
              playerActive={activePlayer === "O"}
              onNameChange={handlePlayerNameChange}
            />
          </section>

          <GameBoard
            gameBoard={gameBoard}
            curSymbol={activePlayer}
            onSelect={handleActive}
          />
          {(winner || hasDraw) && (
            <GameOver winner={playerName[winner]} onGameOver={handleGameOver} />
          )}
        </div>
        <Logs turns={gameTurns} />
      </section>
    </main>
  );
}

export default App;
