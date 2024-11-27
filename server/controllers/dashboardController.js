const User = require("../models/User");
const Post = require('../models/Post');
console.log('Post:', Post);

exports.AllUser = async (req, res) => {
    console.log('hello');
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

  exports.RemoveAuthor=async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
  }


  exports.AddPost = async (req, res) => {
    console.log('req.body', req.body);
    const { userEmail, topic, thoughts } = req.body;
  
    try {
      // Find the author using the email
      const author = await User.findOne({ email: userEmail });
  
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
  
      // Create a new post instance with the author's name
      const newPost = new Post({
        userEmail,
        authorName: author.name, // Fetch and include the author's name
        topic,
        thoughts,
      });
  
      // Save the post to the database
      await newPost.save();
      res.status(200).json({ message: "Post submitted successfully!" });
    } catch (error) {
      console.error("Error saving post:", error);
      res.status(500).json({ message: "Failed to submit post." });
    }
  };
  

  exports.AllPost=async (req, res) => {
    try {
      console.log("Fetching all posts...");
      console.log('hello');
      const posts = await Post.find(); // Fetch all posts from the database
      console.log("post",posts);
      res.status(200).json(posts); // Send the posts as a JSON response
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };