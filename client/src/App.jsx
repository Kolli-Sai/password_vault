// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { useTokenCheck } from "./components/useTokenCheck";
import { useSelector } from "react-redux";
function App() {
  const [render, setRender] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRender(!render);
  };
  useTokenCheck();
  const { token } = useSelector((store) => store.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage handleLogout={handleLogout} />} />
          <Route
            path="/dashboard"
            element={token ? <DashboardPage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
