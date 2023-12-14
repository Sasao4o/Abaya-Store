import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./viewcollection.css";
import baseUrl from "../constants/baseUrl";

export default function ViewCollections() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const getCollections = async () => {
      const res = await fetch(`${baseUrl}/api/v1/category?offset=1&limit=100`);
      const data = await res.json();
      setCollections(data.data);
    };
    getCollections();
  }, []);

  return (
    <div className="container view-collection">
      <Link to="/collections/addcollection">Add Collection</Link>
      <div className="collection-view">
        <h1>Collections</h1>
        {collections.map((collection, index) => (
          <div key={index} className="collection">
            <p>#{index + 1}</p>
            <p>{collection.name}</p>
            <p>
              CreatedAt: <strong>{collection.createdAt}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
