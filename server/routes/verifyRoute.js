const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.token;
  if (!token) return res.send({ msg: "Access Denied" }); //status code 401

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = verified._id;
    next();
  } catch (err) {
    res.send({ msg: "Invalid Token" }); //status code (400).
  }
};
