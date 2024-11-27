import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Author"); // Default role set to "Author"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log('hello');
    //  const response = await axios.post("http://localhost:8000/auth/login", { email, password, role });
     const response = await axios.post("http://localhost:8000/auth/login", { email, password, role }, {

    });
    
    console.log('hi');
      localStorage.setItem("token", response.data.token);
      const {email: userEmail, role: userRole } = response.data.user;
      const userData = {userEmail, userRole };
         console.log('userdata',userData);
      // Save the filtered user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // setUser(response.data.user);
     
      console.log('h');
      // Redirect based on role
      // if (response.data.user.role === "Author") {
      //   navigate("/author-dashboard");
      // } else if (role === "Admin") {
      //   window.location.href = "/admin-dashboard";
      // }
      navigate("/author-dashboard");
    } catch (err) {
      console.error('Login Error:', err); // Log the error in the catch block
      if (err.response?.data?.message === "Invalid email or password") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="body-background"> 
    <div className="login-page">
      
      <form onSubmit={handleLogin} className="login-form">
      <h1>Share Your Daily Thoughts</h1>
        <h2>User Login</h2>
        {error && <p className="error-message">{error}</p>}
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
        <button type="submit">Login</button>
        <div className="login-link">
          <p>Not a User? <Link to="/signup">SignUp</Link></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;