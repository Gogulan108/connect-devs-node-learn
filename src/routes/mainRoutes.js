const express = require("express");
const router = express.Router();
const { userAuthenticated } = require("../middlewares/auth");

const User = require("../models/userModel");
const validateUserInput = require("../middlewares/validateUserInput");

// Home route
router.get("/", (req, res) => {
  res.send("Welcome to Connect Dev's API");
});

// Get user profile
router.get("/user", userAuthenticated, async (req, res) => {
  try {
    if (req.user) {
      res.status(200).send(req.user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error during user retrieval:", error);
    res.status(400).send("Something went wrong");
  }
});

// Get all users (feed)
router.get("/feed", userAuthenticated, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(400).send("Something went wrong");
  }
});

// Delete user by id
router.delete("/user", userAuthenticated, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(400).send("Error:" + error.message);
  }
});

// Update user by id
router.patch(
  "/user",
  userAuthenticated,
  validateUserInput,
  async (req, res) => {
    try {
      const userId = req.user._id;
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
  }
);

module.exports = router;
