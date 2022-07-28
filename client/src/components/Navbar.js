import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="p-3 px-md-4 mb-3 bg-primary" id="navigation">
        <h1 className="my-0 mr-md-auto font-weight-normal text-dark fst-italic">
          Avatar App
        </h1>
        <nav className="my-2 my-md-0 me-md-3" id="nav">
          <Link className="p-2 text-white" id="link" to="/">
            Home
          </Link>
          <Link className="p-2 text-white" id="link" to="/register">
            Register
          </Link>
          <Link className="p-2 text-white" id="link" to="/profile">
            Profile
          </Link>
          <Link className="p-2 text-white" id="link" to="/allUser">
            AllUser
          </Link>
          <Link
            className="btn btn-outline-dark btn-lg bg-white"
            id="link"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="btn btn-outline-dark btn-lg bg-white"
            id="link"
            to="/logout"
          >
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
}
