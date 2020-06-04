import React, { useContext, useState } from "react";
import { useUser } from "../api/apiUser";

import { Button } from "react-bootstrap";

import UserContext from "../UserContext";

export default function Favourites() {
  const { token } = useContext(UserContext);
  const [showFavourites, setShowFavourites] = useState(false);

  const { loading, userData, error } = useUser(token);

  if (loading) {
    return <p>Hold tight while we get your Favourites...</p>;
  }
  if (error) {
    return <p>We weren't able to get your Favourites :'(: {error.message}</p>;
  }

  console.log(userData.searchOptions);

  return (
    <div className="favourites">
      <Button
        className={"btn"}
        onClick={() => setShowFavourites(!showFavourites)}
      >
        {showFavourites ? "Hide Favourites" : "Show Favourites"}
      </Button>
      <FavouritesExtended userData={userData} showFavourites={showFavourites} />
    </div>
  );
}

function Favourite(favourite) {
  const { id, origin, destination, poi, mode } = favourite;

  return (
    <div className={`favourite favourite-${id}`} key={id}>
      <div className="favouriteDetails">
        Origin: {origin} | Destination: {destination} | Point of Interest: {poi}{" "}
        | Mode: {mode}
      </div>
    </div>
  );
}

function FavouritesExtended(props) {
  const { userData, showFavourites } = props;

  return (
    <div className={`favourites-shown ${showFavourites ? "show" : ""}`}>
      <h3>Favourite Options</h3>
      {userData.searchOptions.map((favourite) => (
        <Favourite key={favourite.id} {...favourite} />
      ))}
    </div>
  );
}
