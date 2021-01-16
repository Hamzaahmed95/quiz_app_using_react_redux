import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./input.css";
import firebase from "firebase";

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

export default function CustomizedInputs() {
  const [value, setValue] = useState("");

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
