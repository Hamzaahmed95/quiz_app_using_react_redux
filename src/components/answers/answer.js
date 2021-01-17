import React, { useState } from "react";
import "./answer.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";

const Answers = (props) => {
  console.log(props.isAdmin,"propsss is admin");
  const [answer1, selectAnswer1] = useState(false);
  const [answerColor, setAnswerColor] = useState("purple");
  const [answer2, selectAnswer2] = useState(false);
  const [answer3, selectAnswer3] = useState(false);
  const [answer4, selectAnswer4] = useState(false);

  const colorChange1 = () => {
    setAnswerColor("grey");
  };
  const colorChange2 = () => {
    selectAnswer2(true);
  };
  const colorChange3 = () => {
    selectAnswer3(true);
  };
  const colorChange4 = () => {
    selectAnswer4(true);
  };
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <Card align="center" className="parent_answer_container">
        <h1 className=" " align="center">
          Islamic Quiz
        </h1>
        <div className="timer" align="center">
           
          <CountdownCircleTimer
            onComplete={() => {
              // do your stuff here
              setAnswerColor("green");
              return [false, 1500]; // repeat animation in 1.5 seconds
            }}
            children={children}
            isPlaying
            duration={20}
            size={100}
            strokeWidth={4}
            colors="#3b5998"
          />
        </div>
        <div align="center" className="question">
          <p>This is the first Question</p>
        </div>
        <Card className="box_container" border={1}>
          <div align="center" className="answer_container">
            <Button
              onClick={colorChange1}
              className={answerColor}
              variant="contained"
              color="primary"
            >
              This is answer 1
            </Button>
            <Button variant="contained" color="primary">
              This is answer 2
            </Button>
          </div>
          <div className="answer_container">
            <Button className="button1" variant="contained" color="primary">
              This is answer 3
            </Button>
            <Button variant="contained" color="primary">
              This is answer 4
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
};
export default Answers;
