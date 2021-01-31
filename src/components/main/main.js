import React, { useState, useEffect } from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/index";
import Register from "../register/register";
import Result from "../result/index";

const Main = ({ isLoggedIn, user, appState, userResult, error }) => {
  const [rank, setRank] = useState(0);

  const result = data => {
    data.filter((e, i) => {
      if (e.id == user.id) {
        setRank(i + 1);
        return i;
      }
    });
  };
  const getCategory = () => {
    if (appState.state < 10) {
      return "General Knowledge";
    } else if (appState.state < 20) {
      return "Islamic";
    } else if (appState.state < 30) {
      return "IQ";
    } else if (appState.state < 40) {
      return "Nawait";
    }
  };
  return (
    <div>
      {!isLoggedIn ? (
        <CustomizedInputs />
      ) : appState.state < 40 ? (
        <div>
          <div className="main_container">
            <span className="main_username">
            {user.role === "user" && user.name + " " }
              <span align="left" className="main_username_result">
                <br />{user.role === "admin" ? 'Admin' :`(${userResult.name})`}
              </span>
            </span>
            <span className="main_category">{getCategory()}</span>
            <div className="main_results_container">
            {user.role === "user" &&
            <>
              <span align="left" className="main_score">
                Score: {userResult.score}
              </span>

              <span align="left" className="main_rank">
                Rank: {rank}
          </span>
          </> 
          }
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
          <div style={{ padding: "10px" }} className="main_results_container">
            <span align="right" className="main_score">
              Score: {userResult.score}
            </span>

            <span align="right" className="main_rank">
              Rank: {rank}
            </span>
          </div>
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
