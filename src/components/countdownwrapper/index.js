import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountDownWrapper = props => {
  let seconds = 20;
  let counter = 100;

  console.log(props.duration, "hamza: timer -> " + props.timer);
  return (
    <div>
      <CountdownCircleTimer
        onComplete={props.onComplete}
        children={props.children}
        key={props.timer}
        isPlaying
        duration={props.duration}
        size={100}
        strokeWidth={4}
        trailColor="#fff"
        colors="#000000"
      />
    </div>
  );
};
export default CountDownWrapper;
