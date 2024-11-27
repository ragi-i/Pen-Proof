const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  authorName: { type: String, required: true },
  topic: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Export the Post model
module.exports = mongoose.model("Post", postSchema);
