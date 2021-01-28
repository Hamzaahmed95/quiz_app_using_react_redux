import React, { useState, useEffect } from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/index";
import Register from "../register/register";
import Result from "../result/index";

const Main = ({ isLoggedIn, user, appState, userResult, error }) => {
  const [rank, setRank] = useState("");

  const result = data => {
    data.filter((e, i) => {
      if (e.id == user.id) {
        console.log("main:" + i);
        setRank(i + 1);
        return i;
      }
    });
  };
  useEffect(() => {
    console.log("checking");
  }, [appState.state]);
  return (
    <div>
      {!isLoggedIn ? (
        <CustomizedInputs />
      ) : appState.state < 40 ? (
        <div>
          <div className="main_container">
            <span className="main_username">{user.name}</span>
            <span className="main_category">ISLAMIC</span>
            <div className="main_results_container">
              <span align="left" className="main_score">
                Score: 0
              </span>

              <span align="left" className="main_rank">
                Rank: {rank}
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
              <Result
                limit={15}
                result={result}
                appState={appState}
                isAdmin={user.role === "admin" ? true : false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="result_final">
          <Result
            limit={50}
            result={result}
            appState={appState}
            isAdmin={user.role === "admin" ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
