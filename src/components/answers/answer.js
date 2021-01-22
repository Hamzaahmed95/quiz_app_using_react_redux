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
  console.log(userResult, "userResultuserResult", actions);
  const [timer, setTimer] = useState(20);
  const [clickable, isClickable] = useState(true);
  let counter = 100;
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

  const correctAnswer = () => {
    const answerTime = +(seconds + "." + counter);
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

    console.log("in correct answer: " + seconds + ":" + counter);
  };
  const onCompleteTimer = () => {
    counter = 0;
    if (clickable) {
      inCorrectAnswer();
    }
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
  const handleClickAnswerOne = isTrue => {
    if (clickable) {
      if (isTrue) {
        setAnswerColor({ answerColor1: "grey" });
        correctAnswer();
        console.log("hello: " + seconds + ":" + counter);
      } else {
        setAnswerColor({ answerColor1: "grey" });
        inCorrectAnswer();
      }
      isClickable(false);
    }
  };
  const handleClickAnswerTwo = isTrue => {
    if (clickable) {
      if (isTrue) {
        setAnswerColor({ answerColor2: "grey" });
        correctAnswer();
        console.log("hello: " + seconds + ":" + counter);
      } else {
        setAnswerColor({ answerColor2: "grey" });
        inCorrectAnswer();
      }
      isClickable(false);
    }
  };
  const handleClickAnswerThree = isTrue => {
    if (clickable) {
      if (isTrue) {
        setAnswerColor({ answerColor3: "grey" });
        correctAnswer();
        console.log("hello: " + seconds + ":" + counter);
      } else {
        setAnswerColor({ answerColor3: "grey" });
        inCorrectAnswer();
      }
      isClickable(false);
    }
  };
  const handleClickAnswerFour = isTrue => {
    if (clickable) {
      if (isTrue) {
        setAnswerColor({ answerColor4: "grey" });
        correctAnswer();
        console.log("hello: " + seconds + ":" + counter);
      } else {
        setAnswerColor({ answerColor4: "grey" });
        inCorrectAnswer();
      }
      isClickable(false);
    }
  };

  const onClickNextQuestion = () => {
    const counter = appState.state + 1;
    firebase
      .database()
      .ref("appState")
      .orderByChild("state")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("state").set(counter);
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
    if (counter === 10) {
      counter = 100;
    } else {
      counter--;
    }
    seconds = remainingTime % 1000;
    if (seconds < 1) {
      seconds = 0 + "0";
      counter = 0 + "0";
    }

    return `${seconds}:${counter}`;
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
            onClick={e =>
              handleClickAnswerOne(
                data.question[appState.state].answer[0].isTrue
              )
            }
            className={answerColor1}
            variant="outlined"
            color="primary"
          >
            {data.question[appState.state].answer[0].details}
          </Button>
        </div>
        <div>
          <Button
            onClick={e =>
              handleClickAnswerTwo(
                data.question[appState.state].answer[1].isTrue
              )
            }
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
            onClick={e =>
              handleClickAnswerThree(
                data.question[appState.state].answer[2].isTrue
              )
            }
            className={answerColor3}
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
              handleClickAnswerFour(
                data.question[appState.state].answer[3].isTrue
              )
            }
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
const mapStateToProps = props => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
