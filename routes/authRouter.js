const { Router } = require("express");
const { Signup, Signin } = require("../controllers/authController");
const router = Router();

// CREATE NEW USER
router.route("/Signup").post(Signup);
router.route("/Signin").post(Signin);

module.exports = router;