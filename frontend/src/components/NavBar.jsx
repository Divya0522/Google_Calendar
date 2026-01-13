import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmail(data.email))
      .catch(() => setEmail(""));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MyCalendar</h2>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/calendar">Calendar</Link>
            <div className="account-container">
              <div className="account-icon" onClick={() => setOpen(!open)}>
                👤
              </div>

              {open && (
                <div className="dropdown">
                  <p style={{ fontWeight: "bold" }}>{email}</p>
                  <hr />
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
