const Comment = require("../models/CommentModel")
const Music = require("../models/MusicModel")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")

const checkComment= async(req,res)=>{
    const object_ = await Comment.findOne({user:req.user._id,music:req.params.MusicId})
    console.log(object_)
    return object_!=null
}
const postNewComment = catchAsync(async(req,res,next)=>{
    const music =await Music.findById(req.params.MusicId)
    if(!music) return next(new AppError(400,"No Music with this id"))
    const {text} = req.body
    const comment = await Comment.create({
        text,user:req.user._id,Music:req.params.MusicId
    })
    res.status(201).json({
        status:"success",
        comment
    })
    next()
})
//  delete comment
const deleteComment = catchAsync(async(req,res,next)=>{
    const Music =await Music.findById(req.params.MusicId)
    if(!Music) return next(new AppError(400,"No Music with this id"))
    if(!await checkComment(req,res)) return next(new AppError(400,"you have no comment on this Music"))
    const comment = await Comment.findOneAndDelete({user:req.user._id,Music:req.params.MusicId})
    res.status(200).send("deleted")
    next()
})
module.exports = {postNewComment,deleteComment}