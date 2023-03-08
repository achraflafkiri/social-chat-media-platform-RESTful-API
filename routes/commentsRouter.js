const { Router } = require("express");
const { checkAuth } = require("../middlewares/checkLogin");
const { postNewComment,deleteComment } = require("../controllers/commentsController");

const router = Router({mergeParams:true})
router.route("/").post(checkAuth,postNewComment).delete(checkAuth,deleteComment)
module.exports = router