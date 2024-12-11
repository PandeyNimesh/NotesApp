import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="capitalize">
        Home
      </NavLink>
      <NavLink to="/pastes" className="capitalize">
        Paste
      </NavLink>
    </div>
  );
};

export default Navbar;
