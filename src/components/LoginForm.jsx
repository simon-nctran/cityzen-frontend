import React, { Component } from "react";
import { getLogin } from "../api";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    const res = getLogin(username, password);
    console.log("log");
    console.log(`response ${res}`);
    console.log("post res");

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button className="btn btn-success" type="submit">
            Login
          </button>
        </form>
        <p id="loginOutput"></p>
      </div>
    );
  }
}
