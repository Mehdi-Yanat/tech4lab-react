import React from "react"
import './App.css';
import { Route, Router, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoute";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/" />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </div>
  );
}

export default App;

