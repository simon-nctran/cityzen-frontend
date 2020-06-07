import React, { useState, useContext } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Favourites from "../components/Favourites";
import Map from "../components/Map";

import UserContext from "../UserContext";

export default function Journey() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;
  const [initial, setInitial] = useState(true);

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
        <Input getWayPoints={getWayPoints} setInitial={setInitial} />
      </div>

      <div className="favourites">
        {userData !== null && error == null ? (
          <Favourites getWayPoints={getWayPoints} setInitial={setInitial} />
        ) : (
          <> </>
        )}
      </div>
      {initial ? (
        <div className="home" align="middle">
          <div className="welcome">
            {console.log(initial)}
            <h1>🏙 Welcome to Cityzen! 🏙</h1>
            <h3>
              This app will help you find services and points of interest from
              where you are to where you want to go!
            </h3>
            <br />
            <h4>⬆️ Fill out the above form to get started! ⬆️</h4>
          </div>
          <div>
            <footer>
              <p>This app was created by the members of Cityzen.</p>
              <p>The University of Melbourne, 2020</p>
            </footer>
          </div>
        </div>
      ) : (
        <div className="map">
          {console.log(initial)}
          <Map journey={journey} />
        </div>
      )}
    </div>
  );
}
