import React from "react";
import Card from "./Card";

function Hand({ player, isDealersTurn, dealer }) {
  return (
    <div className="Hand">
      {player.hand.map((card, index) => {
        return (
          <Card
            faceDown={dealer && !isDealersTurn && index > 0}
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
