import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import "./page-style/cart.css";
import { useForm } from "react-hook-form";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

export default function Cart() {
  const { cartItemsNumber, cartItems } = useShoppingCart();
  const [msg, setMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [shippingCost] = useState(0);
  const cities = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al-Quwain",
    "Fujairah",
    "Ras Al Khaimah",
  ];
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${baseUrl}/api/v1/product`);
      const data = await res.json();
      setProducts(data.data);
    };
    getProduct();
  }, []);
  function calculateTotalCost() {
    return cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  }
  const onSubmit = async (data) => {
    let request = await fetch(`${baseUrl}/api/v1/order`, {
      method: "POST",
      body: {
        addressInfo: {
          address: data.address,
          city: data.city,
          zipCode: data.zipCode,
          shippingDate: "2023-12-08T10:30:00.000Z",
          country: "UAE",
        },
        productsInfo: cartItems,
        promoCode: data.discount,
      },
    });
    let response = await request.json();
    if (response.statusCode === 400) {
      setMsg(response.message);
    } else {
      history(response.checkOutPage);
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
            <CartItem id={item.id} key={index} />
          ))}
          <hr />
          <div className="total-price">
            <p className="total-cart-price">Total price</p>
            <strong>
              {calculateTotalCost() + shippingCost || calculateTotalCost()} AED
            </strong>
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
                <option value={null}>--Select a city--</option>
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
            {msg && <p style={{ color: "red" }}>{msg}</p>}
          </div>
        </>
      )}
    </div>
  );
}
