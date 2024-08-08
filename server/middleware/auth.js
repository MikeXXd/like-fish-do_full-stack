const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const JWToken = req.header("x-auth-token");
  if (!JWToken) {
    return res.status(401).send("Access denied. No JWToken provided.");
  }
  try {
    const decoded = jwt.verify(JWToken, process.env.JWT_SECRET);
    console.log("decoded JWToken", decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid JWToken.");
  }
}
