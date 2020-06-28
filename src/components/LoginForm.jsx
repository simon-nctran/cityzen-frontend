import React, { useContext, useState } from "react";
import { getLogin } from "../api/apiUser";
import UserContext from "../UserContext";

import { Button, Form, Row, Col } from "react-bootstrap";

// Login Form Component (child to Profile Component)
export default function LoginForm() {
  const { setToken } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");

  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    if (!username || !password) {
      alert("Username and/or password cannot be blank");
    } else {
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
            // error has .response property if the error was explicitly sent by the backend
            // they are user-friendly strings
            setOutput(err.response.data);
          } else {
            setOutput("Something went wrong, please try again later");
          }
        });
    }
  }

  return (
    <div className="forms">
      <h1 className="formHeader">Login</h1>
      <div className="formInputs">
        <Form>
          <Row>
            <Col></Col>
            <Col xs="auto">
              <Form.Group controlId="formProfileUsername">
                <Form.Control
                  as="input"
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formProfilePassword">
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Form.Group as={Row} controlId="formLoginRememberMe">
            <Col>
              <Form.Check
                label="Remember me"
                type="checkbox"
                id="login-checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
            </Col>
          </Form.Group>
          <Button variant="orange" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <br />
        <div className="login-output">{output}</div>
        <br />
      </div>
    </div>
  );
}
