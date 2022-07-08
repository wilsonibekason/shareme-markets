import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./container";
import Landing from "./landing/Landing.jsx";
import SignIn from "./landing/pages/SignIn";
import SignUp from "./landing/pages/SignUp";
import ResetPassword from "./landing/pages/ResetPassword";
import UploadSpinner from "./components/uploadLoader/UploaderSpinner";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"   ? JSON.parse(localStorage.getItem("user"))   : localStorage.clear();

    if (!User) navigate("/home");
  }, []);

  return (
    <Routes>
      <Route path="/home/*" element={<Landing />} />
      <Route path="/*" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
