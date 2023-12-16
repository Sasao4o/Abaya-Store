import React from "react";
// import { MdOutlineClose } from "react-icons/md";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import "./styles/shoppingcart.css";
// import { MdCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ShoppingCartMessage({ prodName }) {
  const { isOpen, setIsOpen, cartQuantity } = useShoppingCart();
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }, [setIsOpen, isOpen]);
  return (
    <div
      className={`shopping-cart-message ${
        isOpen ? "cart-message-visible" : "cart-message-not-visible"
      }`}
    >
      <div className="cart-close-button">
        {/* <MdOutlineClose
          className="cart-close-button"
          onClick={() => setIsOpen(false)}
        /> */}
      </div>
      <div className="cart-message-header">
        <p>"{prodName}" added to cart</p>
        <Link to="/cart">View cart ({cartQuantity})</Link>
      </div>
    </div>
  );
}
