const express = require("express");
const app = express(); //instance of express like new application
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/database");

//Database Connection and always connect database before starting the server
connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
