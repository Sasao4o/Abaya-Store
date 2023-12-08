import React from "react";
import { Link } from "react-router-dom";

export default function ViewProducts() {
  return (
    <div>
      <Link to="/addproduct">Add a product</Link>
      <p>All products</p>
    </div>
  );
}
