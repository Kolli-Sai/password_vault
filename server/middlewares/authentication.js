const { UnauthorizedError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];

    if (!token) {
      throw new UnauthorizedError("Invalid token");
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    return next();
  } catch (error) {
    console.log(`error in authentication -> ${error}`);
    throw new UnauthorizedError("Authentication failed");
  }
};

module.exports = {
  authentication,
};
