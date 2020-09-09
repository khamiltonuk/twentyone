import React from "react";
import { spritesheet } from "./Sprite";
import "./card.css";

function Card({ value, suit, faceDown, ref }) {
  const { position } = spritesheet.find(
    (sprite) => sprite.name === `${suit}${value}`
  );

  return (
    <div className="card-container">
      <div className={`card${faceDown ? " is-flipped" : ""}`}>
        <div
          className="card__face card__face--front"
          ref={ref}
          style={{ backgroundPosition: `-${position.x}px -${position.y}px` }}
        >
          <div className="visibility-hidden">{`${value} ${suit}`}</div>
        </div>
        <div className=" card__face card__face--back"></div>
      </div>
    </div>
  );
}

export default Card;
