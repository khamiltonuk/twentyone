import React, { useReducer, useEffect } from "react";
import "./App.css";
import Hand from "./Hand";
import startGame, { gameReducer } from "./Game";

function App() {
  const [state, dispatch] = useReducer(gameReducer, startGame());

  useEffect(() => {
    dispatch({ type: "checkScore" });
  }, [state.player.score, state.dealer.score]);

  const isGameOver =
    state.gameState === "WIN" ||
    state.gameState === "LOSE" ||
    state.gameState === "DRAW";

  const hasGameStarted = state.gameState !== "PREDEAL";

  if (!hasGameStarted) {
    return (
      <div className="App">
        <button onClick={() => dispatch({ type: "initialDeal" })}>
          Start game
        </button>
      </div>
    );
  }

  const showCards = state.gameState === "DEALERS_TURN" || isGameOver;

  return (
    <div className="App">
      <p>Dealer's Hand:</p>
      {showCards && <p>Dealer score: {state.dealer.score}</p>}
      <Hand player={state.dealer} isDealersTurn={showCards} />

      <Hand player={state.player} />
      <p>Your score: {state.player.score}</p>

      {!showCards && (
        <>
          <button onClick={() => dispatch({ type: "dealPlayerCard" })}>
            Hit me
          </button>
          <button onClick={() => dispatch({ type: "stand" })}>stand</button>
        </>
      )}
      {state.gameState === "WIN" && <p>You have won </p>}
      {state.gameState === "LOSE" && <p>You have lost </p>}
      {state.gameState === "DRAW" && <p>It is a draw</p>}
      {isGameOver && (
        <button onClick={() => dispatch({ type: "startNewGame" })}>
          Play again
        </button>
      )}
    </div>
  );
}

export default App;
