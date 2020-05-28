import React from "react";
import { useUser } from "../api";

export default function Favourites({ username }) {
  const { loading, userData, error } = useUser(username);

  return (
    <div className="favourites-list">
      {loading ? (
        <h1>Loading list...</h1>
      ) : (
        <>
          {error ? (
            <h1>Error output, {error.message}</h1>
          ) : (
            <>
              <h1>Intended output using {userData} </h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
