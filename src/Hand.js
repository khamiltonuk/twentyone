import React, { useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import Card from "./Card";
import "./hand.css";

function Hand({ player, isDealersTurn }) {
  const isDealer = player.name === "Dealer";
  const usersDomNodes = [];

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(usersDomNodes, {
      duration: 0.3,
      stagger: 0.05,
      y: 0,
      autoAlpha: 1,
    }).play();
  }, [usersDomNodes]);

  return (
    <div className="Hand">
      {player.hand.map((card, index) => {
        return (
          <Card
            faceDown={isDealer && !isDealersTurn && index > 0}
            suit={card.suit}
            ref={(e) => (usersDomNodes[index] = e)}
            value={card.value}
            key={`${card.suit}-${card.value}`}
          />
        );
      })}
    </div>
  );
}

export default forwardRef(Hand);
