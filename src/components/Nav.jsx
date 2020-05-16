import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/places">Places</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default Nav;
