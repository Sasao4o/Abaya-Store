import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./addcollection.css";

export default function AddCollection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [msg, setMsg] = useState("");

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

    let response = await fetch("http://localhost:3006/api/v1/category", {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    if (response.status === "Failed") {
      setMsg(response.message);
    } else {
      setMsg("Collection Added");
    }
  };

  return (
    <div className="add-collection container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", {
            required: "This field is required.",
          })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          {...register("description", {
            required: "This field is required.",
          })}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}

        <label htmlFor="image">Image:</label>
        <input type="file" name="categoryImage" onChange={handleFileUpload} />

        <button type="submit">Add Collection</button>
      </form>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}
