const { Router } = require("express");
const {
  updateProfile,
  getAllUsers,
  getOneUser,
} = require("../controllers/userController");
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");

const router = Router();

// UPDATE PASS OR USERNAME OR EMAIL OR
router.route("/").get(checkAdmin, getAllUsers);
router.route("/:id").get(checkAdmin, getOneUser);
router.route("/").put(checkAuth, updateProfile);

module.exports = router;
