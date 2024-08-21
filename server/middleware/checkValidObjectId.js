const { isValidObjectId } = require("mongoose");

module.exports = function (req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    //   console.log("valid id", req.params.id);
    return res.status(400).json({ error: "Invalid id" });
  }
  next();
};
