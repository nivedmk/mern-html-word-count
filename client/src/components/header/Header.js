import React, { useEffect, useState } from "react";
import { Router, Route, Link } from "react-router-dom";
import history from "../../history";

import applicationAPI from "../../apis/applicationAPI";
import Home from "../home/home";
import CreateAccount from "../LogIn/create-account/Create-account";
import LogIn from "../LogIn/signIn/LogIn";
import globex from "../../assets/images/globex.svg";
import "./header.css";

const Header = () => {
  const [logInStatus, setLogInStatus] = useState(
    sessionStorage.getItem("tkn") ? true : false
  );
  const onLogOut = async () => {
    const response = await applicationAPI.post("/users/logout", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkn")}`,
      },
    });
    console.log(response);
  };
  useEffect(() => {
    headerOptions();
  }, []);

  const headerOptions = () => {
    if (logInStatus) {
      return (
        <button onClick={onLogOut} className="signUp">
          Log Out
        </button>
      );
    } else {
      return (
        <span>
          <Link to="/">
            <button className="signIn">Log In</button>
          </Link>
          <Link to="/create-acount">
            <button className="signUp">sign Up</button>
          </Link>
        </span>
      );
    }
  };

  const loginSuccess = (value) => {
    setLogInStatus(value);
  };

  return (
    <Router history={history}>
      <div style={{ display: "block", margin: "auto" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ justifyContent: "space-between" }}
        >
          <Link to="/home">
            <img src={globex} alt="globex" />
          </Link>
          {headerOptions()}
        </nav>
      </div>
      <Route path="/" exact test="test">
        <LogIn loginSuccess={loginSuccess} />
      </Route>
      <Route path="/home" exact component={Home} />
      <Route path="/create-acount" exact>
        <CreateAccount loginSuccess={loginSuccess} />
      </Route>
    </Router>
  );
};

export default Header;
