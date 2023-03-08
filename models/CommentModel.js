const { Schema, default: mongoose, model } = require("mongoose");
const Music = require("./MusicModel");

const CommentsSchema = new Schema({
    text : {
        type :String,
        required:[true,"Text is required"]
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref:"User",
    },file:{
        type : mongoose.Schema.ObjectId,
        ref : "Music"
    },createdAt : {
        type : Date,
        default : Date.now()
    }
})

CommentsSchema.index({user:1,file:1},{unique:true})

CommentsSchema.statics.calc =async function(musicId){
    const commentsStatics =await this.aggregate([
        {
            $match:{file:musicId}
        },
        {
            $group:{
                _id:"$file",
                comments : {$sum:1 } 
            } }
    ])
    console.log(commentsStatics)
    if(commentsStatics.length==0) return await Music.findByIdAndUpdate(musicId,{comment: 0 } ,{new:false})
    await Music.findByIdAndUpdate(musicId,{comment:commentsStatics[0].comments } ,{new:false})
}
CommentsSchema.pre(/^find/,function(next){
    this.populate("user","username")
    next()
})
CommentsSchema.post("save",function(doc){
    doc.constructor.calc(doc.file)
})
CommentsSchema.post("findOneAndDelete",function(doc){
    if(doc)return doc.constructor.calc(doc.file)
})

const Comment = model("Comment",CommentsSchema)
module.exports = Comment