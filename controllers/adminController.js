const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  console.log("*******************getAllUsers**********************");
  const users = await User.find();
  if (!users) return next(new AppError(404, "Users not found"));
  res.status(200).json({
    status: "success",
    data: {
      legth: users.length,
      users,
    },
  });
});

const getOneUser = catchAsync(async (req, res, next) => {
  console.log("*******************getOneUer**********************");
  const userId = req.params.id;
  const user = await User.findById({ id: userId });
    if (!user) return next(AppError(404, "User not found"))
  res.status(200).json({
    status: "success",
    data: {
      legth: user.length,
      user,
    },
  });
});


module.exports = { getAllUsers, getOneUser};
