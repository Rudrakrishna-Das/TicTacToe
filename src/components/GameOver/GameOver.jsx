import Classes from "./GameOver.module.css";
const GameOver = ({ winner, onGameOver }) => {
  return (
    <div className={Classes.game_over}>
      <h2>Game Over!</h2>
      {winner && <p>{winner} Won</p>}
      {!winner && <p>It's a Draw!</p>}
      <button onClick={onGameOver}>Rematch</button>
    </div>
  );
};
export default GameOver;
