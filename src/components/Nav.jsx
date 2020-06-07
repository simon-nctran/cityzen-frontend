import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

// App Navigation Component
export default function Navigation() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  return (
    <div className="navigation">
      <Row>
        <Col xs={{ offset: 1 }} className="title">
          <NavLink to="/journey">
            <h2>ON THE WAY</h2>
          </NavLink>
        </Col>

        <nav>
          <Col xs="auto">
            <NavLink exact to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to="journey">
              <p>Journey</p>
            </NavLink>
            <NavLink to="/profile">
              {userData !== null && error == null ? (
                <p>Hello {userData.username}!</p>
              ) : (
                <p>Profile</p>
              )}
            </NavLink>
          </Col>
        </nav>
      </Row>
    </div>
  );
}
