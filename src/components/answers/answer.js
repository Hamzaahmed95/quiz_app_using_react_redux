import React, { useState } from "react";
import "./answer.css";
import CountDownWrapper from "../countdownwrapper/index";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CustomButton from "../custombutton/index";

import { data } from "../../constants/dummyData";
import firebase from "firebase";

const Answers = ({ isAdmin, user, appState }) => {
  console.log(appState, "counter");
  const [timer, setTimer] = useState(0);
  const [
    { answerColor1, answerColor2, answerColor3, answerColor4 },
    setAnswerColor
  ] = useState([
    {
      answerColor1: "black",
      answerColor2: "black",
      answerColor3: "black",
      answerColor4: "black"
    }
  ]);

  const onCompleteTimer = () => {
    let counter = 0;
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

    console.log(counter);
  };

  const colorChange1 = () => {
    setAnswerColor({ answerColor1: "grey" });
  };
  const colorChange2 = () => {
    //selectAnswer2(true);
    setAnswerColor({ answerColor2: "grey" });
  };
  const colorChange3 = () => {
    // selectAnswer3(true);
    setAnswerColor({ answerColor3: "grey" });
  };
  const colorChange4 = () => {
    // selectAnswer4(true);
    setAnswerColor({ answerColor4: "grey" });
  };
  const onClickNextQuestion = () => {
    setAnswerColor(
      { answerColor1: "black" },
      { answerColor2: "black" },
      { answerColor3: "black" },
      { answerColor4: "black" }
    );
    console.log(appState, "counter");
    const counter = appState.state + 1;
    firebase
      .database()
      .ref("appState")
      .orderByChild("state")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("state").set(counter);
          setTimer(3);
        });
      });
  };

  return (
    <div className="answer_component">
      <div className="timer" align="center">
        <CountDownWrapper onComplete={onCompleteTimer} timer={timer} />
      </div>
      <div align="center" className="question">
        <p>{data.question[appState.state].description}</p>
      </div>

      <div className="answer_container">
        <div>
          <CustomButton
            colorChange={colorChange1}
            text={data.question[appState.state].answer[0].details}
          />
        </div>
        <div>
          <CustomButton
            colorChange={colorChange2}
            text={data.question[appState.state].answer[0].details}
          />
        </div>
      </div>
      <div className="answer_container">
        <div>
          <CustomButton
            colorChange={colorChange3}
            text={data.question[appState.state].answer[0].details}
          />
        </div>
        <div>
          <CustomButton
            colorChange={colorChange4}
            text={data.question[appState.state].answer[0].details}
          />
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
