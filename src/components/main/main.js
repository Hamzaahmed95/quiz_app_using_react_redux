import React from "react";
import "./main.css";
import Answers from "../answers/answer";
import CustomizedInputs from "../input/input";

const Main = ({ isLoggedIn, user, appState }) => {
  return (
    <div>
      {!isLoggedIn ? (
        <CustomizedInputs />
      ) : (
        <Answers appState={appState} isAdmin={user.role === "admin" ? true : false} user={user} />
      )}
    </div>
  );
};

export default Main;
