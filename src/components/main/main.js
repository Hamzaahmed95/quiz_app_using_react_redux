import React from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/input";
import Result from "../result/index";

const Main = ({ isLoggedIn, user, appState, error }) => {
  return (
    <div>
      {!isLoggedIn ? (
        <CustomizedInputs />
      ) : (
        /// New componenet
        <div className="quiz_component">
          <div className="answers">
            <Answers
              appState={appState}
              isAdmin={user.role === "admin" ? true : false}
              user={user}
            />
          </div>
          <div className="result">
            <Result />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
