const { Schema, model } = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");

const userschema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "email is invalid",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      // validate: {
      //   validator: (value) => {
      //     return validator.isStrongPassword(value);
      //   },
      //   message: "password is not wrong",
      // },
    },
    confirmpassword: {
      type: String,
      required: [true, "confirmpassword is required"],
      validate: {
        validator: function (value) {
          console.log("this.password", this.password);
          return this.password === value;
        },
      },
      message: "passwords don't match",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    changedAt: {
      type: Date,
    },
    resetToken: String,
    exipreResetToken: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userschema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});
userschema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.changedAt = Date.now();
  this.resetToken = undefined;
  this.exipreResetToken = undefined;
});
// check if the password is true
userschema.methods.isCorrectPassword = async function (
  condidatPassword,
  password
) {
  console.log("*****");
  return await bcrypt.compare(condidatPassword, password);
};
// chekck if the password changed
userschema.methods.isChanged = async function (creationDate) {
  if (!this.changedAt) return false;
  return parseInt(this.changedAt.getTime() / 1000) > creationDate;
};
// create the reset token
userschema.methods.resetTokenMethod = async function () {
  const reset_token = crypto.randomBytes(32).toString("hex");
  const crypted_reset_token = crypto
    .createHash("sha256")
    .update(reset_token)
    .digest("hex");
  this.resetToken = crypted_reset_token;
  this.exipreResetToken = new Date(Date.now() + 600000); // 10 min
  return reset_token;
};

const User = model("User", userschema);
module.exports = User;
