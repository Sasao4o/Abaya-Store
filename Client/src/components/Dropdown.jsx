import { NavLink } from "react-router-dom";

const Dropdown = ({ submenus, dropdown, onClick, mobileMenuClick }) => {
  return (
    <ul
      className={`dropdown ${
        dropdown ? "dropdown-visible" : "dropdown-not-visible"
      }`}
    >
      {submenus.map((submenu, index) => (
        <li onClick={onClick} key={index} className="menu-items">
          <NavLink onClick={mobileMenuClick} to={submenu.url}>
            {submenu.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
