const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// SIGN UP
const Signup = catchAsync(async (req, res, next) => {
  console.log("*******************login**********************");
  const { username, email, password, confirmpassword } = req.body;
  if (!username || !email || !password || !confirmpassword)
    return next(new AppError(500, "the fileds are required"));
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  });
  console.log("****************************************", user);

  res.status(200).send({
    status: "success",
    user,
  });
});

// SIGN IN
const Signin = catchAsync(async (req, res, next) => {
  console.log("*******************Signin**********************");
  console.log("*****", req.body);
  const { email, username } = req.body;
  if (!email && !username)
    return next(new AppError(500, "please enter your email or username"));
  if (email) {
    const user = await User.findOne({ email: email });
    if (!user) return next(new AppError(404, "You don't have an account"));
    res.status(200).send({
        message: "success",
        user,
      });
  } else if (username) {
    const user = await User.findOne({ username: username });
    if (!user) return next(new AppError(404, "You don't have an account"));
    res.status(200).send({
        message: "success",
        user,
      });
  }
});

module.exports = { Signup, Signin };
