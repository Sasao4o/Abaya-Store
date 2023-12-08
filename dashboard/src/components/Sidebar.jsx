import React from "react";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <h1>LEVEL</h1>
      </Link>
      <ul>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="">Collections</NavLink>
        </li>
        <li>
          <NavLink to="">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
}
