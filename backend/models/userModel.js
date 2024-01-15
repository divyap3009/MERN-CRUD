const mongoose = require("mongoose");

// create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

// create Model
const User = mongoose.model("User", userSchema);

module.exports = User;
