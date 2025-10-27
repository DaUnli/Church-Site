require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose
  .connect(config.connectionString)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const User = require("./models/user-model");
const Member = require("./models/member-model");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Member App API 🚀" });
});

// Create admin
app.post("/create-admin", async (req, res) => {
  const { fullName, idNumber, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Fullname is required" });
  }

  if (!idNumber) {
    return res.status(400).json({ error: true, message: "ID# is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const existing = await User.findOne({ idNumber });
  if (existing) return res.json({ message: "Admin already exists" });

  const user = new User({ fullName, idNumber, password });
  await user.save();
  res.json({ message: "Admin created successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { idNumber, password } = req.body;
  const user = await User.findOne({ idNumber });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid ID number or password" });
  }

  const token = jwt.sign(
    { id: user._id, idNumber: user.idNumber, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ message: "Login successful", token });
});

// Add member (admin only)
app.post("/add-member", authenticateToken, async (req, res) => {
  const { name, role, profileImage } = req.body;
  const member = new Member({ name, role, profileImage });
  await member.save();
  res.json({ message: "Member added successfully", member });
});

app.delete("/delete-member/:id", authenticateToken, async (req, res) => {
  try {
    const memberId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid member ID format." });
    }

    const deletedMember = await Member.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res
        .status(404)
        .json({ error: true, message: "Member not found." });
    }

    res.status(200).json({
      error: false,
      message: "Member deleted successfully.",
      deletedMember,
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error during deletion." });
  }
});

// Public - show all members
app.get("/members", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.get("/public-members", async (req, res) => {
  const members = await Member.find().select("name role profileImage");
  res.json(members);
});

app.put("/edit-members/:membersId", authenticateToken, async (req, res) => {
  const membersId = req.params.membersId;
  const { name, role, profileImage } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (role) updateFields.role = role;
  if (profileImage) updateFields.profileImage = profileImage;

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(membersId)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Member ID format" });
    }

    const updatedMember = await Member.findByIdAndUpdate(
      membersId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: true, message: "Member not found" });
    }

    return res.json({
      error: false,
      member: updatedMember,
      message: "Member updated successfully",
    });
  } catch (error) {
    console.error("Error updating member:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(8000, () =>
  console.log("🚀 Server running on http://localhost:8000")
);

module.exports = app;
