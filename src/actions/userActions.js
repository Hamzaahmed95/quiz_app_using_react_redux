import {
  LOGIN_SUCCESS,
  GET_APP_STATE,
  LOGIN_FAILED,
  START_QUIZ,
  USER_RESULT,
  USER_RESULT_FAILED
} from "../constants/action-types";
import firebase from "firebase";

export const getUserData = value => {
  return dispatch => {
    firebase
      .database()
      .ref("users")
      .orderByChild("id")
      .equalTo(value)
      .on("value", snapshot => {
        if (snapshot.exists()) {
          console.log("Error: passed");
          snapshot.forEach(function(data) {
            console.log(data.val());
            if (!data.child("login")) {
              localStorage.setItem("id", data.child("id").val());
              dispatch({ type: LOGIN_SUCCESS, payload: data.val() });
            } else {
              dispatch({ type: LOGIN_FAILED, payload: "" });
            }
          });
        } else {
          console.log("Error: failed");
          dispatch({ type: LOGIN_FAILED, payload: "" });
        }
      });
  };
};

export const getAppState = () => {
  return dispatch => {
    firebase
      .database()
      .ref("appState")
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            console.log(data.val(), "awssssawssssawssss");
            dispatch({ type: GET_APP_STATE, payload: data.val() });
          });
        } else {
          console.log("asdasxzczxc show toast invalid ID");
        }
      });
  };
};

export const getLoginState = () => {
  return dispatch => {
    firebase
      .database()
      .ref("loginState")
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            const dataValue = data.val();
            if (dataValue.state) {
              dispatch({ type: START_QUIZ, payload: "" });
            }
          });
        } else {
          console.log("abcdasad");
        }
      });
  };
};

export const startQuiz = () => {
  console.log(START_QUIZ, "START_QUIZSTART_QUIZ");
  return dispatch => {
    firebase
      .database()
      .ref("loginState")
      .orderByChild("state")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("state").set(true);
          dispatch({ type: START_QUIZ, payload: "" });
        });
      });
  };
};

export const getUserResult = value => {
  return dispatch => {
    firebase
      .database()
      .ref("userResults")
      .orderByChild("id")
      .equalTo(value)
      .on("value", snapshot => {
        if (snapshot.exists()) {
          console.log("Error: passed");
          snapshot.forEach(function(data) {
            console.log(data.val(), "user ersuultss");
            dispatch({ type: USER_RESULT, payload: data.val() });
          });
        } else {
          console.log("Error: failed");
          dispatch({ type: USER_RESULT_FAILED, payload: "" });
        }
      });
  };
};

export const storeAnswer = (obj, value) => {
  console.log(obj, "poo", value);
  return dispatch => {
    firebase
      .database()
      .ref("userResults")
      .orderByChild("id")
      .equalTo(value)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("Error: passed");
          snapshot.forEach(function(data) {
            console.log("Error: passed", data.val());
            data.ref.child("score").set(obj.score);
            data.ref.child("totalCorrectAnswers").set(obj.totalCorrectAnswers);
          });
        } else {
          console.log("Error: failed");
          dispatch({ type: USER_RESULT_FAILED, payload: "" });
        }
      });
  };
};
