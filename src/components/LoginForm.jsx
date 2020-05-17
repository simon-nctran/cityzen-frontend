import React, { useState } from "react";
//import { useForm } from "react-hook-form";
import { getUser } from "../api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginOutput, setLoginOutput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    getUser(username, password)
      .then((res) => {
        console.log(res);
        setLoginOutput(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setLoginOutput(JSON.stringify(err));
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
        <button className="btn btn-success" type="submit">
          Login
        </button>
      </form>
      <p>{loginOutput}</p>
    </div>
  );
}