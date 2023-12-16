import React, { useState, useEffect } from "react";
import img from "../assets/images/product.jpg";
import "./page-style/viewprods.css";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { Carousel } from "react-responsive-carousel";

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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        <ShoppingCartMessage prodName={productData.name} />
        <div className="img">
          {productData.productImages &&
          productData.productImages.length !== 0 ? (
            <Carousel
              width={400}
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight={false}
            >
              {productData.productImages.map((product, index) => (
                <img
                  key={index}
                  src={`${baseUrl}/${product.filePath}/${product.fileName}`}
                  alt={`img-[${index}]`}
                />
              ))}
            </Carousel>
          ) : (
            productData.productImages &&
            productData.productImages.length === 0 && <img src={img} alt="" />
          )}
        </div>
        <div className="product-text">
          <h1 className="product-title">{productData.name}</h1>
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
        </div>
      </div>
    </>
  );
}
