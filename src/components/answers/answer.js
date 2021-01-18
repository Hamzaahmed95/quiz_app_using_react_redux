import React, { useState, useEffect } from "react";
import "./answer.css";
import CountDownWrapper from "../countdownwrapper/index";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { data } from "../../constants/dummyData";
import firebase from "firebase";

const Answers = ({ isAdmin, user }) => {
  console.log("hamzaahmed:" + user.name, " is ", isAdmin);
  const [correctAnswer, setCorrectAnswer] = useState("B");
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
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
  useEffect(() => {
    console.log(data.question[0].description);
    const answer = data.question.filter(e => {
      e.answer.filter(e => e.isTrue === true);
    });
    getData();

    //if(answer)
  }, []);

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

  const onCompleteTimer = () => {
    if (correctAnswer === "A") {
      setAnswerColor({ answerColor1: "green" });
    } else if (correctAnswer === "B") {
      setAnswerColor({ answerColor2: "green" });
    } else if (correctAnswer === "C") {
      setAnswerColor({ answerColor3: "green" });
    } else {
      setAnswerColor({ answerColor4: "green" });
    }
  };
  const getData = () => {
    firebase
      .database()
      .ref("appState")
      .orderByChild("state")
      .on("value", snapshot => {
        snapshot.forEach(function(data) {
          alert(1);
        });
      });
  };

  return (
    <div>
      <div align="center" className="parent_answer_container">
        <h1 className=" " align="center">
          Islamic Quiz
        </h1>
        <div className="timer" align="center">
          <CountDownWrapper onComplete={onCompleteTimer} timer={timer} />
        </div>
        <div align="center" className="question">
          <p>{data.question[counter].description}</p>
        </div>
        <Card className="box_container" border={1}>
          <div align="center" className="answer_container">
            <Button
              onClick={colorChange1}
              className={answerColor1}
              variant="contained"
              color="primary"
            >
              {data.question[counter].answer[0].details}
            </Button>
            <Button
              onClick={colorChange2}
              className={answerColor2}
              variant="contained"
              color="primary"
            >
              {data.question[counter].answer[1].details}
            </Button>
          </div>
          <div className="answer_container">
            <Button
              onClick={colorChange3}
              className={answerColor3}
              variant="contained"
              color="primary"
            >
              {data.question[counter].answer[2].details}
            </Button>
            <Button
              onClick={colorChange4}
              className={answerColor4}
              variant="contained"
              color="primary"
            >
              {data.question[counter].answer[3].details}
            </Button>
          </div>
        </Card>
        <Button
          onClick={() => {
            setTimer(timer + 1);
            counter < data.question.length
              ? setCounter(counter + 1)
              : setCounter(counter - 1);
          }}
          className="admin_button"
          variant="contained"
          color="primary"
        >
          Next Question
        </Button>
      </div>
    </div>
  );
};
export default Answers;
