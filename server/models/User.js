const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Author", "Admin"], default: "Author" },
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare password method
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("User", userSchema);
