import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddCollection() {
  const { register, handleSubmit } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    setUploadedFiles([...uploadedFiles, ...e.target.files]);
  };

  const onSubmit = async (data) => {
    // Include file uploads in data to be submitted
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("categoryImage", uploadedFiles[i]);
    }

    try {
      const response = await fetch("http://localhost:3006/api/v1/category", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-collection container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" {...register("description")} />

        <label htmlFor="image">Image:</label>
        <input type="file" name="categoryImage" onChange={handleFileUpload} />

        <button type="submit">Add Collection</button>
      </form>
    </div>
  );
}
