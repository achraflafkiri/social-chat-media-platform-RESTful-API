const { Router } = require("express");
const {
  getAllMusic,
  uploadMusic,
  getOneMusic,
  deleteOneMusic,
} = require("../controllers/musicController");
const router = Router();
const { checkAuth, checkAdmin } = require("../middlewares/auth");

router.route("/").get(getAllMusic);
router
  .route("/:MusicId")
  .get(checkAdmin, getOneMusic)
  .delete(checkAdmin, deleteOneMusic);
router.route("/upload").post(checkAuth, uploadMusic);

module.exports = router;
