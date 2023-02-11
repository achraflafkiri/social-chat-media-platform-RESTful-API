const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// get the passport
const passport = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRESDELAI,
  });
  console.log("token => ", token);
  res.status(200).json({
    status: "success",
    user,
    token,
  });
};

// Sign up
const Signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmpassword } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    confirmpassword,
  });
  // console.log("signup user ****", newUser);
  passport(newUser, res);
});

// SIGN IN

const Signin = catchAsync(async (req, res, next) => {
  console.log("**********Signin***********");
  const { username, password } = req.body;
  if (!username || !password)
    return next(new AppError(404, "Username and Password are required"));

  const user = await User.findOne({ username: username });
  if (!user) return next(new AppError(401, "Invalid credentials"));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(401, "Invalid credentials"));

  passport(user, res);

  // send response to the client
  res.status(200).json({
    status: "success",
    user: user,
  });
});

module.exports = { Signup, Signin };
