import React, { useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Home() {
  const [journey, setJourney] = useState({});

  function displayJourney(journey) {
    setJourney(journey);
    console.log("The Journey is:", journey);
    return journey;
  }

  return (
    <React.Fragment>
      <Header getWaypoints={displayJourney} />
      <Map journey={journey}/>
    </React.Fragment>
  );
}
