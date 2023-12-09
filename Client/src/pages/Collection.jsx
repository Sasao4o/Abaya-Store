import React, { useState } from "react";
import "./page-style/products.css";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductSkeleton from "../components/ProductSkeleton";
import img from "../assets/images/wallpapertest.jpg";
import { useParams } from "react-router-dom";

export default function Collection() {
  const { collectionId } = useParams();
  const [collectionData, setCollectionData] = useState();
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const totalNumberPerPage = 8;
  const [productCount, setProductCount] = React.useState(0);

  React.useEffect(() => {
    //Get the total amount of products to be used in pagination
    const getProductsCount = async () => {
      const res = await fetch(`http://localhost:3006/api/v1/product/count`);
      const data = await res.json();
      setProductCount(data.data.count);
      console.log(data.data.count);
    };
    getProductsCount();

    //Get the actual products data
    const getProducts = async () => {
      const res = await fetch(
        `http://localhost:3006/api/v1/product?page=1&limit=${totalNumberPerPage}`
      );
      const data = await res.json();
      setProducts(data.data);
      console.log(data);
      setIsLoading(false);
    };
    getProducts();

    //Get the Collection data products data
    const getCollectionData = async () => {
      const res = await fetch(
        `http://localhost:3006/api/v1/category/${collectionId}`
      );
      const data = await res.json();
      setCollectionData(data.data);
      console.log(data);
    };
    getCollectionData();
  }, [collectionId]);

  const fetchProducts = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3006/api/v1/product?page=${currentPage}&limit=${totalNumberPerPage}`
    );
    const data = await res.json();
    return data;
  };

  async function handlePageClick(data) {
    let currentPage = data.selected + 1;
    const productsFromServer = await fetchProducts(currentPage);
    setProducts(productsFromServer.data);
  }

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
      <div className="intro-pic" style={{ backgroundImage: `url(${img})` }}>
        <h1>{collectionData.name}</h1>
        <p>{collectionData.description}</p>
      </div>
      {isLoading && (
        <div className="products">
          <ProductSkeleton />
        </div>
      )}
      <div className="container">
        <div className="products">{productsArray}</div>
      </div>
      {!isLoading && (
        <Paginate
          productCount={Math.ceil(productCount / 8)}
          handlePageClick={handlePageClick}
        />
      )}
    </>
  );
}
