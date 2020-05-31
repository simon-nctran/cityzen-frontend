import React, { useContext, useState } from "react";
import { addUser } from "../apiUser";
import UserContext from "../UserContext";

export default function RegistrationForm() {
  const { setToken } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");

  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setOutput("Registering..");

    addUser(username, password)
      .then((res) => {
        console.log(res);
        if (res.data === "Registration successful") {
          setToken(res.headers["x-auth-token"]);
          setOutput(<></>);
          if (remember) {
            localStorage.setItem("auth-token", res.headers["x-auth-token"]);
          }
        } else if (res.data === "Username already exists") {
          setOutput("Username already exists");
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(`Something went wrong: ${err.message}, ${err.response.data}`);
      });
  }

  return (
    <>
      <h1>Registration Form:</h1>
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
          Register
        </button>
      </form>
      <label htmlFor="registration-checkbox">
        Remember me
        <input
          type="checkbox"
          id="registration-checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
      </label>
      <div className="registration-output">{output}</div>
      <br />
    </>
  );
}
