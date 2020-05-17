import React, { useState } from "react";

import { getWaypoints } from "../api";
import Button from "../components/Button";

// App Header Component to get
export default function Header() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  function onSubmit() {
    getWaypoints({
      origin,
      destination,
    });
  }

<<<<<<< HEAD
  React.useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);

=======
>>>>>>> fb0d0dfdeb2bfea1efee2fbc431e380768a71ef9
  return (
    <div>
      <div className="appName">
        <h1>Welcome to Cityzen!</h1>
        <h2>Let's plan your journey!</h2>
      </div>
      <div className="getDirections">
        <form id="getDirections">
          <label>
            Where are you right now?
            <input
              id="origin"
              type="text"
              placeholder="Origin"
              name="origin"
              value={origin}
              onChange={(event) => {
                setOrigin(event.target.value);
              }}
            />
          </label>
          <label>
            Where do you want to go?
            <input
              id="destination"
              type="text"
              placeholder="Destination"
              name="destination"
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
              }}
            />
          </label>
        </form>
      </div>
      <Button className={"btn-success"} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
