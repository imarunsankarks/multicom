const router = require("express").Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/auth", require("./auth.routes"));
router.use("/", require("./user.routes"));

module.exports = router;
