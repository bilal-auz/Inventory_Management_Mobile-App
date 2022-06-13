const jwt = require("jsonwebtoken");

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
    } catch (error) {
      res.status(401).send(`Not Authorized. ERROR: ${error.message}`);
    }

    next();
  } else {
    res.status(401).send("Not Authorized, no token");
  }
};

module.exports = { protect };
