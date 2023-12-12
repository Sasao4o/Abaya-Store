import { useRef, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { NavLink } from "react-router-dom";

export const MenuItems = ({ item, onClick }) => {
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
      {item.submenu ? (
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
            {item.title}{" "}
          </button>
          <Dropdown
            onClick={() => setDropdown(false)}
            dropdown={dropdown}
            submenu={item.submenu}
          />
        </>
      ) : (
        <NavLink onClick={() => onClick} to={item.url}>
          {item.title}{" "}
        </NavLink>
      )}
    </li>
  );
};
