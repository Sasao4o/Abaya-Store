import React, { useState, useEffect } from "react";
import img from "../assets/images/product.jpg";
import "./page-style/viewprods.css";
import { useParams, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { Carousel } from "react-responsive-carousel";

import ShoppingCartMessage from "../components/ShoppingCartMessage";
import baseUrl from "../constants/baseUrl";

const sizeVariants = ["s", "m", "l", "xl", "2xl", "3xl"];
const lengthVariants = [
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
];

export default function ViewProduct() {
  const [size, setSize] = useState("xs");
  const [length, setLength] = useState("49");
  const { setIsOpen } = useShoppingCart();
  const [productData, setProductData] = useState({});
  let { id } = useParams();
  const history = useNavigate();

  const onSizeChange = (e) => {
    setSize(e.target.value);
  };
  const onLengthChange = (e) => {
    setLength(e.target.value);
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(productData.id, size, length);
  //Fetch the product data by id
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const getProduct = async () => {
      const res = await fetch(`${baseUrl}/api/v1/product/${id}`);
      const data = await res.json();
      if (data.status.toLowerCase() === "Failed") {
        history("pagenotfound");
      }
      setProductData(data.data);
    };
    getProduct();
  }, [id, history]);
  console.log(size);
  console.log(length);
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
            productData.productImages.length === 0 && (
              <img src={img} alt="mazen" />
            )
          )}
        </div>
        <div className="product-text">
          <h1 className="product-title">{productData.name}</h1>
          <h1 className="seller-name">Material: {productData.material}</h1>
          <h2 className="price">{productData.price} L.E</h2>
          <p className="desc">{productData.description}</p>
          <form>
            <div className="size-variants">
              <p>Sizes:</p>
              <label>
                XS
                <input
                  type="radio"
                  name="size"
                  value="xs"
                  checked={size === "xs"}
                  onChange={onSizeChange}
                />
              </label>
              {sizeVariants.map((variant, index) => (
                <label key={index}>
                  {variant.toUpperCase()}
                  <input
                    type="radio"
                    name="size"
                    value={variant}
                    onChange={onSizeChange}
                  />
                </label>
              ))}
            </div>
            <div className="size-variants">
              <p>Length:</p>
              <label>
                49
                <input
                  type="radio"
                  name="length"
                  value="49"
                  checked={length === "49"}
                  onChange={onSizeChange}
                />
              </label>
              {lengthVariants.map((variant, index) => (
                <label key={index}>
                  {variant.toUpperCase()}
                  <input
                    type="radio"
                    name="length"
                    value={variant}
                    onChange={onLengthChange}
                  />
                </label>
              ))}
            </div>
          </form>
          <div className="length-variants">
            <p>Lengths:</p>
          </div>
          {quantity === 0 ? (
            <button
              className="buy-button"
              onClick={() => {
                setIsOpen(true);
                increaseCartQuantity(
                  productData.id,
                  size,
                  length,
                  productData.price
                );
              }}
            >
              Add to cart
            </button>
          ) : (
            <div className="added-to-cart-section">
              <div className="quantity-number">
                {quantity < 20 && (
                  <button
                    onClick={() => {
                      increaseCartQuantity(
                        productData.id,
                        size,
                        length,
                        productData.price
                      );
                    }}
                  >
                    +
                  </button>
                )}
                <p>{quantity}</p>
                <button
                  onClick={() =>
                    decreaseCartQuantity(
                      productData.id,
                      size,
                      length,
                      productData.price
                    )
                  }
                >
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
