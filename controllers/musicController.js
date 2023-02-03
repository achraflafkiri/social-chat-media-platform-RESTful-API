const User = require("../models/UserModel");
const Music = require("../models/MusicModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const formidable = require("formidable");
const fs = require("fs");
// CAN I USE THE IMPORT SYNTAX
// const esModuleShims = require("es-module-shims");

// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA4nWJ9i0u296H1NFJN--5pQdi3ojOKXKA",
//   authDomain: "social-media-platform-7ab73.firebaseapp.com",
//   projectId: "social-media-platform-7ab73",
//   storageBucket: "social-media-platform-7ab73.appspot.com",
//   messagingSenderId: "819500468390",
//   appId: "1:819500468390:web:36921bf94329680f1ccc67",
//   measurementId: "G-FQ4YJNLLFP",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

// const uploadMusic = catchAsync(async (req, res, next) => {
//   try {
//     const { title, artist, album, genre, length } = req.body;

//     console.log("form data => ", title, artist, album, genre, length);

//     //Upload music to firebase storage
//     // const file = req.files.audio;
//     // const fileName = `music/${music._id}.${file.mimetype.split("/")[1]}`;
//     // const fileUpload = await storage.bucket().upload(file.tempFilePath, {
//     //   destination: fileName,
//     //   metadata: {
//     //     contentType: file.mimetype,
//     //   },
//     // });
//     // music.audioUrl = `https://storage.googleapis.com/${storage.bucket().name}/${
//     //   fileUpload[0].name
//     // }`;
//     // await music.save();
//     // res.status(201).send(music);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// FOR MONGODB

const uploadMusic = catchAsync(async (req, res, next) => {
  console.log("*****upload MUSIC*****");
  console.log("**********************");

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
