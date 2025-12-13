const validator = require("validator");

// Middleware to validate user input for signup and update
function validateUserInput(req, res, next) {
  const { firstName, lastName, email, phoneNumber, age, password } = req.body;

  if (firstName && typeof firstName !== "string") {
    return res.status(400).json({ message: "First name must be a string." });
  }
  if (lastName && typeof lastName !== "string") {
    return res.status(400).json({ message: "Last name must be a string." });
  }
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }
  if (
    phoneNumber &&
    !validator.isMobilePhone(phoneNumber + "", undefined, { strictMode: false })
  ) {
    return res.status(400).json({ message: "Invalid phone number." });
  }
  if (age && (!Number.isInteger(age) || age < 8)) {
    return res.status(400).json({ message: "Invalid age." });
  }
  if (password && !validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Password is not strong enough." });
  }
  next();
}

module.exports = validateUserInput;
