import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/navbar.css";

const NavBar = ({token,logout}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");



  useEffect(() => {
    if (!token) return;

    fetch("https://calendar-backend-5fh6.onrender.com/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmail(data.email))
      .catch(() => setEmail(""));
  }, [token]);

 
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
                  <p onClick={logout}>Logout</p>
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
