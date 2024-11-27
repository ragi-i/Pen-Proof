import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = localStorage.getItem("user");
    console.log('user',storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirect to home or login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="user-icon">
          <img
            // src="https://via.placeholder.com/50" // Replace with actual user icon or placeholder
            src='https://support.staffbase.com/hc/article_attachments/21016339516050'
            alt="User Icon"
            className="user-avatar"
          />
        </div>
        {user && (
          <div className="user-details">
            <p>{user.userName}</p>
            <p>{user.userEmail}</p>
          </div>
        )}
      </div>
      <div className="navbar-logo">
        <h1>Welcome {user ? user.userRole : "Guest"}</h1>
      </div>
      <div className="navbar-links">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
