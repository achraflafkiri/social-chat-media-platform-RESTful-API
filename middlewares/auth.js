const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

const checkAuth = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt) {
    // check if there is a token
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return next(new AppError(401, "SignIn first"));
  }
  // get the token
  var token = "";
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  //check if the token if true
  const verified = jwt.verify(token, process.env.JWT); // display an error because process.env.JWT and token are not same
  console.log("verified***", verified);
  //check if user still exists
  const user = await User.findById(verified.id);
  if (!user) next(new AppError(401, "This user no more exicts"));
  // check if the user doesnt change his password after a given jwt
  if (await user.isChanged(verified.iat))
    return next(new AppError(401, "The user has been changed his password"));
  req.user = user;
  next();
});

function checkAdmin(req, res, next) {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: "error",
      message: "Forbidden - Only admins are allowed to access this route.",
    });
  }

  // If the user is an admin, call the next middleware function
  next();
}

module.exports = { checkAuth, checkAdmin };
