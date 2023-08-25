import React from "react";
import _ from 'lodash';
import { Link, NavLink } from "react-router-dom";
import brand from '../public/owasp-brand.png';
import auth from '../services/authService';

const NavBar = ({user}) => {
  const role = auth.getUser() && auth.getUser().role;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-inverse">
      <Link className="navbar-brand" to="/home">
        <img src={brand} width="50px"/>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/about">
            About
          </NavLink>
          <NavLink className="nav-item nav-link" to="/books">
            Books
          </NavLink>
          <NavLink className="nav-item nav-link" to="/authors">
            Authors
          </NavLink>
          {role == 'ADMIN' && (
          <NavLink className="nav-item nav-link" to="/profile/users">
            Users
          </NavLink>
          )}
        </div>
      </div>
      {!user && (
        <ul className="nav navbar-nav navbar-right">
        <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/signup">
            Sign Up
          </NavLink>
        </ul>
      )}

      {user && (
        <ul className="nav navbar-nav navbar-right">
          <NavLink className="nav-item nav-link" to={`/profile/${user.username}`}>
            {user.username}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
        </ul>
      )}

    </nav>
  );
};

export default NavBar;
