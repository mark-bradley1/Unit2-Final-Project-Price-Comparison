import React, { useState } from "react";
import Button from "./Button";

function Form() {
  const [formSubmit, setFormSubmit] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setFormSubmit("Thanks for reaching out");

    setFormData({
        name: "",
        email: "",
        phone: "",
        contact: "",
    });

    setTimeout(() => {
        setFormSubmit("");
    }, 1500);
  }

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.contact;

  return (
    <div className="container">
      <h2>Please submit any question, comment or suggestion below!</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            type="text"
            name="contact"
            maxLength="200"
            value={formData.contact}
            onChange={handleChange}
            rows="10"
            cols="80"
            required
          />
        </label>
        <div className="char-counter">
          {formData.contact.length} / 200 characters
        </div>
        <br />
        {formSubmit && <div className="form-submit">{formSubmit}</div>}
        <Button
          type="submit"
          label="Submit"
          className="submit-btn"
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
}

export default Form;
