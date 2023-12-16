import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./page-style/failed-success.css";

export default function Failed() {
  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      history("/");
    }, 2000);
  }, [history]);
  return (
    <div className="failed-success">
      <h1>Your order was cancelled!</h1>
      <p>You will be redirected to main page in a second...</p>
    </div>
  );
}
