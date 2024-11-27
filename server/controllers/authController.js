const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {});
};

exports.login = async (req, res) => {

  try {
    console.log('hi',req.body);
    const { email, password, role } = req.body;
    // console.log('hi',req.body);
    console.log('2');
    console.log('1');
    const user = await User.findOne({email}); // Find user by email only
    console.log('Fetched User:', user); 
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Specific message for user not found
    }
    console.log('3');
    if (user.role !== role) {
      return res.status(401).json({ message: "Invalid role" }); // Specific message for role mismatch
    }
    console.log('4');
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }

    if(user.password!=password){
         return res.status(401).json(
       { message: "Invalid email or password" });
    }

    console.log('5');
    const token = generateToken(user._id);
  
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }


  
};

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, with at least one letter, one number, and one special character",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = await User.create({ name, email, password: hashedPassword, role });
     const newUser = await User.create({ name, email, password, role });
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};