const { UnauthorizedError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid token");
    }
    const token = authHeader.split(" ")[1];

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
