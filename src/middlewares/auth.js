const userAuthenticated = (req, res, next) => {
  const isAuthenticated = false; // This should be replaced with real authentication logic
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
module.exports = {
  userAuthenticated,
};
