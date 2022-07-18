import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import HomePage from "../containers/Home/HomePage";
import AdminHomePage from "../containers/Home/AdminHomePage";
import LoginPage from "../containers/Login/LoginPage";
import CreateReport from "../containers/Report/CreateReport";
import VerificatorPage from "../containers/Verificator/VerificatorPage";
import VerifyPage from "../containers/Verificator/VerifyPage";

const Router = () => {
  const token = localStorage.getItem("token");
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
        <Route path="/add-report/:group" element={<CreateReport />} />
        <Route path="/add-report/:group/:id" element={<CreateReport />} />
        <Route path="/verificator" element={<VerificatorPage />} />
        <Route path="/verif/:group/:id" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
