import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Healing Therapy Application</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/therapy">Therapy</Link></li>
        <li><a href="/sessions">Sessions</a></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
