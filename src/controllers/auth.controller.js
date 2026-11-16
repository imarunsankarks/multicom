const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { JWT_SECRET } = require("../config/env");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Email already registered", 409);

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  const ok = user && (await user.comparePassword(password));
  if (!ok) throw new AppError("Wrong email or password", 401);

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = { register, login };
