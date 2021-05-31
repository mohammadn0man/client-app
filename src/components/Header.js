import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { LogOutAuthAction } from "../actions/AuthAction";

const Header = (props) => {
  const { auth, logout } = props;
  const history = useHistory();

  return (
    <nav className="navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="text-white navbar-brand">
          QA Forum
        </Link>
        <div className="ml-auto d-flex">
          {!auth.isLoggedIn ? (
            <React.Fragment>
              <Link to="/login" className="btn btn-white ml-auto">
                Login/Register
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h4 className="text-white">Hello, {auth.user.userName}</h4>
              <button
                className="btn btn-white btn-sm mx-2"
                onClick={() => {
                  logout(history);
                }}
              >
                Log Out
            </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      dispatch(LogOutAuthAction(history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);;