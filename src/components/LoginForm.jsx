import React, { useState } from "react";
import { getLogin, getUser } from "../api";

export default function LoginForm({ loginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState(<React.Fragment />);

  function handleSubmit(event) {
    event.preventDefault();

    getLogin(username, password)
      .then((res) => {
        console.log(res);
        if (res.data === "Login successful") {
          successfulLogin(username)
        } else if (res.data === "did not find username") {
          setOutput(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(JSON.stringify(err));
      });
  }

  function successfulLogin(username) {
    getUser(username)
      .then((res) => {
        loginSuccess(
          <React.Fragment>
            {JSON.stringify(res)}
          </React.Fragment>
        )
      })
  }

  return (
    <React.Fragment>
      <h1>Login Form:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Login
        </button>
      </form>
      {output}
      <br />
      <br />
    </React.Fragment>
  );
}