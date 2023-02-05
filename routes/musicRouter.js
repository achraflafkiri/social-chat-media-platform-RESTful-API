const { Router } = require("express");
const {
  getAllMusic,
  uploadMusic,
  getOneMusic,
  deleteOneMusic,
  deleteAllMusics,
} = require("../controllers/musicController");
const router = Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");

router.route("/").get(getAllMusic).delete(checkAuth, deleteAllMusics);
router
  .route("/:MusicId")
  .get(checkAuth, getOneMusic)
  .delete(checkAuth, deleteOneMusic);
router.route("/upload").post(checkAuth, uploadMusic);

module.exports = router;
