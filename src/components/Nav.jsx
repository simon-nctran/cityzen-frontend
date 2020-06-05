import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

// App Navigation Component
export default function Nav() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  return (
    <nav>
      <Container className="navigation">
        <Row>
          <Col xs="auto" className="title">
            <h2>CITYZEN</h2>
          </Col>
          <Col></Col>
          <Col xs="auto">
            <NavLink exact to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to="/profile">
              {userData !== null && error == null ? (
                <p>Hello {userData.username}!</p>
              ) : (
                "Profile"
              )}
            </NavLink>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}
