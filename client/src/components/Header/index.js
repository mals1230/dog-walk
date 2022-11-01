import React from "react";
import { Link } from "react-router-dom";
import Pets from "../../pages/Pets";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">🐾 Take A Hike</h1>
          </Link>
          <p className="m-0">We're PAWS-itively the best!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link
                className="btn btn-lg btn-info m-2"
                to="/profile/${Auth.getProfile().data.userFullName}"
              >
                {Auth.getProfile().data.userFullName}'s Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Log In
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
