import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { StoreContext } from "./context/Store";

const App = () => {
  const { user, authCheck } = useContext(StoreContext);

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
