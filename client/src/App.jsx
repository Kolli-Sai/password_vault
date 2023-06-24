// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "./store/isAuthenticated/isAuthenticatedSlice";
function App() {
  const dispatch = useDispatch();
  const token = Cookies.get("access_token");
  useEffect(() => {
    dispatch(setToken(token));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
