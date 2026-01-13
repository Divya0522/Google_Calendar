import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      alert("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <h5 style={{ textAlign: "center" }}>
          Get Started to experience Calendar
        </h5>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="name">Enter Full Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Username"
        />

        <label htmlFor="email">Email Address</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        <br />
        <label htmlFor="password">Enter Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button type="button" className="register-btn">
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ fontSize: "18px", textAlign: "center" }}>
          ---------- Already have an account -----------
        </p>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
