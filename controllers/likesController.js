const Music = require("../models/MusicModel")
const Like = require("../models/likesModel")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")

const checkLike= async(req,res)=>{
    const object_ = await Like.findOne({user:req.user._id,music:req.params.MusicId})
    console.log(object_)
    return object_!=null
}
const getAllLikeForMusicId = catchAsync(async(req,res,next)=>{
    const likes = await Like.find({file:req.params.MusicId})
    res.status(200).json({
        status : "success",
        likes
    })
})
const getOneLikeForMusicId = catchAsync(async(req,res,next)=>{
    const like = await Like.find({music:req.params.likeId,_id:req.params.likeId})
    res.status(200).json({
        status : "success",
        like
    })
})
const postNewLike = catchAsync(async(req,res,next)=>{
    const user = req.user._id

    const file =await File.findById(req.params.MusicId)
    if(!file) return next(new AppError(400,"No file with this id"))
    const newLike =await Like.create({file,user})
    console.log(newLike)
    res.status(200).json({
        status : "success",
        newLike
    })
    next()
})

const deleteLike = catchAsync(async(req,res,next)=>{
    // get the like 
   /*  const like = await Like.findOne({user:req.user._id,file:req.params.MusicId}) */
    if(!await checkLike(req,res)) return next(new AppError(400,"you have no like on this file"))
    await Like.findOneAndDelete({user:req.user._id,music:req.params.MusicId})
    res.status(200).send("deleted")
})
const deleteAllLikes = async(req,res,next)=>{
    await Like.deleteMany()
    res.send("all likes deleted")
}

module.exports={getAllLikeForMusicId,getOneLikeForMusicId,postNewLike,deleteLike,deleteAllLikes}