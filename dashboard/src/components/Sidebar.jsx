import React, { useContext } from "react";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import baseUrl from "../constants/baseUrl";

export default function Sidebar() {
  const { userData, logOut } = useContext(UserContext);
  return (
    <div className="sidebar">
      <Link to="/">
        <h1>LEVEL</h1>
      </Link>
      {userData.isAuthenticated && (
        <>
          <ul>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/collections">Collections</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/adddiscount">Add discount</NavLink>
            </li>
          </ul>
          <button onClick={logOut}>Logout</button>
        </>
      )}
      <div>
        <Link to={baseUrl}>View your website</Link>
      </div>
    </div>
  );
}
