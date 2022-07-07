import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import HomePage from "../containers/Home/HomePage";
import AdminHomePage from "../containers/Home/AdminHomePage";
import LoginPage from "../containers/Login/LoginPage";
import CreateReport from "../containers/Report/CreateReport";

const Router = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/home"
          element={
            token === null ? <Navigate to="/admin/login" /> : <AdminHomePage />
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/add-report" element={<CreateReport />} />
        <Route path="/add-report/:id" element={<CreateReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
