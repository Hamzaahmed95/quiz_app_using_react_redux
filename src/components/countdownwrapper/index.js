import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountDownWrapper = props => {
  let seconds = 20;
  let counter = 100;

  console.log("hamza: timer -> " + props.timer);
  return (
    <div>
      <CountdownCircleTimer
        onComplete={props.onComplete}
        children={props.children}
        key={props.timer}
        isPlaying
        duration={19}
        size={100}
        strokeWidth={4}
        trailColor="#000000"
        colors="#ffffff"
      />
    </div>
  );
};
export default CountDownWrapper;
