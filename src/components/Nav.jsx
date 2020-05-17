import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}

export default Nav;
