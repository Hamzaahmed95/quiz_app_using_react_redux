import React from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/index";
import Register from "../register/register";
import Result from "../result/index";

const Main = ({ isLoggedIn, user, appState, userResult, error }) => {
  return (
    // <div>
    //   <Register />
    // </div>
    <div>
      {!isLoggedIn ? (
        <CustomizedInputs />
      ) : (
        <div>
          <div className="main_container">
            <span className="main_username">{user.name}</span>
            <span className="main_category">ISLAMIC</span>
            <div className="main_results_container">
              <span align="left" className="main_score">
                Score: 0
              </span>

              <span align="left" className="main_rank">
                Rank: 0
              </span>
            </div>
          </div>

          <div className="quiz_component">
            <div className="answers">
              <Answers
                appState={appState}
                isAdmin={user.role === "admin" ? true : false}
                user={user}
                userResult={userResult}
              />
            </div>
            <div className="result">
              <Result appState={appState} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
