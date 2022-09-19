import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import HomePage from "../containers/Home/HomePage";
// import AdminHomePage from "../containers/Home/AdminHomePage";
import LoginPage from "../containers/Login/LoginPage";
import CreateReport from "../containers/Report/CreateReport";
import AuditorPage from "../containers/Auditor/AuditorPage";
import AuditorFollowup from "../containers/Auditor/AuditorFollowup";
import HeadsubPage from "../containers/Headsub/HeadsubPage";
import HeadsubFollowup from "../containers/Headsub/HeadsubFollowup";
// import VerificatorPage from "../containers/Verificator/VerificatorPage";
// import VerifyPage from "../containers/Verificator/VerifyPage";

const Router = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("roles");
  const redirectToHome = () => {
    if (token === null) {
      return <Navigate to="/login" />;
    } else if (role === "ROLE_REPORTER") {
      return <Navigate to="/reporter" />;
    } else if (role === "ROLE_AUDITOR") {
      return <Navigate to="/auditor" />;
    } else if (role === "ROLE_HEAD_SUB") {
      return <Navigate to="/headsub" />;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={redirectToHome()} />
        <Route
          path="/reporter"
          element={token === null ? <Navigate to="/login" /> : <HomePage />}
        />
        <Route
          path="/add-report/:group"
          element={token === null ? <Navigate to="/login" /> : <CreateReport />}
        />
        <Route
          path="/add-report/:group/:id"
          element={token === null ? <Navigate to="/login" /> : <CreateReport />}
        />
        <Route
          path="/auditor"
          element={token === null ? <Navigate to="/login" /> : <AuditorPage />}
        />
        <Route
          path="/audit-followup/:group/:id"
          element={
            token === null ? <Navigate to="/login" /> : <AuditorFollowup />
          }
        />
        <Route
          path="/headsub"
          element={token === null ? <Navigate to="/login" /> : <HeadsubPage />}
        />
        <Route
          path="/headsub-followup/:group/:id"
          element={
            token === null ? <Navigate to="/login" /> : <HeadsubFollowup />
          }
        />
        {/* <Route path="/verificator" element={<VerificatorPage />} /> */}
        {/* <Route path="/verif/:group/:id" element={<VerifyPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
