import React from "react";
import { Button } from "react-bootstrap";

import { useUser } from "../api";

export default function ProfileContents({ username, logout }) {
  const { loading, userData, error } = useUser(username);

  return (
    <>
      {loading ? (
        <h1>Loading your profile..</h1>
      ) : (
        <>
          {error ? (
            <h1>Something went wrong: {error.message}</h1>
          ) : (
            <>
              <h1>Hi there, {userData.username}</h1>
              <br />
              <h3>Your Profile:</h3>
              <div className="profileDetails">
                <p>Username: {userData.username}</p>
                <p>Password: {userData.password}</p>
                <p>Email Address: {userData.emailAddress}</p>
                {/* <p>Saved Searches: {userData.saved}</p> */}
              </div>
              <br />
              <h2>Thank you for trying out Cityzen!</h2>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </>
      )}
    </>
  );
}
