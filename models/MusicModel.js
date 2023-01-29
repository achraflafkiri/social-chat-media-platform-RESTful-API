const {
    Schema,
    model,
    mongoose
} = require("mongoose");

const musicSchema = new Schema({
  title: {
    type: String,
    required: [true, "please title is required"],
    unique: true
  },
  artist: {
    type: String,
    required: [true, "please artist is required"],
  },
  album: {
    type: String,
    required: [true, "please album is required"],
  },
  genre: {
    type: String,
    required: [true, "please genre is required"],
  },
  length: {
    type: Number,
    required: [true, "What is the duration of the music in second ?"],
  },
  file: {
    type: String,
    required: [true, "please Music file is required"],
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
});

const Music = model("Music", musicSchema);
module.exports = Music;
