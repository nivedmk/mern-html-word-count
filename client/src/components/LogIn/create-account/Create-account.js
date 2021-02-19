import React, { Component } from "react";
import { Link } from "react-router-dom";
import applicationAPI from "../../../apis/applicationAPI";
import history from "../../../history";
import LogIn from "../signIn/LogIn";

// import { ToastContainer, toast } from "react-toastify";
// import "./logIn.css";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  defaultState = {
    name: "",
    password: "",
    email: "",
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await applicationAPI.post("/users/add", this.state);
    console.log(response);

    if (response.data.message1 === "SUCCESS") {
      sessionStorage.setItem("tkn", response.data.token);
      this.setState(this.defaultState);
      this.props.loginSuccess(true);
      history.push("/home");
    }
  };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
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
        className="col-md-3  col-lg-4 ml-auto"
        style={{ margin: "auto", display: "block" }}
      >
        <form onSubmit={this.onFormSubmit} autoComplete="off">
          <div className="row">
            <div className="input-group mb-4">
              <div className="input-group-prepend"></div>
              <input
                id="Name"
                type="text"
                name="Name"
                placeholder="Full Name"
                value={this.state.name}
                onChange={this.onNameChange}
                className="form-control "
              />
            </div>
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
            <div className="input-group  mb-4">
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
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
