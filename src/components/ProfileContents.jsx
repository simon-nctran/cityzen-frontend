/* eslint-disable no-underscore-dangle */
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import UserContext from "../UserContext";

export default function ProfileContents({ logout }) {
  const { userStatus } = useContext(UserContext);
  const { loading, userData, error } = userStatus;

  return (
    <>
      {loading ? (
        <h1>
          Loading your profile..
          {console.log("loading your profile..")}
        </h1>
      ) : (
        <>
          {error ? (
            <h1>
              Something went wrong: {error.response.data}, {error.message}
            </h1>
          ) : (
            <>
              {userData && (
                <>
                  <h1>Hi there, {userData.username}</h1>
                  <br />
                  <h3>Your Profile:</h3>
                  <div className="profileDetails">
                    <p>Username: {userData.username}</p>
                    <div>
                      Saved Search Options:
                      {userData.searchOptions.map((search) => {
                        return (
                          <li key={search._id}>
                            {/* key attribute shouldn't be too important */}
                            {/* https://reactjs.org/docs/lists-and-keys.html */}
                            {/* https://reactjs.org/docs/reconciliation.html#recursing-on-children */}
                            Origin: {search.origin}, Destination: {search.destination}, POI:{" "}
                            {search.poi}, Mode: {search.mode}
                          </li>
                        );
                      })}
                    </div>
                  </div>
                  <br />
                  <h2>Thank you for trying out Cityzen!</h2>
                </>
              )}
            </>
          )}
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </>
  );
}
