const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    salt: String,
    iv: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);
module.exports = { Password };
