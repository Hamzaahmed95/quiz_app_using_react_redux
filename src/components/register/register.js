import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./register.css";
import firebase from "firebase";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const useStylesReddit = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

const Register = ({ isLoggedIn }) => {
  const [value, setValue] = useState("");
  console.log("islogin: " + isLoggedIn);
  const handleSubmit = () => {
    console.log("hamza: " + value);
    const randomString = Math.random().toString(36);
    const date = new Date();
    const randomNumber =  randomString+new Date(date).getTime();
    const values = { 
      state: 0
    };
    let carListRef = firebase.database().ref("appState");
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
    <div className="input_container" align="center">
      <RedditTextField
        label="Enter your key"
        defaultValue={value}
        onChange={e => handleChange(e)}
        variant="filled"
        id="reddit-input"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        className="submitButton"
      >
        submit
      </Button>
    </div>
  );
}

const mapStateToProps = (props) => ({
	isLoggedIn: props.userReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
	//actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
