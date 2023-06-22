const express = require("express");
const {
  createPassword,
  getAllPasswords,
  getPassword,
  updatePassword,
  deletePassword,
} = require("../controllers/passwords");
const passwordsRouter = express.Router();

passwordsRouter.post("/password", createPassword);
passwordsRouter.get("/passwords", getAllPasswords);
passwordsRouter.get("/password/:id", getPassword);
passwordsRouter.patch("/password/:id", updatePassword);
passwordsRouter.delete("/password/:id", deletePassword);
module.exports = { passwordsRouter };
