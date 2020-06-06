import React, { useState, useContext } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Favourites from "../components/Favourites";
import Map from "../components/Map";

import UserContext from "../UserContext";

export default function Journey() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  const [journey, setJourney] = useState({});

  function getWayPoints(points) {
    setJourney(points);
    console.log("The Journey is:", points);
  }

  return (
    <div className="main">
      <div className="header">
        <Header />
      </div>

      <div className="input">
        <Input getWayPoints={getWayPoints} />
      </div>

      <div className="favourites">
        {userData !== null && error == null ? <Favourites /> : <> </>}
      </div>

      <div className="map">
        <Map journey={journey} />
      </div>
    </div>
  );
}
