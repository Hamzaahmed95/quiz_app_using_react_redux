import "./App.css";
import React, { Component } from "react";
import Loading from "./components/loading/index";
import { firebaseConfig } from "./constants/apikey.js";
import firebase from "firebase/app";
import Card from "@material-ui/core/Card";
import Result from "./components/result/index";
import logo from "./assets/logo.png";
import bgWhite from "./assets/bgWhite.png";

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
      <div align="center" className="App">
        <div className="logo_text_container">
          <img className="logo_image" src={logo} alt="logo" />
          <span className="text_heading"> & Mursaleen Mehmood</span>
        </div>
        <Card variant="outlined" className="parent_answer_container">
          <Loading />
        </Card>
      </div>
    );
  }
}

export default App;
