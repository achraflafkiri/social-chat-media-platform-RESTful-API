const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

const checkAuth = catchAsync(async (req, res, next) => {
  console.log("req.headers.authorization", req.headers.authorization);
  if (!req.headers.authorization)
    return next(new AppError(404, "Please login first"));
  const token = req.headers.authorization.split(" ")[1];
  console.log("token => ", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(404, "User Not Found"));
  req.userData = decoded;
  next();
});

const checkAdmin = catchAsync(async (req, res, next) => {
  console.log("****************checkAdmin**************");
  // ! Check if the user is an admin
  // ? console.log("req.user", req.headers.authorization);

  if (!req.headers.authorization)
    return next(new AppError(404, "Please login first"));
  const token = req.headers.authorization.split(" ")[1];
  console.log("token => ", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  console.log("user => is admin ", user);
  if (!user.isAdmin) return next(new AppError(403, "Forbidden - Only admins are allowed to access this route."));
  req.userData = decoded;

  // If the user is an admin, call the next middleware function
  next();
});

module.exports = { checkAuth, checkAdmin };
