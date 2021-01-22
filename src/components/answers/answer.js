import React, { useState, useEffect } from "react";
import "./answer.css";
import CountDownWrapper from "../countdownwrapper/index";
import Button from "@material-ui/core/Button";

import { data } from "../../constants/dummyData";
import firebase from "firebase";

const Answers = ({ isAdmin, user, appState }) => {
  const [timer, setTimer] = useState(20);
  const [clickable, isClickable] = useState(true);
  let milliseconds = 100;
  let seconds = 0;
  const [
    { answerColor1, answerColor2, answerColor3, answerColor4 },
    setAnswerColor
  ] = useState([
    {
      answerColor1: "purple",
      answerColor2: "purple",
      answerColor3: "purple",
      answerColor4: "purple"
    }
  ]);

  const onCompleteTimer = () => {
    milliseconds = 0;
    data.question[appState.state].answer.forEach((e, i) => {
      if (e.isTrue) {
        if (i === 0) {
          setAnswerColor({ answerColor1: "green" });
        } else if (i === 1) {
          setAnswerColor({ answerColor2: "green" });
        } else if (i === 2) {
          setAnswerColor({ answerColor3: "green" });
        } else {
          setAnswerColor({ answerColor4: "green" });
        }
        return;
      }
    });
  };

  const handleClickAnswerOne = () => {
    if (clickable) {
      console.log("hello: " + seconds + ":" + milliseconds);
      setAnswerColor({ answerColor1: "grey" });
    }

    isClickable(false);
  };
  const handleClickAnswerTwo = isTrue => {
    if (clickable && isTrue) {
      // 10:55

      console.log("hello: " + seconds + ":" + milliseconds);

      // seconds = 10, milliseconds = 55
      setAnswerColor({ answerColor2: "grey" });
      //database send name id result and number of answer true

      //final score  20 - 10.55 == 9.45

      // {
      //     userResult.score = userResult.score + finalScore
      //     set ---> on ----> store

      // }
    } else {
      // userResult.score = userResult.score +20
    }

    isClickable(false);
  };
  const handleClickAnswerThree = () => {
    if (clickable) {
      console.log("hello: " + seconds + ":" + milliseconds);
      setAnswerColor({ answerColor3: "grey" });
    }

    isClickable(false);
  };
  const handleClickAnswerFour = () => {
    if (clickable) {
      console.log("hello: " + seconds + ":" + milliseconds);
      setAnswerColor({ answerColor4: "grey" });
    }

    isClickable(false);
  };

  const onClickNextQuestion = () => {
    const milliseconds = appState.state + 1;
    firebase
      .database()
      .ref("appState")
      .orderByChild("state")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("state").set(milliseconds);
        });
      });
  };
  useEffect(() => {
    firebase
      .database()
      .ref("appState")
      .on("value", snapshot => {
        isClickable(true);
        setTimer(timer => timer + 1);
        setAnswerColor(
          { answerColor1: "purple" },
          { answerColor2: "purple" },
          { answerColor3: "purple" },
          { answerColor4: "purple" }
        );
      });
  }, []);

  const children = ({ remainingTime }) => {
    if (milliseconds === 10) {
      milliseconds = 100;
    } else {
      milliseconds--;
    }
    seconds = remainingTime % 1000;
    if (seconds < 1) {
      seconds = 0 + "0";
      milliseconds = 0 + "0";
    }

    return `${seconds}:${milliseconds}`;
  };

  return (
    <div className="answer_component">
      <div className="timer" align="center">
        <CountDownWrapper
          children={children}
          onComplete={onCompleteTimer}
          timer={timer}
        />
      </div>
      <div align="center" className="question">
        <p>{data.question[appState.state].description}</p>
      </div>

      <div className="answer_container">
        <div>
          <Button
            onClick={handleClickAnswerOne}
            className={answerColor1}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[0].details}
          </Button>
        </div>
        <div>
          <Button
            onClick={handleClickAnswerTwo}
            className={answerColor2}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[1].details}
          </Button>
        </div>
      </div>
      <div className="answer_container">
        <div>
          <Button
            onClick={handleClickAnswerThree}
            className={answerColor3}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[2].details}
          </Button>
        </div>
        <div>
          <Button
            onClick={handleClickAnswerFour}
            className={answerColor4}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[3].details}
          </Button>
        </div>
      </div>

      {isAdmin && (
        <Button
          onClick={onClickNextQuestion}
          className="admin_button"
          variant="contained"
          color="primary"
        >
          Next Question
        </Button>
      )}
    </div>
  );
};
export default Answers;
