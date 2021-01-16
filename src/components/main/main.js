import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./main.css";
import firebase from "firebase";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answers from "../answers/answer";
import CustomizedInputs from "../input/input";
import FetchData from "../fetch/index";
import Register from "../register/register";


const Main = ({ isLoggedIn }) => {
  const [value, setValue] = useState("");
  console.log("islogin: " + isLoggedIn);
  const handleSubmit = () => {
    console.log("hamza: " + value);
    const values = { name: value };
    let carListRef = firebase.database().ref("car");
    let newCarRef = carListRef.push();
    newCarRef
      .set(values)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div >
        <CustomizedInputs />
          <FetchData />
          {/* <Answers /> */}
    </div>
  );
}

const mapStateToProps = (props) => ({
	isLoggedIn: props.userReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
	//actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
