const User = require("../models/UserModel");
const Music = require("../models/MusicModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const formidable = require("formidable");
const fs = require("fs");

const uploadMusic = catchAsync(async (req, res, next) => {
  console.log("*****upload MUSIC*****");

  const form = formidable({
    multiples: true,
    uploadDir: `${__dirname}/../public/audios`,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) throw err;

    // console.log(files); // TRUE {}

    // console.log(!files); // FALSE FALSE
    // console.log(!Object.files); // TRUE FALSE
    // console.log(!Object.keys(files).length); // TRUE FALSE
    if (!Object.keys(files).length)
      return next(new AppError(415, "Audio file is required"));

    if (!files.file.mimetype.startsWith("audio/")) {
      return next(new AppError(415, "Unsupported type of this file"));
    }

    const { title, artist, album, genre, length } = fields;

    fs.renameSync(
      files.file.filepath,
      `${__dirname}/../public/audios/${files.file.originalFilename}`
    );

    // STORE PRODUCT INTO A DATABASE
    const newAudio = await Music.create({
      file: files.file.originalFilename,
      title: title,
      artist: artist,
      album: album,
      genre: genre,
      length: length,
    });

    res.status(201).json({
      status: "success",
      newAudio,
    });
  });
});

const getAllMusic = catchAsync(async (req, res, next) => {
  console.log("*****GET MUSIC*****");

  const music = await Music.find();
  if (!music) return next(new AppError(404, "Music not found"));

  res.status(201).send({
    status: "success",
    music,
  });
});

const getOneMusic = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE MUSIC*****");

  console.log("id => ", req.params.MusicId);

  const music = await Music.findById(req.params.MusicId);
  if (!music) return next(new AppError(404, "No music found by this id"));

  res.status(201).send({
    status: "success",
    music,
  });
});

const deleteOneMusic = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE MUSIC*****");

  console.log("id => ", req.params.MusicId);

  const music = await Music.findByIdAndUpdate(
    req.params.MusicId,
    { $set: { deleted: true } },
    { new: true }
  );
  if (!music) return next(new AppError(404, "Music not found with that ID."));

  // Save the music document from the database
  // await music.save();

  res.status(200).send({
    status: "success",
    message: "Music deleted successfully",
  });
});

const deleteAllMusics = catchAsync(async (req, res, next) => {  
    console.log("*****DELETE ALL MUSICS*****");

    const musics = await Music.find();
    if (!musics) return next(new AppError(404, "No Music uploaded yet!."));

    await musics.remove()

    res.status(200).send({
      status: "success",
      message: "All Musics has been deleted successfully",
    });
})

module.exports = { getAllMusic, getOneMusic, uploadMusic, deleteOneMusic, deleteAllMusics };
