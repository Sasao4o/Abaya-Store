import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./addproduct.css";
import baseUrl from "../constants/baseUrl";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFileUpload = (e) => {
    setUploadedFiles([...uploadedFiles, ...e.target.files]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Include file uploads in data to be submitted
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("material", data.material);
    formData.append("categoryId", data.categoryId);

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("productImage", uploadedFiles[i]);
    }
    if (data.categoryId !== "null") {
      const response = await fetch(`${baseUrl}/api/v1/product`, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      console.log(res);
      if (res.status === "Failed") {
        setMsg(res.message);
      } else {
        setMsg("Product Added");
      }
    } else {
      setMsg("Please enter a valid Category");
    }
    reset();
    setUploadedFiles([]);
  };

  useEffect(() => {
    const getCollections = async () => {
      const res = await fetch(`${baseUrl}/api/v1/category?offset=1&limit=100`);
      const data = await res.json();
      setCategories(data.data);
    };
    getCollections();
  }, []);

  return (
    <div className="add-product container">
      <h1>Add a product</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Name:</label>
        <input
          type="text"
          {...register("name", {
            required: "Please enter a name.",
          })}
        />
        <label>Product Description:</label>
        <textarea
          type="text"
          {...register("description", {
            required: "Please enter a description.",
          })}
        />
        <label>Product Price:</label>
        <input
          type="number"
          {...register("price", {
            required: "Please enter a price",
            min: {
              value: 0,
              message: "The number must be positive.",
            },
          })}
        />
        <label>Product Material:</label>
        <input
          type="text"
          {...register("material", {
            required: "Please enter a material",
          })}
        />
        <label>Category:</label>
        <select {...register("categoryId")}>
          <option value="null">--Please select a Collection--</option>
          {categories.map((category, index) => (
            <option key={index} value={`${category.id}`}>
              {category.name}
            </option>
          ))}
        </select>
        <div>
          <label>Product Images:</label>
          <input
            type="file"
            name="productImage"
            onChange={handleFileUpload}
            multiple
          />
        </div>
        {errors.productImage && <p>{errors.productImage.message}</p>}
        {errors.name && <p>{errors.name.message}</p>}
        {errors.description && <p>{errors.description.message}</p>}
        {errors.price && <p>{errors.price.message}</p>}
        {errors.material && <p>{errors.material.message}</p>}

        <button type="submit">Add product</button>
      </form>
    </div>
  );
};

export default AddProduct;
