const User = require("../models/UserModel");
const Music = require("../models/MusicModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const formidable = require("formidable");
const fs = require("fs");

// const uploadMusic = catchAsync(async (req, res, next) => {

//     console.log("*****upload MUSIC*****");
//     console.log("**********************");

//     //   console.log("req => ", req);
//   //   console.log("req.body => ", req.body);
//   //   console.log("req.body => ", req.params);

//     const form = formidable({
//         multiples: true,
//         uploadDir: `${__dirname}/../public/audios`,
//     });

//     form.parse(req, async (err, fields, files) => {
//         // console.log("fields => ", fields);
//         // console.log("files => ", files);

//         const { title, artist, album, genre, length } = fields;
//         // mimetype: 'audio/mpeg'
//         // console.log("album", album);
//         // console.log("files.file", files.file);

//         const oldpath = files.file.filepath;
//         const newpath = `${__dirname}/../public/audios${files.file.originalFilename}`;
//         fs.rename(oldpath, newpath, (err) => {
//         if (err) return next(err);

//         if (!files.file.mimetype.startsWith("audio/")) return next(new AppError(415, "Unsupported type of this file"));

//         // STORE PRODUCT INTO A DATABASE
//         const newFile = await Music.create({
//             file: files.file.originalFilename,
//             title: title,
//             artist: artist,
//             album: album,
//             genre: genre,
//             length: length,
//         });

//         res.status(201).json({
//             status: "success",
//             newFile,
//         });

//         //  return next(new AppError(415, "Unsupported type of this file, please uploaded an image"));
//         // 415 Unsupported Media Type: The server does not support the media type of the request.
//         // This status code can be used when the client uploads a file with an unsupported file format.

//          });
//     });

// });

const uploadMusic = catchAsync(async (req, res, next) => {
  console.log("*****upload MUSIC*****");
  console.log("**********************");

  const form = formidable({
    multiples: true,
    uploadDir: `${__dirname}/../public/audios`,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) throw err;

    if (!files.file.mimetype.startsWith("audio/")) {
      throw new AppError(415, "Unsupported type of this file");
    }

    const { title, artist, album, genre, length } = fields;

    fs.renameSync(
      files.file.filepath,
      `${__dirname}/../public/audios/${files.file.originalFilename}`
    );

    // STORE PRODUCT INTO A DATABASE
    const newFile = await Music.create({
      file: files.file.originalFilename,
      title: title,
      artist: artist,
      album: album,
      genre: genre,
      length: length,
    });

    res.status(201).json({
      status: "success",
      newFile,
    });
  });
});

const getAllMusic = catchAsync(async (req, res, next) => {
  console.log("*****GET MUSIC*****");
});

module.exports = { getAllMusic, uploadMusic };
