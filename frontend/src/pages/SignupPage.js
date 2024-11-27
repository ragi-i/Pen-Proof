import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // For redirection
import './SignupPage.css';

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Author");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long, with at least one letter, one number, and one special character."
      );
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        name,
        email,
        password,
        role,
      });
  
      // Save user details to localStorage
      const { name: userName, email: userEmail, role: userRole } = response.data.user;
      const userData = { userName, userEmail, userRole };
    
      // Save the filtered user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
  
      alert("Signup Successful!");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(
        "Signup Failed:",
        err.response?.data?.message || err.message
      );
      alert("Signup Failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="body-background">
    <form onSubmit={handleSignup}>
    <h1>Share Your Daily Thoughts</h1>
      <h2>User Signup</h2>
      <div>
        <label>
          <input
            type="radio"
            value="Author"
            checked={role === "Author"}
            onChange={(e) => setRole(e.target.value)}
          />
          Author
        </label>
        <label>
          <input
            type="radio"
            value="Admin"
            checked={role === "Admin"}
            onChange={(e) => setRole(e.target.value)}
          />
          Admin
        </label>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
      <div className="login-link">
          <p>Already a User? <Link to="/login">Login</Link></p>
        </div>
    </form>
    </div>
  );
};

export default SignupPage;
