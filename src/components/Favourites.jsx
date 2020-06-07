import React, { useContext, useState } from "react";

import { Button, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

import { useFavourites, deleteFavourite } from "../api/apiFavourites";

export default function Favourites(props) {
  const { token } = useContext(UserContext);

  const [showFavourites, setShowFavourites] = useState(false);

  console.log(props);

  return (
    <div className="favourites">
      <Button
        className={"btn"}
        onClick={() => setShowFavourites(!showFavourites)}
      >
        {showFavourites ? "Hide Favourites" : "Show Favourites"}
      </Button>
      {showFavourites ? (
        <FavouritesExtended
          token={token}
          showFavourites={showFavourites}
          get={props.getWayPoints}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

function Favourite(props) {
  const { token } = useContext(UserContext);
  const { _id, origin, destination, poi, mode } = props;

  const [hide, setHide] = useState(false);

  console.log(props.get);

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

  function onSubmit() {
    console.log({ origin, destination, poi, mode });
    props.get({
      origin,
      destination,
      poi,
      mode,
    });
  }

  return (
    <div className={`favourite favourite-${_id}`} key={_id}>
      <div className={`favouriteDetails ${hide ? "hide" : ""}`}>
        <Row>
          <Col xs={3}>Origin: {origin}</Col>
          <Col xs={3}>Destination: {destination}</Col>
          <Col xs={3}>Point of Interest: {poi}</Col>
          <Col xs={3}>Mode: {mode}</Col>
        </Row>
        <Row>
          <Col>
            <Button variant="warning" onClick={onSubmit}>
              Apply
            </Button>
            <Button variant="danger" onClick={handleSubmit}>
              X
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function FavouritesExtended(props) {
  const { token, showFavourites } = props;

  console.log(props.get);

  const { loading, favourites, error } = useFavourites(token);

  if (loading) {
    return <p>Hold tight while we get your Favourites...</p>;
  }
  if (error) {
    return <p>We weren't able to get your Favourites :'(: {error.message}</p>;
  }

  return (
    <div className={`favourites-shown ${showFavourites ? "show" : ""}`}>
      <h3>Favourite Options</h3>
      {favourites.map((favourite) => (
        <Favourite key={favourite._id} {...favourite} get={props.get} />
      ))}
    </div>
  );
}
