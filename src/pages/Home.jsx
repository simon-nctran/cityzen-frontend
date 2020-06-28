import React, { useState, useContext } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Favourites from "../components/Favourites";
import Map from "../components/Map";

import { Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

// Input Component (child to App Component)
export default function Home() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;
  const [initial, setInitial] = useState(Boolean(!userData)); // initial load of home; is always false if logged in
  const [journey, setJourney] = useState(null);

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
            <h1>
              <span role="img" aria-label="cityscape">
                🏙
              </span>{" "}
              Welcome to Cityzen!{" "}
              <span role="img" aria-label="cityscape">
                🏙
              </span>
            </h1>
            <h3>
              This app will help you find services and points of interest from
              where you are to where you want to go!
            </h3>
            <br />
            <h4>
              <span role="img" aria-label="arrow-up">
                ⬆️
              </span>{" "}
              Fill out the above form to get started!{" "}
              <span role="img" aria-label="arrow-up">
                ⬆️
              </span>
            </h4>
            <br />
            <Row>
              <Col xs={{ span: 4, offset: 4 }}>
                <div className="instructions">
                  <ol>
                    <li>
                      We'll generate a route from your selected origin to your
                      selected destination as well as POIs along that route
                    </li>
                    <li>
                      All you have to do is click on your preferred POI and
                      we'll get you a route that makes a detour to the POI!
                    </li>
                    <li>
                      If you're not happy with your pick, just click 'Search' to
                      try again :)
                    </li>
                    <li>
                      But if you like what you've seen, make an account with us
                      which will let you save your searches!
                    </li>
                  </ol>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <footer>
              <br />
              This app was created by Simon Tran, Tarra Co, Anthony Giang, and Yutao Wang.
            </footer>
          </div>
        </div>
      ) : (
        <div className="map">
          <Map journey={journey} />
        </div>
      )}
    </div>
  );
}
