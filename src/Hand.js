import React from "react";
import Card from "./Card";
import "./hand.css";

function Hand({ player, isDealersTurn }) {
  const isDealer = player.name === "Dealer";
  return (
    <div className="Hand">
      {player.hand.map((card, index) => {
        return (
          <Card
            faceDown={isDealer && !isDealersTurn && index > 0}
            suit={card.suit}
            value={card.value}
            key={`${card.suit}-${card.value}`}
          />
        );
      })}
    </div>
  );
}

export default Hand;
