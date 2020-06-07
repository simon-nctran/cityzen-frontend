import React, { useContext, useState } from "react";
import { addUser } from "../api/apiUser";
import UserContext from "../UserContext";

import { Button, Form, Row, Col } from "react-bootstrap";

export default function RegistrationForm() {
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
          if (res.data === "Username already exists") {
            setOutput("Username already exists");
          }
           */
          } else {
            setOutput(`Something went wrong: ${err.message}`); // All error objects have .message property
          }
        });
    }
  }

  return (
    <div className="forms">
      <h1 className="formHeader">Register</h1>
      <div className="formInputs">
        <Form>
          <Row>
            <Col></Col>
            <Col xs="auto">
              <Form.Group controlId="formProfileUsername">
                <Form.Control
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formProfilePassword">
                <Form.Control
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
          <Form.Group as={Row} controlId="formRegistrationRememberMe">
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
          <Button variant="dark-teal" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
        <br />

        <div className="registration-output">{output}</div>
        <br />
      </div>
    </div>
  );
}
