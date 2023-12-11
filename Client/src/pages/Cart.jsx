import React from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import "./page-style/cart.css";
import { useForm } from "react-hook-form";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <br />
          <br />
          <div className="cart-checkout">
            <form>
              <input type="text" {...register("address")} />
              <input type="text" {...register("city")} />
              <input type="text" {...register("zipCode")} />
            </form>
            <p className="total-cart-price">TOTAL price</p>
            <Link to="">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
