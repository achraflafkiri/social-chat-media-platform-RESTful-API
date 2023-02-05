const { Router } = require("express");
const { updateProfile } = require("../controllers/usersController.js");
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");

const router = Router();

// UPDATE PASS OR USERNAME OR EMAIL OR
router.route("/").put(checkAuth, updateProfile);

module.exports = router;