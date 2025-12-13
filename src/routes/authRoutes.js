const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, age, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res
      .status(200)
      .json({ message: "User signed up successfully", user: savedUser });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(400).send("Error:" + error.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  console.log("Login request body:", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("username or password is incorrect");
    }
    const jwtToken = await user.getJwt();
    res.cookie("token", jwtToken);
    res
      .status(200)
      .json({ message: "Login successful", user: user, token: jwtToken });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(400).send("Error during login:" + error.message);
  }
});

module.exports = router;
