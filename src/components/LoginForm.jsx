import React, { Component } from "react";
import { getLogin } from "../api";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginOutput: "",
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

    getLogin(username, password)
      .then((res) => {
        console.log(res);
        //document.getElementById("loginOutput").innerHTML = JSON.stringify(res);
        this.setState({ loginOutput: JSON.stringify(res) });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loginOutput: JSON.stringify(e) });
      });

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
        <p>{this.state.loginOutput}</p>
      </div>
    );
  }
}
