import React, { useEffect, useState } from "react";
import "./index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "../main/main";
import * as Actions from "../../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
const Loading = ({ isLoggedIn, actions, user }) => {
  console.log(user, "islogin: " + isLoggedIn);
  const [Loadingg, isLoadingg] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("id"), "localStorage.getItem('id')");
    if (localStorage.getItem("id")) {
      actions.getUserData(localStorage.getItem("id"));
    }
    setTimeout(function() {
      isLoadingg(true);
    }, 1000);
  }, []);
  return (
    <div>
      {!Loadingg ? (
        <div className="progress_bar" align="center">
          <CircularProgress className="progress_barColor" color="primary" />
        </div>
      ) : (
        <Main user={user} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

const mapStateToProps = props => ({
  isLoggedIn: props.userReducer.isLoggedIn,
  user: props.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
