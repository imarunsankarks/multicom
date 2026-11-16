const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError("User not found", 404);
  res.json(user);
});

const listPatients = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("name email");
  res.json(patients);
});

module.exports = { getMe, listPatients };
