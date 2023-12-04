import React, { useState, useEffect } from "react";
import "./page-style/search.css";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";

export default function Search() {
  let { prdName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchErr, setSearchErr] = useState(false);

  // Get searched product
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`http://localhost:3006/api/v1/product/search`, {
        method: "post",
        body: JSON.stringify({ name: prdName }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await res.json();
      setProducts(data.data);
      if (data.data.length === 0) {
        setSearchErr(true);
      } else {
        setSearchErr(false);
      }
      setIsLoading(false);
    };
    getProducts();
  }, [prdName]);

  const productsArray = products.map((product) => (
    <Product
      key={product.id}
      name={product.name}
      id={product.id}
      price={product.price}
    />
  ));
  return (
    <>
      <div className="container">
        {searchErr ? (
          <h1>No results for {prdName}</h1>
        ) : (
          <h1>You searched for {prdName}</h1>
        )}

        {isLoading && (
          <div className="products">
            <ProductSkeleton />
          </div>
        )}
        <div className="products">{productsArray}</div>
      </div>
    </>
  );
}
