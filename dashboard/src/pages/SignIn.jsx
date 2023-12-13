import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from "react-hook-form";
import "./signin.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { signIn } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn();
    console.log(data);
    navigate("/");
  };

  return (
    <div className="container signin">
      <h1>Welcome To Dashboard</h1>
      <h3>Please Sign in</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username:</label>
        <input
          type="text"
          {...register("username", {
            required: "This field is required",
          })}
        />
        {errors.username && <p className="err">{errors.username.message}</p>}
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
          })}
        />
        {errors.password && <p className="err">{errors.password.message}</p>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
