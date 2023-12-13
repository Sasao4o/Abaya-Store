import React from "react";
import { useForm } from "react-hook-form";
import "./adddiscount.css";

export default function AddDiscount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="add-discount container">
      <h1>Adding a discount</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Add Discount:</label>
        <input
          type="text"
          {...register("discount", {
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
          {...register("date", {
            required: "This field is required.",
          })}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        <label>Discount Percentage:</label>
        <input
          type="number"
          max={100}
          min={0}
          {...register("percentage", {
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
