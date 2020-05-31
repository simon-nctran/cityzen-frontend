import React, { useContext, useState } from "react";
import { getLogin } from "../apiUser";
import UserContext from "../UserContext";

export default function LoginForm() {
  const { setToken } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");

  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setOutput("Logging in..");

    getLogin(username, password)
      .then((res) => {
        console.log(res);
        console.log(res.headers);
        if (res.data === "Login successful") {
          setToken(res.headers["x-auth-token"]);
          setOutput(<></>);
          if (remember) {
            localStorage.setItem("auth-token", res.headers["x-auth-token"]);
          }
        } else if (res.data === "Username not found") {
          setOutput("Username not found");
        } else if (res.data === "Invalid password") {
          setOutput("Invalid password ");
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(`Something went wrong: ${err.message}, ${err.response.data}`);
      });
  }

  return (
    <>
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
      <label htmlFor="login-checkbox">
        Remember me
        <input
          type="checkbox"
          id="login-checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
      </label>
      <div className="login-output">{output}</div>
      <br />
    </>
  );
}
