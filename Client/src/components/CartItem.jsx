import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import img from "../assets/images/PB_05195.jpg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import baseUrl from "../constants/baseUrl";

export default function CartItem({ id, size, length, price }) {
  const [productData, setProductData] = useState({});
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    clearCart,
  } = useShoppingCart();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${baseUrl}/api/v1/product/${id}`);
      const data = await res.json();
      console.log(data);
      if (data.status.toLowerCase() === "failed") {
        clearCart();
      } else setProductData(data.data);
    };
    getProduct();
  }, [id, clearCart]);
  return (
    <div className="cart-item">
      <div className="cart-item-data">
        <img
          src={
            productData.productImages &&
            productData.productImages[0] != undefined
              ? `${baseUrl}/${productData.productImages[0].filePath}/${productData.productImages[0].fileName}`
              : img
          }
          alt=""
        />
        <div className="cart-item-data-context">
          <h2 className="cart-item-name">{productData.name}</h2>
          <p className="cart-item-quantity">
            &times;<strong>{getItemQuantity(id, size, length)}</strong>
          </p>
          <p className="cart-item-quantity">
            Size:
            <strong>
              {typeof size === "string" ? size.toUpperCase() : "NAN"}
            </strong>
          </p>
          <p className="cart-item-quantity">
            Length:
            <strong>
              {typeof length === "string" ? length.toUpperCase() : "NAN"}
            </strong>
          </p>
          <div className="buttons">
            {getItemQuantity(id, size, length) < 20 && (
              <button
                onClick={() => increaseCartQuantity(id, size, length, price)}
              >
                +
              </button>
            )}
            <button
              onClick={() => decreaseCartQuantity(id, size, length, price)}
            >
              -
            </button>
            <button
              className="remove-button"
              onClick={() => removeFromCart(id, size, length)}
            >
              <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
      <p className="cart-item-total-price">
        {price * getItemQuantity(id, size, length)} AED
      </p>
    </div>
  );
}
