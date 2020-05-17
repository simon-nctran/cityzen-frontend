import React, { useState } from "react";
import { addUser, getUser } from "../api";

export default function RegistrationForm({ registrationSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [output, setOutput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addUser(username, password, email)
      .then((res) => {
        console.log(res);
        if (res.data === "Registration successful") {
          successfulRegister(username)
        } else if (res.data === "Username already exists") {
          setOutput("Username already exists");
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(JSON.stringify(err));
      });
  }

  function successfulRegister(username) {
    getUser(username)
      .then((res) => {
        registrationSuccess(
          <React.Fragment>
            {JSON.stringify(res)}
          </React.Fragment>
        )
      })
  }

  return (
    <React.Fragment>
      <h1>Registration Form:</h1>
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
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Register
        </button>
      </form>
      <p>{output}</p>
      <br />
      <br />
    </React.Fragment>
  );
}