const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];

  // Check for token
  if (!token)
    return res.status(404).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(404).json({ msg: "Token is not valid, Login or Register!" });
  }
};
