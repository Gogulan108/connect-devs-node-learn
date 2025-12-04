const express = require("express");

const app = express(); //instance of express like new application

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Connect Dev's!");
});
app.get("/hello", (req, res) => {
  res.send("Welcome to Connect Dev's! hello route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
