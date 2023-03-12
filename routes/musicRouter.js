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
const likesRouter = require("../routes/likesRouter")
const commentsRouter = require("../routes/commentsRouter")

router.use("/:MusicId/likes",likesRouter)
router.use("/:MusicId/comments",commentsRouter)

router.route("/").get(getAllMusic).delete(checkAuth, deleteAllMusics);
router
  .route("/:MusicId")
  .get(checkAdmin, getOneMusic)
  .delete(checkAuth, deleteOneMusic);
router.route("/upload").post(checkAuth, uploadMusic);

module.exports = router;
