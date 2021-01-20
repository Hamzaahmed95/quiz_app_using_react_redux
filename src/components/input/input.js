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

const CustomizedInputs = ({
  actions,
  error,
  loginSuccess,
  user,
  isLoggedIn
}) => {
  const [value, setValue] = useState("");
  const [errorValue, setErrorValue] = useState("Please Enter Value");
  const [errors, isError] = useState(false);

  useEffect(() => {
    if(loginSuccess){
      actions.getLoginState();
    }
  }, [user]);
  useEffect(() => {
    isError(error);
  }, [error]);
  const handleSubmit = () => {
    actions.getUserData(value);
    console.log("Error: " + error);
    if (error) {
      setErrorValue("Please Enter Value");
      isError(error);
    }
  };

  const handleChange = e => {
    isError(false);
    setValue(e.target.value);
  };

  const startQuiz = () => {
    actions.startQuiz();
  };
  return (
    <div className="input_container" align="center">
      {!loginSuccess && !isLoggedIn && (
        <>
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
            disabled={!value}
          >
            submit
          </Button>
        </>
      )}
      {loginSuccess && !isLoggedIn && user.role === "user" && (
        <>
          <p>Quiz will start soon</p>
        </>
      )}
      {loginSuccess && !isLoggedIn && user.role === "admin" && (
        <>
          <Button
            onClick={startQuiz}
            variant="contained"
            className="submitButton"
          >
            Start Quiz
          </Button>
        </>
      )}

      {errors && <p style={{ color: "red" }}>Invalid User key</p>}
    </div>
  );
};

const mapStateToProps = props => ({
  loginSuccess: props.userReducer.loginSuccess,
  isLoggedIn: props.userReducer.isLoggedIn,
  user: props.userReducer.user,
  error: props.userReducer.error
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedInputs);
