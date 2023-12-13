import React, { useState, useEffect } from "react";
import "./page-style/products.css";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductSkeleton from "../components/ProductSkeleton";
import img from "../assets/images/wallpapertest.jpg";
import { useParams } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

export default function Collection() {
  // const { collectionId } = useParams();
  // const [collectionData, setCollectionData] = useState({});
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const totalNumberPerPage = 8;
  // const [productCount, setProductCount] = useState(0);
  // useEffect(() => {
  //   const getCollectionData = async () => {
  //     const res = await fetch(`${baseUrl}/api/v1/category/${collectionId}`);
  //     const data = await res.json();
  //     setCollectionData(data.data);
  //   };
  //   const getProductsCount = async () => {
  //     const res = await fetch(
  //       `${baseUrl}/api/v1/product/category/${collectionId}/count`
  //     );
  //     const data = await res.json();
  //     setProductCount(data.data.count);
  //   };
  //   const getProducts = async () => {
  //     const res = await fetch(
  //       `${baseUrl}/api/v1/product/category/${collectionId}?page=1&limit=${totalNumberPerPage}`
  //     );
  //     const data = await res.json();
  //     setProducts(data.data);
  //     setIsLoading(false);
  //   };
  //   getCollectionData();
  //   getProductsCount();
  //   getProducts();
  // }, [collectionId]);
  // const fetchProducts = async (currentPage) => {
  //   const res = await fetch(
  //     `${baseUrl}/api/v1/product?page=${currentPage}&limit=${totalNumberPerPage}`
  //   );
  //   const data = await res.json();
  //   return data;
  // };
  // const handlePageClick = async (data) => {
  //   let currentPage = data.selected + 1;
  //   const productsFromServer = await fetchProducts(currentPage);
  //   setProducts(productsFromServer.data);
  // };
  // const productsArray = products.map((product) => (
  //   <Product
  //     key={product.id}
  //     name={product.name}
  //     id={product.id}
  //     price={product.price}
  //   />
  // ));
  // return (
  //   <>
  //     <div className="intro-pic" style={{ backgroundImage: `url(${img})` }}>
  //       <h1>{collectionData.name}</h1>
  //       <p>{collectionData.description}</p>
  //     </div>
  //     {isLoading && (
  //       <div className="products">
  //         <ProductSkeleton />
  //       </div>
  //     )}
  //     <div className="container">
  //       <div className="products">{productsArray}</div>
  //     </div>
  //     {!isLoading && (
  //       <Paginate
  //         productCount={Math.ceil(productCount / 8)}
  //         handlePageClick={handlePageClick}
  //       />
  //     )}
  //   </>
  // );
}
