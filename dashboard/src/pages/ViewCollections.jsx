import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewCollections() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const getCollections = async () => {
      const res = await fetch(
        `http://localhost:3006/api/v1/category?offset=1&limit=100`
      );
      const data = await res.json();
      setCollections(data.data);
    };
    getCollections();
  }, []);

  return (
    <div className="container">
      <Link to="/collections/addcollection">Add Collection</Link>
      <div className="collection-view">
        {collections.map((collection, index) => (
          <div key={index} className="collection">
            <p>#{collection.id}</p>
            <p>{collection.name}</p>
            <p>{collection.createdAt}</p>
            <button className="err">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
