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
  const [transportType, setTransportType] = useState("Walk");

  function onSubmit() {
    if (origin === "" || destination === "" || poi === "Select...") {
      alert("Origin, Destination and/or Point of Interest cannot be empty!");
    } else {
      console.log({ origin, destination, poi, transportType });
      getWayPoints({
        origin,
        destination,
      });
    }
  }

  return (
    <div>
      <div className="header">
        {userData !== null && error == null ? (
          <h2>Welcome {userData.username}! Let&apos;s plan your journey!</h2>
        ) : (
          <h2>Welcome! Let&apos;s plan your journey!</h2>
        )}
      </div>
      <div className="userFavorites">
        {userData !== null && error == null ? <Favourites /> : <> </>}
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
            <Col>
              <Form.Group>
                <Form.Label>How will you be travelling? </Form.Label>
                <br />
                <ToggleButtonGroup
                  name="transportType"
                  defaultValue={transportType}
                  value={transportType}
                  onChange={(value) => {
                    console.log(value);
                    setTransportType(value);
                  }}
                >
                  <ToggleButton value="Driving">Car</ToggleButton>
                  <ToggleButton value="Walking">Walk</ToggleButton>
                  <ToggleButton value="Cycling">Bike</ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button variant="success" onClick={onSubmit}>
          Submit
        </Button>
        {userData !== null && error == null ? (
          <Button variant="info" onClick>
            Save
          </Button>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}
