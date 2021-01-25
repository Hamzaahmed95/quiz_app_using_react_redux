import React from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/input";
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              borderBottom: "groove",
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <h3 style={{ color: "white" }}>Name: {user.name}</h3>
            <h3 style={{ color: "white" }}>Rank: 0</h3>
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
              <Result />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
