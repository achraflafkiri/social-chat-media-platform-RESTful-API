const { Router } = require("express");
const { getAllMusic, uploadMusic } = require("../controllers/musicController");
const router = Router();

router.route("/").get(getAllMusic);
router.route("/upload").post(uploadMusic);

module.exports = router;
