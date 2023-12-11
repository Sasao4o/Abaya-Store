import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`http://localhost:3006/api/v1/product`);
      const data = await res.json();
      setProducts(data.data);
    };
    getProducts();
  }, []);

  async function deleteProduct(id) {
    let res = await fetch(`http://localhost:3006/api/v1/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    res = await fetch(`http://localhost:3006/api/v1/product`);
    data = await res.json();
    setProducts(data.data);
  }
  return (
    <div className="view-products container">
      <Link to="/addproduct">Add a product</Link>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product">
            <p>#{index + 1}</p>
            <img src={product.productImages[0]} alt="" />
            <p>{product.name}</p>
            <p>Category id: {product.categoryId}</p>
            <p>{product.price} AED</p>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
