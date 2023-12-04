import React from "react";
import "./styles/userproduct.css";
import pic from "../assets/images/maxresdefault.jpg";

export default function UserProducts(props) {
  return (
    <div className="user-product">
      <img src={pic} alt="" />
      <div className="user-product-data">
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>{props.userId}</p>
        <p>{props.description}</p>
        <p>{props.idd}</p>
      </div>
    </div>
  );
}
