import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from "react-hook-form";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

export default function SignIn() {
  const { signIn } = useContext(UserContext);
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    let request = await fetch(`${baseUrl}/api/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await request.json();
    if (response.status === "Failed") {
      setMsg("Wrong user");
    } else {
      signIn();
      navigate("/");
    }
  };

  return (
    <div className="container signin">
      <h1>Welcome To Dashboard</h1>
      <h3>Please Sign in</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username:</label>
        <input
          type="text"
          {...register("email", {
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
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}
