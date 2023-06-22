const { UnauthorizedError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.cookies.access_token;
    if (!token) {
      throw new UnauthorizedError("Invalid token");
    }
    let payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    return next();
  } catch (error) {
    throw new UnauthorizedError("Authentication failed");
  }
};

module.exports = {
  authentication,
};
