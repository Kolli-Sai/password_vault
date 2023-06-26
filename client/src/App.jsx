// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./fonts/Poppins-Medium.woff";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
// eslint-disable-next-line no-unused-vars
import { useTokenCheck } from "./components/useTokenCheck";
import { useSelector } from "react-redux";
import GetSinglePassword from "./pages/getSinglePassword";
function App() {
  const [render, setRender] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(!loggedIn);
  };
  useTokenCheck();
  const { token } = useSelector((store) => store.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Navbar key={render.toString()} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage handleLogout={handleLogout} />} />

          <Route
            path="/dashboard"
            element={token ? <DashboardPage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/password/:id" element={<GetSinglePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
