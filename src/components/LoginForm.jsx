import React, { useContext, useState } from "react";
import { getLogin } from "../api/apiUser";
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
        if (res.data === "Login successful") {
          setToken(res.headers["x-auth-token"]);
          setOutput(<></>);
          if (remember) {
            localStorage.setItem("auth-token", res.headers["x-auth-token"]);
          }
        } else {
          setOutput("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          // error has .response property if the error was explicitly sent by the server
          setOutput(err.response.data);
          /*
          if (err.response.data === "Username not found") {
            setOutput("Username not found");
          } else if (err.response.data === "Invalid password") {
            setOutput("Invalid password");
          }
           */
        } else {
          setOutput(`Something went wrong: ${err.message}`); // All error objects have .message property
        }
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
