const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const { getMe, listPatients } = require("../controllers/user.controller");

router.get("/me", authenticate, getMe);
router.get("/patients", authenticate, requireRole("doctor"), listPatients);

module.exports = router;
