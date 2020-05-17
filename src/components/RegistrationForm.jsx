import React, { useState } from "react";
//import { useForm } from "react-hook-form";
import { addUser } from "../api";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registrationOutput, setRegistrationOutput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addUser(username, password, email)
      .then((res) => {
        console.log(res);
        setRegistrationOutput(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setRegistrationOutput(JSON.stringify(err));
      });
  }

  return (
    <div>
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
      <p>{registrationOutput}</p>
    </div>
  );
}