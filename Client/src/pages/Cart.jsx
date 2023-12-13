import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import "./page-style/cart.css";
import { useForm } from "react-hook-form";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

// Idea about how to store cart items ya mazennnn
//////////////////////////////////////////////////////////////

//   cart = [{id:1, secondId:"1232", quantity:3, price:100},
// {id:2, secondId:"5548", quantity:3, price:200},
// {id:1, secondId:"4618", quantity:3, price:100}];

// console.log(cart.reduce((total, item)=>{
//     return total + (item.quantity * item.price);
// }, 0))
// }
// will return a total of 1200 ==> 3*100+3*200+3*100

export default function Cart() {
  const { cartItemsNumber, cartItems } = useShoppingCart();
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

  const onSubmit = (data) => console.log(data);

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
              <input type="text" readOnly value="United Arab Emirates" />
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
          </div>
        </>
      )}
    </div>
  );
}
