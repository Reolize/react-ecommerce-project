import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "../pages/Login.css";

function Login({ onLogin }) {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/api");
    }
  }, [cookies, navigate]);

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      generateError("Email and password are required.");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/login",
        { ...values },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          onLogin();
          navigate("/");
        }
      }
    } catch (ex) {
      if (ex.response) {
        generateError(ex.response.data.message || "An error occurred. Please try again.");
      } else {
        generateError("Network error. Please check your connection.");
      }
      console.log(ex);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2 className="form__title">Login to your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/register"> Register </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
