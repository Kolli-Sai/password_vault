const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  BadRequestError,
  UnprocessableEntityError,
} = require("../errors/customErrors");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
});

const registerUser = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw new UnprocessableEntityError(
        "Invalid input: " + error.details[0].message
      );
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new BadRequestError("Email already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    let createUser = await User.create(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", ...createUser._doc });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new UnprocessableEntityError(
        "Invalid input: " + error.details[0].message
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("Email not found");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new BadRequestError("Incorrect password");
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    res
      .cookie("access_token", token, { secure: true, sameSite: "None" })
      .status(201)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
