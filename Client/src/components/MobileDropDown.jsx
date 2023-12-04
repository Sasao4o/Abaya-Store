import { NavLink } from "react-router-dom";

const MobileDropdown = ({
  submenus,
  dropdown,
  onClick,
  mobileMenuClick,
  setDropdown,
}) => {
  return (
    <ul
      className={`mobile-dropdown ${
        dropdown ? "mobile-dropdown-visible" : "mobile-dropdown-not-visible"
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

export default MobileDropdown;
