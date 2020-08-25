import React from "react";
import { spritesheet } from "./Sprite";

function Card({ value, suit, faceDown }) {
  const { position } = spritesheet.find(
    (sprite) => sprite.name === `${suit}${value}`
  );

  if (faceDown) {
    return <div className="face-down-card"></div>;
  }

  return (
    <div
      className="card"
      style={{ backgroundPosition: `-${position.x}px -${position.y}px` }}
    >
      <div className="visibility-hidden">{`${value} ${suit}`}</div>
    </div>
  );
}

export default Card;
