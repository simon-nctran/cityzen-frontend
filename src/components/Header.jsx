import React, { useContext } from "react";

import UserContext from "../UserContext";

// Header Component (child to App Component)
export default function Header({ getWayPoints }) {
  const { userStatus, token } = useContext(UserContext);
  const { userData, error } = userStatus;

  return (
    <div>
      <div className="header">
        {userData !== null && error == null ? (
          <h2>Welcome {userData.username}! Let&apos;s plan your journey!</h2>
        ) : (
          <h2>Welcome! Let&apos;s plan your journey!</h2>
        )}
      </div>
    </div>
  );
}
