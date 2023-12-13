import React from "react";
import { Link } from "react-router-dom";
// import img from "../assets/images/PB_05195.jpg";
import "./styles/product.css";
import baseUrl from "../constants/baseUrl";

export default function Product(props) {
  return (
    <div className="product">
      <div className="img-container">
        <img
          width={100}
          height={100}
          src={`${baseUrl}/productImage-PB_05715.jpg`}
          alt="pic"
          loading="lazy"
        />
      </div>
      <div className="text">
        <p className="name">{props.name}</p>
        <p className="price">{props.price} DH</p>
        <Link to={`/products/${props.id}`}>View Product</Link>
      </div>
    </div>
  );
}
