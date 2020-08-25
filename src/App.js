import React, { useReducer, useEffect } from "react";
import "./App.css";
import Hand from "./Hand";
import startGame, { gameReducer } from "./Game";

// Todo
// [ ]  stand game state
// [ ]  React UI tests

function App() {
  const [state, dispatch] = useReducer(gameReducer, startGame());

  useEffect(() => {
    dispatch({ type: "checkScore" });
  }, [state.player.score]);

  const isGameOver =
    state.gameState === "WIN" ||
    state.gameState === "LOSE" ||
    state.gameState === "DRAW";

  const hasGameStarted = state.gameState !== "PREDEAL";

  if (!hasGameStarted) {
    return (
      <div className="App">
        <button onClick={() => dispatch({ type: "initialDeal" })}>
          start game
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Hand player={state.dealer} dealer />
      <p>Dealer's Hand:</p>
      <Hand player={state.player} />
      <p>Your score: {state.player.score}</p>

      {!isGameOver && hasGameStarted && (
        <>
          <button onClick={() => dispatch({ type: "dealPlayerCard" })}>
            Hit me
          </button>
        </>
      )}

      {hasGameStarted && !isGameOver && (
        <button onClick={() => dispatch({ type: "stand" })}>stand</button>
      )}
      {state.gameState === "WIN" && <p>you have won </p>}
      {state.gameState === "LOSE" && <p>you have lost </p>}
      {state.gameState === "DRAW" && <p>this has been a job</p>}
      {isGameOver && (
        <button onClick={() => dispatch({ type: "startNewGame" })}>
          Play again
        </button>
      )}
    </div>
  );
}

export default App;
