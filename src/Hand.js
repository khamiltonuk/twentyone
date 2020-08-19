import React from "react";
import Card from "./Card";

function Hand({ player, dealer = false }) {
  return (
    <div style={{ display: "flex" }}>
      {player.hand.map((card, index) => {
        return (
          <Card
            faceDown={dealer && index > 0}
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
