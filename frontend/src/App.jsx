// import { Routes, Route, Navigate } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Calendar from "./pages/Calendar";
// import Home from "./components/Home";
// import NavBar from "./components/NavBar";
// import "./App.css"

// const isAuthenticated = () => !!localStorage.getItem("token");

// function App() {
//   return (
//     <>
//       <NavBar />
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />}
//         />

//         <Route
//   path="/login"
//   element={
//     isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
//   }
// />

// <Route
//   path="/register"
//   element={
//     isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />
//   }
// />
//         <Route
//           path="/dashboard"
//           element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/calendar"
//           element={isAuthenticated() ? <Calendar /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <NavBar token={token} logout={logout} />

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Home />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login login={login} />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/calendar"
          element={token ? <Calendar /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
