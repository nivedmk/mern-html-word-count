import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../../history";
import applicationAPI from "../../../apis/applicationAPI";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  defaultState = {
    password: "",
    email: "",
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await applicationAPI.post("/users/login", this.state);

    if (response.data.message1 === "SUCCESS") {
      sessionStorage.setItem("tkn", response.data.token);
      this.setState(this.defaultState);
      history.push("/home");
      this.props.loginSuccess(true);
    } else {
      console.log(response);
    }
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div
        className="col-md-7 col-lg-4 ml-auto"
        style={{ margin: "auto", display: "block", padding: "auto" }}
      >
        <form onSubmit={this.onFormSubmit} autoComplete="off">
          <div className="row">
            <div className="input-group  mb-4">
              <div className="input-group-prepend"></div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.onEmailChange}
                className="form-control "
              />
            </div>
            <div className="input-group  mb-4 ">
              <div className="input-group-prepend"></div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
                className="form-control "
              />
            </div>
            <div className="form-group col-lg-12 mx-auto mb-0">
              <button className="btn btn-primary btn-block py-2">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          <Link to="/create-acount">Create</Link> an account?
        </div>
      </div>
    );
  }
}

export default LogIn;
