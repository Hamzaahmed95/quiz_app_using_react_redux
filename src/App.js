import "./App.css";
import React, { Component } from "react";
import Answers from "./components/answers/answer";
import CustomizedInputs from "./components/input/input";
import { useState } from "react";
import FetchData from "./components/fetch/index";
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
          <CustomizedInputs />
          <FetchData />

          {/* <Answers /> */}
        </header>
      </div>
    );
  }
}

export default App;
