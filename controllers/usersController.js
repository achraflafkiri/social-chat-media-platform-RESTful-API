const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

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

module.exports = { updateProfile };
