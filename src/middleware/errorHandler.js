const notFound = (req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  // MongoDB duplicate key (e.g. same email twice)
  if (err.code === 11000) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const status = err.statusCode || 500;
  if (status === 500) console.error(err);

  res.status(status).json({
    error: status === 500 ? "Something went wrong" : err.message,
  });
};

module.exports = { notFound, errorHandler };
