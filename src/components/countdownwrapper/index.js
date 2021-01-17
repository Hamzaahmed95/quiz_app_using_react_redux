import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountDownWrapper = props => {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  return (
    <div>
      <CountdownCircleTimer
        onComplete={props.onComplete}
        children={children}
        key={props.timer}
        isPlaying
        duration={20}
        size={100}
        strokeWidth={4}
        colors="#3b5998"
      />
    </div>
  );
};
export default CountDownWrapper;
