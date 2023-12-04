import React from "react";
import "./page-style/products.css";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductSkeleton from "../components/ProductSkeleton";
import img from "../assets/images/wallpapertest.jpg";

export default function Products() {
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
  }, []);

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
        <h1>All Products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          harum quam voluptatem sed porro reprehenderit eveniet adipisci dolor
        </p>
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
