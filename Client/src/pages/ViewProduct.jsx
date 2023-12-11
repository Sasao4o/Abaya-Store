import React, { useState, useEffect } from "react";
import img from "../assets/images/product.jpg";
import "./page-style/viewprods.css";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import ShoppingCartMessage from "../components/ShoppingCartMessage";
import baseUrl from "../constants/baseUrl";

export default function ViewProduct() {
  const { setIsOpen } = useShoppingCart();
  const [productData, setProductData] = useState({});
  let { id } = useParams();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(productData.id);

  //Fetch the product data by id
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${baseUrl}/api/v1/product/${id}`);
      const data = await res.json();
      setProductData(data.data);
    };
    getProduct();
  }, [id]);

  return (
    <>
      <div className="view-product">
        <ShoppingCartMessage prodName={productData.name} prodImg={img} />
        <div className="img">
          <img src={img} alt="" />
          <p>carrousel here</p>
        </div>
        <div className="product-text">
          <h1 className="product-title">
            {productData.name} {productData.id}
          </h1>
          <h1 className="seller-name">Material: {productData.material}</h1>
          <h2 className="price">{productData.price} L.E</h2>
          <p className="desc">{productData.description}</p>
          {quantity === 0 ? (
            <button
              className="buy-button"
              onClick={() => {
                setIsOpen(true);
                increaseCartQuantity(productData.id);
              }}
            >
              Add to cart
            </button>
          ) : (
            <div className="added-to-cart-section">
              <div className="quantity-number">
                <button
                  onClick={() => {
                    increaseCartQuantity(productData.id);
                  }}
                >
                  +
                </button>
                <p>{quantity}</p>
                <button onClick={() => decreaseCartQuantity(productData.id)}>
                  -
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(productData.id)}
              >
                Remove from cart
              </button>
            </div>
          )}
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </>
  );
}
