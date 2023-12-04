import React from "react";
import "./page-style/contact.css";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    emailContent: "",
  });
  function emailHandle(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <>
      <div className="contact">
        <i className="fa-light fa-envelope-open"></i>
        <form action="">
          <textarea
            placeholder="Enter your inquiry"
            onChange={emailHandle}
            name="emailContent"
            value={formData.emailContent}
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}
