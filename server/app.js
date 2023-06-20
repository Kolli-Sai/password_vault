//! import packages
const express = require("express");
const mongoose = require("mongoose");

//! import middlewares
const { not_found } = require("./middlewares/not_found");

//! import routers
const { authRouter } = require("./routes/auth");
const { passwordsRouter } = require("./routes/passwords");

//! import dotenv variables
require("dotenv/config");

//! invoking express module
const app = express();

//! middlewares

//! route middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", passwordsRouter);

//! custom Not-Found middleware
app.use(not_found);

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
