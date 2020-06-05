import React, { useContext, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import Favourites from "./Favourites";

import UserContext from "../UserContext";

// Header Component (child to App Component)
export default function Header({ getWayPoints }) {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [poi, setPoi] = useState("Select...");
  const [mode, setMode] = useState("");

  function onSubmit() {
    if (origin === "" || destination === "" || poi === "Select...") {
      alert("Origin, Destination and/or Point of Interest cannot be empty!");
    } else {
      console.log({ origin, destination, poi, mode });
      getWayPoints({
        origin,
        destination,
        poi,
        mode,
      });
    }
  }

  return (
    <div>
      <div className="appName">
        <h1>Welcome to Cityzen!</h1>
        {userData !== null && error == null ? (
          <h2>Let&apos;s plan your journey {userData.username}!</h2>
        ) : (
          <h2>Let&apos;s plan your journey!</h2>
        )}
      </div>
      <div className="getDirections">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formJourneyOrigin">
                <Form.Label>Where are you right now?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Origin"
                  value={origin}
                  onChange={(event) => {
                    setOrigin(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formJourneyDestination">
                <Form.Label>Where do you want to go?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setDestination(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formJourneyPOI">
                <Form.Label>What would you like?</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={poi}
                  value={poi}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setPoi(event.target.value);
                  }}
                >
                  <option disabled>Select...</option>
                  <option>Coffee</option>
                  <option>Toilet</option>
                  <option>Food</option>
                  <option>Shopping</option>
                  <option>Fuel</option>
                  <option>Accommodation</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToggleButtonGroup
                name="mode"
                value={mode}
                onChange={(value) => {
                  console.log(value);
                  setMode(value);
                }}
              >
                <ToggleButton value="driving">Car</ToggleButton>
                <ToggleButton value="walking">Walk</ToggleButton>
                <ToggleButton value="cycling">Bike</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Form>
        <Button variant="success" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
