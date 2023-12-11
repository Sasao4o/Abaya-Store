import React from "react";
import "./styles/productskeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return Array(8)
    .fill(0)
    .map((_, i) => (
      <div className="product" key={i}>
        <div className="img-container">
          <Skeleton rectangle height={170} width={300} />
        </div>
        <div className="text">
          <Skeleton height={25} />
          <br />
          <Skeleton height={25} />
        </div>
      </div>
    ));
}
