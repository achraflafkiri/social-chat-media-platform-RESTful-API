const { Router } = require("express");
const { getAllUsers, getOneUser } = require("../controllers/userController.js");
const router = Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser);

module.exports = router;
