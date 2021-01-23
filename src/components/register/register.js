import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./register.css";
import firebase from "firebase";
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

const Register = ({ isLoggedIn }) => {
  const [user, setUser] = useState({
    name: "",
    familyName: "",
    id: "",
    role: "admin"
  });
  const handleSubmit = () => {
    console.log(user, "userss");
    let userRef = firebase.database().ref("users");
    let newUserRef = userRef.push();
    newUserRef
      .set(user)
      .then(resp => {
        console.log(resp);
        const result = {
          id: user.id,
          name: user.name + " " + user.familyName,
          score: 0,
          totalCorrectAnswers: 0,
          rank: 0
        };
        let userResultRef = firebase.database().ref("userResults");
        let userResults = userResultRef.push();
        userResults
          .set(result)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = (val, field) => {
    setUser({
      ...user,
      [field]: val
    });
  };

  return (
    <div className="input_container" align="center">
      <RedditTextField
        label="Name"
        defaultValue={user.name}
        onChange={e => handleChange(e.target.value, "name")}
        variant="filled"
        id="reddit-input"
      />
      <RedditTextField
        label="Family Name"
        defaultValue={user.familyName}
        onChange={e => handleChange(e.target.value, "familyName")}
        variant="filled"
        id="reddit-input"
      />

      <RedditTextField
        label="ID"
        defaultValue={user.id}
        onChange={e => handleChange(e.target.value, "id")}
        variant="filled"
        id="reddit-input"
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        className="submitButton"
        disabled={!user.name || !user.id || !user.familyName}
      >
        submit
      </Button>
    </div>
  );
};

const mapStateToProps = props => ({
  isLoggedIn: props.userReducer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  //actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
