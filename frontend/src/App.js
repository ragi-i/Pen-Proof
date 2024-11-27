import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthorDashboard from "./components/AuthorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AllAuthor from "./components/AllAuthor";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Private Routes */}
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/allauthors" element={<AllAuthor />} />
          
          
          {/* Fallback Route */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
