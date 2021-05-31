import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          QA Forum
        </Link>
        <div>
          <Link to="/login" className="btn btn-light ml-auto">
            Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;