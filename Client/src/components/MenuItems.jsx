import { useRef, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { NavLink } from "react-router-dom";

export const MenuItems = ({ items, onClick }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  return (
    <li className="menu-items" ref={ref}>
      {items.submenu ? (
        <>
          <button
            className={`${
              dropdown || window.location.href.includes("collections")
                ? "active"
                : ""
            }`}
            onClick={() => setDropdown((prev) => !prev)}
            type="button"
            aria-haspopup="menu"
          >
            {items.title}{" "}
          </button>
          <Dropdown
            onClick={() => setDropdown(false)}
            dropdown={dropdown}
            submenus={items.submenu}
          />
        </>
      ) : (
        <NavLink onClick={() => onClick} to={items.url}>
          {items.title}{" "}
        </NavLink>
      )}
    </li>
  );
};
