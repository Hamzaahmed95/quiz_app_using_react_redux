import "./App.css";
import React, { Component } from "react";
import Main from "./components/main/main";
import Answers from "./components/answers/answer";
import { useState } from "react";
import { firebaseConfig } from "./constants/apikey.js";
import firebase from "firebase/app";

class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    );
  }
}

export default App;
