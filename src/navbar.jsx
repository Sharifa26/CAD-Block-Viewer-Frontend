import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"> CAD Block Viewer</div>
      <div className="nav-links">
        <Link to="/">Upload</Link>
        <Link to="/search">Search</Link>
        <Link to="/block">Block</Link>
      </div>
    </nav>
  );
}

export default Navbar;
