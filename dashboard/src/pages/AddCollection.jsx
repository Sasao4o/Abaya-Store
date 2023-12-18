import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./addcollection.css";
import baseUrl from "../constants/baseUrl";

export default function AddCollection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [uploadedFile, setUploadedFile] = useState(null); // Changed state to hold a single file
  const [msg, setMsg] = useState("");

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]); // Store the first selected file only
  };

  const onSubmit = async (data) => {
    try {
      // Include file upload in data to be submitted
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);

      if (uploadedFile) {
        formData.append("categoryImage", uploadedFile);
      }

      let response = await fetch(`${baseUrl}/api/v1/category`, {
        method: "POST",
        body: formData,
      });
      response = await response.json();
      if (response.status === "Failed") {
        setMsg(response.message);
      } else {
        setMsg("Collection Added");
        reset();
        setUploadedFile(null);
      }
    } catch (e) {
      console.log("SERVER IS DOWN");
      console.log(e);
    }
  };

  return (
    <div className="add-collection container">
      <h1>Add a Collection</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
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
    </div>
  );
}
