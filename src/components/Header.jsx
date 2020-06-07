import React, { useContext } from "react";

import UserContext from "../UserContext";

// Header Component (child to App Component)
export default function Header({ getWayPoints }) {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  return (
    <div className="header">
      {userData !== null && error == null ? (
        <h2>Let&apos;s plan your journey, {userData.username}!</h2>
      ) : (
        <h2>Let&apos;s plan your journey!</h2>
      )}
    </div>
  );
}
