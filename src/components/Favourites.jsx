/* eslint-disable react/destructuring-assignment,no-underscore-dangle */
import React, { useContext, useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import UserContext from "../UserContext";

import { useFavourites, deleteFavourite } from "../api/apiFavourites";

export default function Favourites(props) {
  const { token } = useContext(UserContext);

  const [showFavourites, setShowFavourites] = useState(false);

  // console.log(props);

  return (
    <div className="favourites">
      <Button size="sm" className="dark-teal" onClick={() => setShowFavourites(!showFavourites)}>
        {showFavourites ? "Hide Favourites" : "Show Favourites"}
      </Button>
      {showFavourites ? (
        <FavouritesExtended
          token={token}
          showFavourites={showFavourites}
          setInitial={props.setInitial}
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
  const description = "Find " + poi + " from '" + origin + "' to '" + destination + "' by " + mode;

  const [hide, setHide] = useState(false);

  // console.log(props.get);

  function handleSubmit(event) {
    // console.log({ origin, destination, poi, mode });
    event.preventDefault();
    deleteFavourite(token, _id)
      .then((res) => {
        // console.log(res);
        if (res.data === "Delete favourite successfully") {
          alert(res.data);
          setHide(true);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  function onSubmit() {
    // console.log({ origin, destination, poi, mode });
    props.setInitial(false);
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
          <Col style={{}}>{description}</Col>
        </Row>
        <Row>
          <Col>
            <Button size="sm" variant="light-teal" onClick={onSubmit}>
              Apply
            </Button>
            <Button size="sm" variant="orange" onClick={handleSubmit}>
              Delete
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function FavouritesExtended(props) {
  const { token, showFavourites } = props;
  // console.log(props.get);

  const { loading, favourites, error } = useFavourites(token);

  if (loading) {
    return <p>Hold tight while we get your Favourites...</p>;
  }
  if (error) {
    return <p>We weren't able to get your Favourites :'(, please try again later.</p>;
  }

  return (
    <div className={`favourites-shown ${showFavourites ? "show" : ""}`}>
      <Row>
        <Col></Col>
        <Col xs="auto">
          <div className="favourites-list">
            {favourites.length === 0 ? (
              <h4>You haven't saved any favourites yet!</h4>
            ) : (
              <>
                <h4>Your Favourite Journeys</h4>
                {favourites.map((favourite) => (
                  <Favourite
                    key={favourite._id}
                    {...favourite}
                    get={props.get}
                    setInitial={props.setInitial}
                  />
                ))}
              </>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
