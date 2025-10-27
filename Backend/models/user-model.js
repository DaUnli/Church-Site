const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

module.exports = mongoose.model("User", UserSchema);
