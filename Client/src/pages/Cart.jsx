import React, { useState } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import "./page-style/cart.css";
import { useForm } from "react-hook-form";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

export default function Cart() {
  const { cartItemsNumber, cartItems, clearCart } = useShoppingCart();
  const [msg, setMsg] = useState("");
  const cities = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al-Quwain",
    "Fujairah",
    "Ras Al Khaimah",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(cartItems);
  function calculateTotalCost() {
    return cartItems.reduce((total, cartItem) => {
      return total + (cartItem?.price || 0) * cartItem.quantity;
    }, 0);
  }
  const onSubmit = async (data) => {
    console.log(data.city);
    if (data.city !== "null") {
      let request = await fetch(`${baseUrl}/api/v1/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressInfo: {
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            shippingDate: "2023-12-08T10:30:00.000Z",
            country: "UAE",
          },
          productsInfo: cartItems,
          promoCode: data.discount,
        }),
      });
      let response = await request.json();
      console.log(request.body);
      if (response.statusCode === 400) {
        setMsg(response.message);
      } else {
        clearCart();
        window.location.replace(response.checkOutPage);
      }
    } else {
      setMsg("Please select a city.");
    }
  };
  return (
    <div className="cart-view">
      {cartItemsNumber === 0 ? (
        <div className="cart-empty">
          <h1>Shopping cart is empty :c</h1>
          <Link to="/products">Go Shopping!</Link>
        </div>
      ) : (
        <>
          <h1>Cart</h1>
          <div className="cart-view-header">
            <p>Product</p>
            <p>Total price</p>
          </div>
          <br />
          <hr />
          <br />
          {cartItems.map((item, index) => (
            <CartItem
              id={item.id}
              key={index}
              size={item.size}
              length={item.length}
              price={item.price}
            />
          ))}
          <hr />
          <div className="total-price">
            <p className="total-cart-price">Total price</p>
            <strong>{calculateTotalCost()} AED</strong>
          </div>
          <br />
          <br />
          <div className="cart-checkout">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Country / Region: <br />
              </label>
              <input readOnly value="United Arab Emirates" />
              <label>
                Address: <br />
              </label>
              <input
                type="text"
                {...register("address", {
                  required: "Address is required.",
                })}
              />
              <p className="err">{errors.address?.message}</p>
              <label>
                City: <br />
              </label>
              <select {...register("city")}>
                <option value={"null"}>--Select a city--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <small>Shipping is free in Abu Dhabi.</small>
              <p className="err">{errors.city?.message}</p>{" "}
              <label>
                ZIP code: <br />
              </label>
              <input
                type="text"
                {...register("zipCode", {
                  required: "ZIP code is required.",
                })}
              />
              <label>
                Discount / Promo code: <br />
              </label>
              <input type="text" {...register("discount")} />
              <p className="err">{errors.zipCode?.message}</p>{" "}
              <button type="submit">Checkout</button>
            </form>
            <br />
            {msg && <p style={{ color: "red" }}>{msg}</p>}
          </div>
        </>
      )}
    </div>
  );
}
