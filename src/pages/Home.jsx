import React, { useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Home() {
  const [journey, setJourney] = useState(null);

  function getWayPoints(points) {
    setJourney(points);
    console.log("The Journey is:", points);
  }

  return (
    <div className="home">
      <div className="header">
        <Header getWayPoints={getWayPoints} />
      </div>

      <div className="map">
        <Map journey={journey} />
      </div>
    </div>
  );
}
