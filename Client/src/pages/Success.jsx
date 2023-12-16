import React from "react";
import "./page-style/failed-success.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      history("/");
    }, 2000);
  }, [history]);

  return (
    <div className="failed-success">
      <h1>Your order was placed successfuly!</h1>
      <p>You will be redirected to main page in a second...</p>
    </div>
  );
}
