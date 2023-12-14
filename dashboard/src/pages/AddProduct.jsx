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
  } = useForm();

  const onSubmit = async (data) => {
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

    const response = await fetch(`${baseUrl}/api/v1/product`, {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    if (res.status === "Failed") {
      setMsg(res.message);
    } else {
      setMsg("Product Added");
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add a product</h1>
        <label>Product Name:</label>
        <input type="text" {...register("name")} />
        <label>Product Description:</label>
        <textarea type="text" {...register("description")} />
        <label>Product Price:</label>
        <input type="number" {...register("price")} />
        <label>Product Material:</label>
        <input type="text" {...register("material")} />
        <label>Category:</label>
        <select {...register("categoryId")}>
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

        <button type="submit">Add product</button>
      </form>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
};

export default AddProduct;
