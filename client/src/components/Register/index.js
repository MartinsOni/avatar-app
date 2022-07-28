import React, { useState } from "react";
import axios from "./../../utility/axiosInstance";
import "./style.css";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const { userName, firstName, lastName, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();

    const newUser = {
      userName,
      firstName,
      lastName,
      password,
    };
    alert(
      `The detail you entered was:\nUser-name: ${userName},\nFirst-name: ${firstName},\nLast-name: ${lastName},`
    );

    try {
      const response = await axios.post("/api/user/register", newUser);
      console.log("response ", response);
      alert("Your account registration was successful")
    } catch (error) {
      console.error("An error happened", error);
      alert(`Your account registration failed.\nUsername already in use`)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register">
        <h1>Register</h1>
        <label>
          <span>User name</span>
          <input
            onChange={onChange}
            type="text"
            autoComplete="userName"
            name="userName"
            required={true}
          />
        </label>
        <label>
          <span>First name</span>
          <input
            onChange={onChange}
            type="text"
            autoComplete="firstName"
            name="firstName"
            required={true}
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            onChange={onChange}
            type="text"
            autoComplete="lastName"
            name="lastName"
            required={true}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            onChange={onChange}
            type="password"
            autoComplete="new-password"
            name="password"
            required={true}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
