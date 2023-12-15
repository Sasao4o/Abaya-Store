import React from "react";
import "./styles/landing.css";
import background from "../assets/images/Home.jpg";

export default function Landing() {
  return (
    <div
      className="landing"
      style={{ backgroundImage: ` url(${background}) ` }}
    ></div>
  );
}
