const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = User.find();
  if (!users) return next(new AppError(404, "No users found"));
  res.status(201).json({
    status: "success",
    users,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId)
  const user = await User.findById(userId);
  if (!user) return next(new AppError(404, "No users found"));
  res.status(201).json({
    status: "success",
    user,
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  console.log("********updateProfile********");
  console.log("****************", req.user);

  const body_ = { ...req.body };
  var allowed = ["userName", "email"];
  Object.keys(body_).forEach((el) => {
    if (!allowed.includes(el)) delete body_[el];
  });

  const user = await User.findByIdAndUpdate(req.user._id, body_, {
    runValidators: true,
    new: true,
  });
  res.status(401).json({
    status: "success",
    user,
  });
});

module.exports = { updateProfile, getAllUsers, getUserById };
