const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const bcrypt = require("bcrypt");

// Home route
router.get("/", (req, res) => {
  res.send("Welcome to Connect Dev's API");
});

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
    res.status(400).send("Error during signup");
  }
});

router.post("/login",async(req,res)=>{
  const{email,password}=req.body;
  try{
    const user=await User.findOne({email:email});
    if(!user){
      return res.status(400).send("User not found");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).send("username or password is incorrect");
    }
    res.status(200).json({message:"Login successful",user:user});
  }
  catch(error){
    console.error("Error during user login:", error);
    res.status(400).send("Error during login:" + error.message);
  }
})

// Get user by email
router.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error during user retrieval:", error);
    res.status(400).send("Something went wrong");
  }
});

// Get all users (feed)
router.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(400).send("Something went wrong");
  }
});

// Delete user by id
router.delete("/user", async (req, res) => {
  try {
    const userId = req.body.id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send("Something went wrong");
  }
});

// Update user by id
router.patch("/user", async (req, res) => {
  try {
    const userId = req.body.id;
    const updateData = req.body.updatedData;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Something went wrong");
  }
});

module.exports = router;
