import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles/navbar.css";
import { menuItemsData } from "../constants/menuItemsData";
import { MenuItems } from "./MenuItems";
import { IoSearch } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { MdMenu } from "react-icons/md";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { IoClose } from "react-icons/io5";
import { MobileMenuItems } from "./MobileMenuItems";

export default function Navbar() {
  let history = useNavigate();

  const { cartItemsNumber } = useShoppingCart();

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const { register, handleSubmit } = useForm();
  const { register: registerMobile, handleSubmit: handleSubmitMobile } =
    useForm();

  function mobileMenuClick() {
    setToggleMobileMenu((prevState) => !prevState);
  }

  const onSubmit = (data) => console.log(data);

  return (
    <nav>
      {/* This is the sub menu for mobile screens */}
      <div
        className={
          toggleMobileMenu
            ? "mobile-submenu toggled-mobile-submenu"
            : "mobile-submenu"
        }
      >
        <div className="nav-icons-mobile">
          <div className="top-level-menu-icons">
            <div className="shopping-cart">
              <TbShoppingBag
                fontSize={40}
                color="white"
                cursor={"pointer"}
                onClick={() => {
                  mobileMenuClick();
                  history("/cart");
                }}
              />
              <div>{cartItemsNumber}</div>
            </div>
            <IoClose
              onClick={mobileMenuClick}
              color="white"
              fontSize={40}
              cursor={"pointer"}
            />
          </div>
          <form
            className="nav-search-bar-mobile"
            onSubmit={handleSubmitMobile(onSubmit)}
          >
            <input
              placeholder="Search here..."
              type="text"
              {...registerMobile("search")}
            />
            <button type="submit">
              <IoSearch fontSize={25} color="white" cursor={"pointer"} />
            </button>
          </form>
        </div>

        <ul>
          {menuItemsData.map((menu, index) => {
            return (
              <MobileMenuItems
                mobileMenuClick={mobileMenuClick}
                items={menu}
                key={index}
              />
            );
          })}
        </ul>
      </div>
      {/* ================================================== */}
      {/* This is for normal screens */}

      <div className="logo">
        <h2>LEVEL</h2>
        {/* <img src="../images/" alt="" /> */}
      </div>
      <ul className="main-links">
        {menuItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
        <li id="mobile-menu-toggle">
          <MdMenu
            fontSize={25}
            color="white"
            cursor={"pointer"}
            onClick={mobileMenuClick}
          />
        </li>
      </ul>
      <div className="nav-icons">
        <form className="nav-search-bar" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Search here..."
            type="text"
            {...register("search")}
          />
          <button type="submit">
            <IoSearch fontSize={25} color="white" cursor={"pointer"} />
          </button>
        </form>
        <div className="shopping-cart">
          <TbShoppingBag
            fontSize={25}
            color="white"
            cursor={"pointer"}
            onClick={() => history("/cart")}
          />
          <div>{cartItemsNumber}</div>
        </div>
      </div>
    </nav>
  );
}
