import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PostModal from "./PostModal"; // Modal component for adding posts
// import "./AdminDashboard.css"; // CSS file for styling (same as AuthorDashboard)
import axios from "axios";
import "./AuthorDashboard.css";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [posts, setPosts] = useState([]); // State to store fetched posts

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch posts from the database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard/allPost"); // API endpoint to fetch posts
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar role="Admin" />
        <div className="dashboard-content">
          <div className="header-container">
            <h1>Manage All Posts</h1>
            <button className="add-post-btn" onClick={openModal}>
              <div className="add">Add Post</div>
              +
            </button>
          </div>

          {/* Render Modal if it's open */}
          {isModalOpen && <PostModal closeModal={closeModal} />}

          {/* Display all posts */}
          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post-card">
                  <div className="post-card-header">
                    <h3>{post.topic}</h3>
                    <p className="author-name">by {post.authorName}</p>
                  </div>
                  <p>{post.thoughts}</p>
                  <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p>No posts available. Start by adding a new post!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
