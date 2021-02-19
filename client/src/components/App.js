import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./home/home";
import CreateAccount from "./LogIn/create-account/Create-account";
import LogIn from "./LogIn/signIn/LogIn";
import Header from "./header/Header";

class App extends React.Component {
  render() {
    return <Header />;
  }
}

export default App;
