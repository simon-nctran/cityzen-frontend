import React, { useContext } from "react";
import { useUser } from "../api/apiUser";

import UserContext from "../UserContext";

export default function Favourites() {
  const { token } = useContext(UserContext);

  const { loading, userData, error } = useUser(token);

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
              {/* <p>Intended output using {userData.username} </p> */}
              <div>
                These are your Saved Search Options:
                {userData.searchOptions.map((search) => {
                  return (
                    <li key={search._id}>
                      {/* key attribute shouldn't be too important */}
                      {/* https://reactjs.org/docs/lists-and-keys.html */}
                      {/* https://reactjs.org/docs/reconciliation.html#recursing-on-children */}
                      Origin: {search.origin}, Destination: {search.destination}
                      , POI: {search.poi}, Mode: {search.mode}
                    </li>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
