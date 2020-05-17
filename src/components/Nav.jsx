import React from "react";
import { NavLink } from "react-router-dom";

// App Navigation Component
export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}
