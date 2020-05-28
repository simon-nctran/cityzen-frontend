import React, { useContext, useState } from "react";

import { Button, Form, Row, Col } from "react-bootstrap";

import Favourites from "./Favourites";

import UserContext from "../UserContext";

// Header Component (child to App Component)
export default function Header({ getWayPoints }) {
  const { user } = useContext(UserContext);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [poi, setPoi] = useState("Select...");

  function onSubmit() {
    if (origin === "" || destination === "" || poi === "Select...") {
      alert("Origin, Destination and/or Point of Interest cannot be empty!");
    } else {
      console.log({ origin, destination, poi });
      getWayPoints({
        origin,
        destination,
      });
    }
  }

  return (
    <div>
      <div className="appName">
        <h1>Welcome to Cityzen!</h1>
        {user !== null ? (
          <h2>Let&apos;s plan your journey {user}!</h2>
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
        </Form>
      </div>
      <Button variant="success" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
