import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./adddiscount.css";
import baseUrl from "../constants/baseUrl";

export default function AddDiscount() {
  const [msg, setMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }, [msg]);

  const onSubmit = async (data) => {
    console.log(data);
    let request = await fetch(`${baseUrl}/api/v1/discount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await request.json();
    if (response.status === "Failed") {
      setMsg("Failed to add discount");
    } else {
      reset();
      setMsg("Discount added successfuly");
    }
  };

  return (
    <div className="add-discount container">
      <h1>Adding a discount</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Add Discount:</label>
        <input
          type="text"
          {...register("discountCode", {
            required: "This field is required.",
            pattern: {
              value: /^[A-Z0-9]{6}$/,
              message: "The code must be exactly 6 uppercase letters or digits",
            },
          })}
        />
        {errors.discount && (
          <p style={{ color: "red" }}>{errors.discount.message}</p>
        )}
        <label>Expiration Date:</label>
        <input
          type="date"
          {...register("expiryDate", {
            required: "This field is required.",
          })}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        <label>Discount Percentage:</label>
        <input
          type="number"
          max={100}
          min={0}
          {...register("discountPercentage", {
            required: "This field is required.",
            max: {
              value: 100,
              message: "Value can't be more than 100",
            },
            min: {
              value: 0,
              message: "Value can't be less than 0",
            },
          })}
        />
        {errors.percentage && (
          <p style={{ color: "red" }}>{errors.percentage.message}</p>
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
