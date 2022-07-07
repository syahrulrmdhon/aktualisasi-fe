import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={() => {
        if (token === null) {
          return <Navigate to="/login" />;
        } else {
          return children;
        }
      }}
    />
  );
};

export default PrivateRoute;
