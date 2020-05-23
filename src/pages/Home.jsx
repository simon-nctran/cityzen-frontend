import React, { useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Home() {
  const [journey, setJourney] = useState({});

  function getWayPoints(points) {
    setJourney(points);
    console.log("The Journey is:", points);
  }

  return (
    <React.Fragment>
      <Header getWayPoints={getWayPoints} />
      <Map journey={journey}/>
    </React.Fragment>
  );
}
