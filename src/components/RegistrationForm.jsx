import React, { useContext, useState } from "react";
import { addUser } from "../api";
import UserContext from "../UserContext";

export default function RegistrationForm() {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [output, setOutput] = useState(<React.Fragment />);

  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    addUser(username, password, email)
      .then((res) => {
        console.log(res);
        if (res.data === "Registration successful") {
          setUser(username);
          if (remember) {
            localStorage.setItem("username",username);
          }

        } else if (res.data === "Username already exists") {
          setOutput(
            <>
              <p>Username already exists</p>
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
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Register
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
