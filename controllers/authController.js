const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// GET PASSPORT
const passport = async (user, res) => {
  console.log(user);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "90d" });
  console.log(token);
  res.status(200).json({
    status: "success",
    user,
    token,
  });
};

// SIGN UP
const Signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmpassword } = req.body;
  if (!username || !email || !password || !confirmpassword)
    return next(new AppError(500, "the fileds are required"));

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  });

  passport(user, res);
});

// SIGN IN
const Signin = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email && !username)
    return next(new AppError(500, "please enter your email or username"));
  if (!password)
    return next(new AppError(500, "Your password is not correct!"));
  if (email && password) {
    const user = await User.findOne({ email: email, password: password });
    if (!user) return next(new AppError(404, "You don't have an account"));
    if (user) passport(user, res);
  } else if (username && password) {
    const user = await User.findOne({ username: username, password: password });
    if (!user) return next(new AppError(404, "You don't have an account"));
    if (user) passport(user, res);
  }
});

module.exports = { Signup, Signin };
