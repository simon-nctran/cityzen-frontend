import React, { useState } from "react";

import { newJourney } from "../api";
import Button from "../components/Button";

export default function Header() {
  //   const [origin, setOrigin] = useState("");
  //   const [destination, setDestination] = useState("");
  //   const [options, setOptions] = useState("");

  function onSubmit() {
    // getDirections({
    //     origin,
    //     destination,
    //     options
    // });
  }

  return (
    <div>
      <div className="appName">
        <h1>Welcome to Cityzen!</h1>
        <h2>Let's plan your journey!</h2>
      </div>
      <div className="getDirections">
        <form>
          <label for="origin">
            Where are you right now?{" "}
            <input id="origin" type="text" placeholder="Origin" name="origin" />
          </label>
          <label for="destination">
            Where do you want to go?
            <input
              id="destination"
              type="text"
              placeholder="Destination"
              name="destination"
            />
          </label>
          <label for="options">
            What do you want on the way?{" "}
            <select id="options">
              <option value="Food">Food</option>
              <option value="Coffee">Coffee</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}
