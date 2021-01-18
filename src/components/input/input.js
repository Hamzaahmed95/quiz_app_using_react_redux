import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./input.css";
import firebase from "firebase";
import * as Actions from "../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

const CustomizedInputs = ({ actions, error }) => {
  const [value, setValue] = useState("");
  const [errorValue, setErrorValue] = useState("Please Enter Value");
  const [errors, isError] = useState(false);

  const handleSubmit = () => {
    if (value.length < 0) {
      setErrorValue("Please Enter Value");
    } else {
      actions.getUserData(value);
      setErrorValue("Please Enter Value");
    }

    isError(error);
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
      {errors && <p style={{ color: "red" }}>{errorValue}</p>}
    </div>
  );
};

const mapStateToProps = props => ({
  isLoggedIn: props.userReducer.isLoggedIn,
  user: props.userReducer.user,
  error: props.userReducer.error
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedInputs);
