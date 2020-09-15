import React, { useRef, useEffect } from "react";
import { TimelineLite, TweenMax, Power3 } from "gsap";
import "./Notification.css";

function getMessage(gameState) {
  if (gameState === "WIN") {
    return "You have won";
  }
  if (gameState === "LOSE") {
    return "You have lost";
  }
  if (gameState === "DRAW") {
    return "It is a draw";
  }
  return null;
}

function Notification({ gameState, startNewGame }) {
  let notification = useRef(null);
  let tl = new TimelineLite({ delay: 0.8 });

  useEffect(() => {
    const message = notification;

    //Remove initial flash
    TweenMax.to(notification, 0, { css: { visibility: "visible" } });

    //Images Animation
    tl.from(message, 0.2, { y: 1280, ease: Power3.easeOut }, "Start");
  }, [tl]);

  return (
    <div className="notification" ref={(el) => (notification = el)}>
      <p>{getMessage(gameState)}</p>
      <button onClick={() => startNewGame()}>Play again</button>
    </div>
  );
}

export default Notification;
