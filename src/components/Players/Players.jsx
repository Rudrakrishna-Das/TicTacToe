import Classes from "./Players.module.css";
import { useState } from "react";

const Players = ({ name, symbol, playerActive, onNameChange }) => {
  const [changePlayerName, setChangePlayerName] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const handlePlayerName = () => {
    setChangePlayerName((prevState) => !prevState);
    if (chnagedPlayerName) {
      onNameChange(symbol, playerName);
    }
  };

  const chnagedPlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <div className={`${playerActive ? Classes.active : ""} ${Classes.player}`}>
      <input
        disabled={!changePlayerName}
        onChange={chnagedPlayerName}
        type="text"
        value={playerName}
      />
      <p>{symbol}</p>
      <button className={Classes.btn} onClick={handlePlayerName}>
        {changePlayerName ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Players;
