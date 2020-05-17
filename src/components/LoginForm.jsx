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
          successfulLogin(username);
        } else if (res.data === "Username not found") {
          setOutput(
            <React.Fragment>
              <p>Username not found</p>
            </React.Fragment>
          );
        } else if (res.data === "Invalid password") {
          setOutput(
            <React.Fragment>
              <p>Invalid password </p>
            </React.Fragment>
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(JSON.stringify(err));
      });
  }

  function successfulLogin(username) {
    getUser(username).then((res) => {
      console.log(res.data);
      loginSuccess(
        <React.Fragment>
          <h1>Hi there, {username}</h1>
          <br />
          <h3>Your Profile:</h3>

          <div className="profileDetails">
            <p>Username: {res.data.username}</p>
            <p>Password: {res.data.password}</p>
            <p>Email Address: {res.data.emailAddress}</p>
          </div>

          <br />
          <h2>Thank you for trying out Cityzen!</h2>
        </React.Fragment>
      );
    });
  }

  return (
    <React.Fragment>
      <h1>Login Form:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
