import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    return localStorage.getItem('token') != undefined ? children : <Navigate to='/' />
}
  export default PrivateRoute;
  