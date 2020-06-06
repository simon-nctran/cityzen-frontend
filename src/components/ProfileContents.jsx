/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

// import Favourites from "../components/Favourites";

import { useFavourites, deleteFavourite } from "../api/apiFavourites";

import UserContext from "../UserContext";

export default function ProfileContents({ logout }) {
  const { userStatus, token } = useContext(UserContext);
  const { loading, userData, error } = userStatus;

  if (loading) {
    return (
      <h1>
        Loading your profile..
        {console.log("loading your profile..")}
      </h1>
    );
  }

  if (error) {
    return <h1>Something went wrong: {error.message}</h1>;
  }

  return (
    <div className="profile">
      {userData && (
        <Row>
          <Col></Col>
          <Col>
            <div className="userProfile">
              <h1>Hi there, {userData.username}</h1>
              <div className="profileDetails">
                <Row>
                  <Col>
                    <h3>Your Profile:</h3>

                    <p>Username: {userData.username}</p>
                  </Col>
                  <Col md="auto">
                    <div className="userFavourites">
                      <MapFavourites token={token} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      )}
      <div className="logout">
        <h2>Thank you for trying out Cityzen!</h2>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

function MapFavourites({ token }) {
  const { loading, favourites, error } = useFavourites(token);
  if (loading) {
    return <p>Hold tight while we get your Favourites...</p>;
  }
  if (error) {
    return <p>We weren't able to get your Favourites :'(: {error.message}</p>;
  }

  return (
    <div>
      {favourites.map((favourite) => (
        <Favourite key={favourite._id} {...favourite} />
      ))}
    </div>
  );
}

function Favourite(favourite) {
  const { token } = useContext(UserContext);
  const { _id, origin, destination, poi, mode } = favourite;

  const [hide, setHide] = useState(false);

  function handleSubmit(event) {
    console.log({ origin, destination, poi, mode });
    event.preventDefault();
    deleteFavourite(token, _id)
      .then((res) => {
        console.log(res);
        if (res.data === "Delete favourite successfully") {
          alert(res.data);
          setHide(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`profileFavourite profileFavourite-${_id}`} key={_id}>
      <div className={`profileFavouriteDetails ${hide ? "hide" : ""}`}>
        <Row>
          <Col>
            <Button variant="danger" onClick={handleSubmit}>
              Delete
            </Button>
          </Col>
          <Col>
            Origin: {origin}
            <br />
            Destination: {destination}
            <br />
            Point of Interest: {poi}
            <br />
            Mode: {mode}
          </Col>
        </Row>
      </div>
    </div>
  );
}
