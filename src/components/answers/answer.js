import React, { useState, useEffect } from "react";
import "./answer.css";
import CountDownWrapper from "../countdownwrapper/index";
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/userActions";
import { connect } from "react-redux";
import { data } from "../../constants/dummyData";
import firebase from "firebase";

const Answers = ({ isAdmin, user, appState, userResult, actions }) => {
  const [timer, setTimer] = useState(20);
  const [clickable, isClickable] = useState(true);
  let isAnswerSelected = false;
  let milliseconds = 100;
  let seconds = 0;
  const [answerColors, setAnswerColor] = useState([
    {
      answerColor1: "purple",
      answerColor2: "purple",
      answerColor3: "purple",
      answerColor4: "purple"
    }
  ]);

  const correctAnswer = () => {
    const answerTime = +(seconds + "." + milliseconds);
    const questionTime = +data.question[appState.state].timer;
    const correctTime = questionTime - answerTime;
    const score = +userResult.score + correctTime;
    const obj = {
      score: score.toFixed(2),
      answerCount: userResult["answerCount"] + 1
    };
    actions.storeAnswer(obj, userResult["id"]);
  };

  const inCorrectAnswer = () => {
    const score = +userResult.score + +data.question[appState.state].timer;
    const obj = {
      score: +score.toFixed(2),
      answerCount: userResult["answerCount"]
    };
    actions.storeAnswer(obj, userResult["id"]);
  };

  const onCompleteTimer = () => {
    milliseconds = 0;
    if (!isAnswerSelected) {
      inCorrectAnswer();
    }
    data.question[appState.state].answer.forEach((e, i) => {
      if (e.isTrue) {
        answerSwitch(i + 1, "green");
        return;
      }
    });
  };
  const answerSwitch = (answer, color) => {
    switch (answer) {
      case 1:
        setAnswerColor({ answerColor1: color });
        break;
      case 2:
        setAnswerColor({ answerColor2: color });
        break;
      case 3:
        setAnswerColor({ answerColor3: color });
        break;
      default:
        setAnswerColor({ answerColor4: color });
        break;
    }
  };

  const handleClickAnswerCommon = (isTrue, value) => {
    if (clickable) {
      isAnswerSelected = true;
      isTrue ? correctAnswer() : inCorrectAnswer();
      answerSwitch(value, "grey");
      isClickable(false);
    }
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
      .on("value", () => {
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
            onClick={() =>
              handleClickAnswerCommon(
                data.question[appState.state].answer[0].isTrue,
                1
              )
            }
            className={answerColors.answerColor1}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[0].details}
          </Button>
        </div>
        <div>
          <Button
            onClick={() =>
              handleClickAnswerCommon(
                data.question[appState.state].answer[1].isTrue,
                2
              )
            }
            className={answerColors.answerColor2}
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
            onClick={e =>
              handleClickAnswerCommon(
                data.question[appState.state].answer[2].isTrue,
                3
              )
            }
            className={answerColors.answerColor3}
            variant="outlined"
            color="primary"
            isD
          >
            {data.question[appState.state].answer[2].details}
          </Button>
        </div>
        <div>
          <Button
            onClick={e =>
              handleClickAnswerCommon(
                data.question[appState.state].answer[3].isTrue,
                4
              )
            }
            className={answerColors.answerColor4}
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
const mapStateToProps = props => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
