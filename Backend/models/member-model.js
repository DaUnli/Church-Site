const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  profileImage: String,
});

module.exports = mongoose.model("Member", MemberSchema);
