import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

const Login = ({login}) => {
  const navigate = useNavigate();
  const initialState = {
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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }
       login(data.access_token);
    navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2 style={{ textAlign: "center" }}>Welcome back!</h2>
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

        <label htmlFor="password">Enter Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />

        <button type="submit" className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          ------- Don't have an account -------
        </p>
       <button
  type="button"
  className="register-btn"
  onClick={() => navigate("/register")}
>
  Register
</button>
      </form>
    </div>
  );
};

export default Login;
