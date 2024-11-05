import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("email", values.email);
      formData.append("password", values.password);

      console.log("Submitting form data:", formData.toString()); // Log form data

      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      const data = response.data; // Get data from response
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          console.log("Registration successful:", data.message); // Log success message from server
          navigate("/"); // Redirect on success
        }
      }
    } catch (ex) {
      // Improved error handling
      if (ex.response) {
        console.error("Error during registration:", ex.response.data);
        generateError(ex.response.data.message || "Registration failed");
      } else {
        console.error("Error during registration:", ex);
        generateError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email" // Ensure id is correctly set for accessibility
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password" // Ensure id is correctly set for accessibility
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/login2">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
