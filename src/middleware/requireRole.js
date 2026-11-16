const AppError = require("../utils/AppError");

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError("Not allowed for your role", 403));
  }
  next();
};

module.exports = requireRole;
