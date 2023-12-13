// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import baseUrl from "../constants/baseUrl";

const MobileDropdown = ({ dropdown, onClick, mobileMenuClick }) => {
  // const [menus, setMenus] = useState([]);
  // useEffect(() => {
  //   const getCollections = async () => {
  //     const res = await fetch(`${baseUrl}/api/v1/category`);
  //     const data = await res.json();
  //     setMenus(data.data);
  //   };
  //   getCollections();
  // }, []);
  // return (
  //   <ul
  //     className={`mobile-dropdown ${
  //       dropdown ? "mobile-dropdown-visible" : "mobile-dropdown-not-visible"
  //     }`}
  //   >
  //     {menus.map((submenu, index) => (
  //       <li onClick={onClick} key={index} className="menu-items">
  //         <NavLink onClick={mobileMenuClick} to={`collections/${submenu.id}`}>
  //           {submenu.name}
  //         </NavLink>
  //       </li>
  //     ))}
  //   </ul>
  // );
};

export default MobileDropdown;
