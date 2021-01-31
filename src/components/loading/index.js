import React, { useEffect, useState } from "react";
import "./index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "../main/main";
import * as Actions from "../../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ isLoggedIn, actions, user, appState, userResult }) => {
  const [Loadingg, isLoadingg] = useState(false);

  useEffect(() => {
    actions.getAppState();
    if (localStorage.getItem("id")) {
      actions.getLoginState();
      actions.getUserResult(localStorage.getItem("id"));
      actions.getUserData(localStorage.getItem("id"));
    }
    setTimeout(function() {
      isLoadingg(true);
    }, 2000);
  }, []);
  return (
    <div>
      {!Loadingg ? (
        <div className="progress_bar" align="center">
          <CircularProgress
            style={{ color: "#1A4173" }}
            className="progress_barColor"
            color="primary"
          />
        </div>
      ) : (
        <div className="progress_bar" align="center">
          <Main
            userResult={userResult}
            appState={appState}
            user={user}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = props => ({
  isLoggedIn: props.userReducer.isLoggedIn,
  user: props.userReducer.user,
  userResult: props.userReducer.userResult,
  appState: props.userReducer.appState
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
