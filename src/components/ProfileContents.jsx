/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

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
          <Col xs="auto">
            <div className="userProfile">
              <h1>Hi there, {userData.username}</h1>
              <div className="profileDetails">
                <Row>
                  <Col>
                    <MapFavourites token={token} />
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
        <Button variant="black" onClick={logout}>
          Logout
        </Button>
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
      {favourites.length === 0 ? (
        <>
          <h5>You don't have any favourites saved</h5>
          <h6>Go back to Home to save some!</h6>
        </>
      ) : (
        <>
          <h3>Here are your favourites:</h3>
          {favourites.map((favourite) => (
            <Favourite key={favourite._id} {...favourite} />
          ))}
        </>
      )}
    </div>
  );
}

function Favourite(favourite) {
  const { token } = useContext(UserContext);
  const { _id, origin, destination, poi, mode } = favourite;
  const description = "Find " + poi + " from '" + origin + "' to '" + destination + "' by " + mode;

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
          <Col xs={9}>{description}</Col>
          <Col>
            <Button size="sm" variant="orange" onClick={handleSubmit}>
              Delete
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
