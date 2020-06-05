/* eslint-disable no-underscore-dangle */
import React, { useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

export default function ProfileContents({ logout }) {
  const { userStatus } = useContext(UserContext);
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
        <div className="userProfile">
          <h1>Hi there, {userData.username}</h1>

          <div className="profileDetails">
            <Row>
              <Col>
                <h3>Your Profile:</h3>

                <p>Username: {userData.username}</p>
              </Col>
              <Col>
                <div className="savedSearchOptions">
                  Saved Search Options:
                  {userData.searchOptions.map((search) => {
                    return (
                      <li key={search._id}>
                        {/* key attribute shouldn't be too important */}
                        {/* https://reactjs.org/docs/lists-and-keys.html */}
                        {/* https://reactjs.org/docs/reconciliation.html#recursing-on-children */}
                        Origin: {search.origin}, Destination:{" "}
                        {search.destination}, POI: {search.poi}, Mode:{" "}
                        {search.mode}
                      </li>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <div className="logout">
        <h2>Thank you for trying out Cityzen!</h2>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
