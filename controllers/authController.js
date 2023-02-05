const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

// get the passport
const passport = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRESDELAI,
  });
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

// Signin
const Signin = catchAsync(async (req, res, next) => {
  // check if the user enter the password and the email
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(401, "please enter your email and your password"));
  // check if the email and the password are true
  const user = await User.findOne({ email });
  console.log("signin user ****", user);
  if (!user || !(await user.isCorrectPassword(password, user.password)))
    return next(new AppError(401, "incorrect email or password"));
  // give the passport
  passport(user, res);
});

module.exports = { Signup, Signin };
