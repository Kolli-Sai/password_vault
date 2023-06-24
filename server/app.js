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
var whitelist = [
  "https://6493f76d097475310710590e--wondrous-beignet-6c8752.netlify.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
    console.log(`connected to MongoDB`);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`error in starting server -> ${error}`);
  }
};

startServer();
