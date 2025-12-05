//mongodb+srv://GogulanKanagaraj:Gogulan108*@leraningnodejs.9v86e1o.mongodb.net/
const mongoose = require("mongoose");
const ConnectionString =
  "mongodb+srv://GogulanKanagaraj:Gogulan108*@leraningnodejs.9v86e1o.mongodb.net/";

const connectDB = async () => {
  await mongoose.connect(ConnectionString);
};
module.exports = connectDB;
