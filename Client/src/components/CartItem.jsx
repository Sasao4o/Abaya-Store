import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import img from "../assets/images/PB_05195.jpg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import baseUrl from "../constants/baseUrl";

export default function CartItem({ id }) {
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
      if (data.status === "failed") {
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
            productData.productImages[0] !== undefined
              ? `${baseUrl}/${productData.productImages[0].filePath}/${productData.productImages[0].fileName}`
              : img
          }
          alt=""
        />
        <div className="cart-item-data-context">
          <h2 className="cart-item-name">{productData.name}</h2>
          <p className="cart-item-quantity">&times;{getItemQuantity(id)}</p>
          <div className="buttons">
            <button onClick={() => increaseCartQuantity(id)}>+</button>
            <button onClick={() => decreaseCartQuantity(id)}>-</button>
            <button
              className="remove-button"
              onClick={() => removeFromCart(id)}
            >
              <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
      <p className="cart-item-total-price">
        {productData.price * getItemQuantity(id)} AED
      </p>
    </div>
  );
}
