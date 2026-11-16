const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(new AppError("Token missing", 401));

  try {
    req.user = jwt.verify(token, JWT_SECRET); // { id, role }
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = authenticate;
