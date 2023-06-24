//! import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//! import middlewares
const { not_found } = require("./middlewares/not_found");
const { customError } = require("./middlewares/errorHandler");
const { authentication } = require("./middlewares/authentication");

//! import routers
const { authRouter } = require("./routes/auth");
const { passwordsRouter } = require("./routes/passwords");

//! import dotenv variables
require("dotenv/config");

//! invoking express module
const app = express();

const corsOptions = {
  origin:
    "https://6496a15e15317c3888be264f--wondrous-beignet-6c8752.netlify.app",
  credentials: true,
};
//! middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//! route middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authentication, passwordsRouter);

//! custom Not-Found middleware
app.use(not_found);

//! custom error handling middleware
app.use(customError);

//! connect to DB and listen to requests
const port = process.env.PORT || 8190;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Error in starting server: ${error}`);
  }
};

startServer();
