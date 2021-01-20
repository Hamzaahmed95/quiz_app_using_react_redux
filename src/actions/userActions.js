import {
  LOGIN_SUCCESS,
  GET_APP_STATE,
  LOGIN_FAILED,
  START_QUIZ
} from "../constants/action-types";
import firebase from "firebase";

export const getUserData = value => {
  return dispatch => {
    firebase
      .database()
      .ref("user")
      .orderByChild("id")
      .equalTo(value)
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            console.log(data.val());
            localStorage.setItem("id", data.child("id").val());
            dispatch({ type: LOGIN_SUCCESS, payload: data.val() });
          });
        } else {
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
            if(dataValue.state){
              dispatch({ type: START_QUIZ, payload: '' });
            }
            
          });
        } else {
          console.log("abcdasad");
        }
      });
  };
};

export const startQuiz = () => {
  console.log(START_QUIZ,"START_QUIZSTART_QUIZ");
  return dispatch => {
  /*   let carListRef = firebase.database().ref("loginState");
    let newCarRef = carListRef.push();
    newCarRef
      .set({state: false})
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      }); */
    firebase
      .database()
      .ref("loginState")
      .orderByChild("state")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("state").set(true);
          dispatch({ type: START_QUIZ, payload: '' });
        });
    });
  };
};