import React from "react";
import axios from "./../../utility/axiosInstance";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      userName: formData.get("userName"),
      password: formData.get("password"),
    };

    event.target.reset();
    
    try {
      const response = await axios.post("/api/user/login", data);
      console.log("response ", response);
      alert("Your login was successful")
    } catch (error) {
      console.error("An error happened", error);
      alert("Your login fail \nCheck your username and password please")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register">
         <h1>Login</h1>
        <label>
           <span>User name</span>
          <input
            type="text"
            autoComplete="userName"
            name="userName"
            required={true}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            name="password"
            required={true}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
