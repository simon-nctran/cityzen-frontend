import React, { useContext, useState } from "react";
import { getLogin } from "../api";
import UserContext from "../UserContext";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState(<React.Fragment />);

  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    getLogin(username, password)
      .then((res) => {
        console.log(res);
        if (res.data === "Login successful") {
          setUser(username);
          if (remember) {
            localStorage.setItem("username",username);
          }

        } else if (res.data === "Username not found") {
          setOutput(
            <>
              <p>Username not found</p>
            </>
          );

        } else if (res.data === "Invalid password") {
          setOutput(
            <>
              <p>Invalid password </p>
            </>
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setOutput(JSON.stringify(err));
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
      <label>
        Remember me
        <input
          type="checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
      </label>
      {output}
      <br />
      <br />
    </>
  );
}
