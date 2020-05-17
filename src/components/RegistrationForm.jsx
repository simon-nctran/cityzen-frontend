import React, { useState } from "react";
import { addUser, getUser } from "../api";

export default function RegistrationForm({ registrationSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [output, setOutput] = useState(<React.Fragment />);

  function handleSubmit(event) {
    event.preventDefault();

    addUser(username, password, email)
      .then((res) => {
        console.log(res);
        if (res.data === "Registration successful") {
          successfulRegister(username)
        } else if (res.data === "Username already exists") {
          setOutput(
            <React.Fragment>
              <p>Username already exists</p>
            </React.Fragment>
          );
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
            <h1>Hi there, {username}</h1>
            <br />
            <h3>Your Profile:</h3>
            <ul>
              <li>Username: {res.data.username}</li>
              <li>Password: {res.data.password}</li>
              <li>Email Address: {res.data.emailAddress}</li>
            </ul>
            <br />
            <h2>Thank you for trying out Cityzen!</h2>
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
      {output}
      <br />
      <br />
    </React.Fragment>
  );
}