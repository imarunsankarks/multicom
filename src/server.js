const { PORT } = require("./config/env");
const connectDB = require("./config/db");
const app = require("./app");

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
};

start();
