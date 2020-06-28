import React, { useContext, useState } from "react";

import { Button, Form, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import { addFavourite } from "../api/apiFavourites";

import UserContext from "../UserContext";

// Input Component (child to Home Component)
export default function Input({ getWayPoints, setInitial }) {
  const { userStatus, token } = useContext(UserContext);
  const { userData, error } = userStatus;

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [poi, setPoi] = useState("Select...");
  const [mode, setMode] = useState("");

  const [save, setSave] = useState("Save");

  function onSubmit() {
    if (origin === "" || destination === "" || poi === "Select..." || mode === "") {
      alert("Origin, Destination, Point of Interest and/or Mode cannot be empty!");
    } else {
      setInitial(false);
      getWayPoints({
        origin,
        destination,
        poi,
        mode,
      });
    }
  }

  function handleSubmit(event) {
    if (origin === "" || destination === "" || poi === "Select..." || mode === "") {
      alert("Origin, Destination, Point of Interest and/or Mode cannot be empty!");
    } else {
      event.preventDefault();
      setSave("Saving journey as favourite...");
      addFavourite(token, {
        origin,
        destination,
        poi,
        mode,
      })
        .then((res) => {
          console.log(res);
          if (res.data === "Successfully added favourite") {
            alert(res.data);
            setSave("Save");
          } else {
            setSave("Saved!");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            alert(err.response.data);
            setSave("Save");
          } else {
            alert(`Something went wrong, please try again later`);
          }
        });
    }
  }

  return (
    <div className="journey-input">
      <Form>
        <Form.Row>
          <Col sm={3}>
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
          <Col sm={3}>
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
          <Col sm={3}>
            <Form.Group controlId="formJourneyPOI">
              <Form.Label>What would you like?</Form.Label>
              <Form.Control
                as="select"
                value={poi}
                onChange={(event) => {
                  console.log(event.target.value);
                  setPoi(event.target.value);
                }}
                custom
              >
                <option disabled>Select...</option>
                <PopulateOptions />
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>How will you be travelling? </Form.Label>
              <br />
              <ToggleButtonGroup
                name="mode"
                defaultValue={mode}
                value={mode}
                onChange={(value) => {
                  console.log(value);
                  setMode(value);
                }}
              >
                <ToggleButton value="driving" variant="dark-teal">
                  Car
                </ToggleButton>
                <ToggleButton value="walking" variant="dark-teal">
                  Walk
                </ToggleButton>
                <ToggleButton value="cycling" variant="dark-teal">
                  Bike
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <Button variant="orange" onClick={onSubmit}>
        Search
      </Button>
      {userData !== null && error == null ? (
        <Button variant="light-teal" onClick={handleSubmit}>
          {save}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

/* populate the drop down by mapping each option: https://stackoverflow.com/questions/43019816/populate-dropdown-select-with-props-react */
function PopulateOptions() {
  const options = [
    "Bagel",
    "Cafe",
    "Fuel",
    "Hotel",
    "Parking",
    "Pharmacy",
    "Police station",
    "Post office",
    "Restaurant",
    "Supermarket",
  ];

  return options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));
}
