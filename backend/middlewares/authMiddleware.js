const jwt = require("jsonwebtoken");
const verifyToken = require("../helpers/verifyToken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req._id = decoded.id;
      console.log("protected: \n", req._id);
    } catch (error) {
      res.status(401).send(`Not Authorized. ERROR: ${error.message}`);
    }

    next();
  } else {
    res.status(401).send("Not Authorized, no token");
  }
};

const protectFarms = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // token = req.headers.authorization.split(" ")[1];

      // const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const decoded = verifyToken(token);

      req.ids = decoded;
      return console.log(req.ids);
    } catch (error) {
      res.status(401).send(`Not Authorized. ERROR: ${error.message}`);
    }

    next();
  } else {
    res.status(401).send("Not Authorized, no token");
  }
};

module.exports = { protect, protectFarms };
