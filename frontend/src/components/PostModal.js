import React, { useState, useEffect } from "react";
import "./PostModal.css"; // Add styling for the modal
import axios from "axios";

const PostModal = ({ closeModal }) => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const email=user.userEmail;
  const [topic, setTopic] = useState(""); // State for the topic
  const [thoughts, setThoughts] = useState(""); // State for the thoughts
  const [userEmail, setUserEmail] = useState(email); // State for the user email

  // Log the email value to check what is retrieved from localStorage
 
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser); // Parse the JSON string into an object
  //     console.log("userEmail from localStorage:", user.userEmail); // Debugging log
  //     setUserEmail(user.userEmail);  // Set the userEmail from the parsed object
  //   }  // Set the email to the state
  // }, []); // Empty array to run only once on component mount

  // Handle the 'Post' button click
  const handlePost = async () => {
    const postData = {
      userEmail: userEmail,
      topic: topic,
      thoughts: thoughts,
    };
  
    try {
      const response = await axios.post("http://localhost:8000/dashboard/addPost", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        alert("Post submitted successfully!");
        closeModal(); // Close the modal after posting
      } else {
        alert("Failed to submit post.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("An error occurred while posting.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="post-topic">Write Your Thoughts</h3>
        
        <div className="modal-field">
          <label>User Email:</label>
          <input
            type="email"
            value={userEmail || ""} // Use empty string if userEmail is null
            disabled
          />
        </div>
        
        <div className="modal-field">
          <label>Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter the topic"
          />
        </div>
        
        <div className="modal-field">
          <label>Your Thought:</label>
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            placeholder="Write your thoughts here..."
          />
        </div>

        <div className="modal-actions">
          <button className="close-btn" onClick={closeModal}>Close</button>
          <button className="post-btn" onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
