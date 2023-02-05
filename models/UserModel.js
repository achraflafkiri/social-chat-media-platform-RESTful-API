const { Schema, model } = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");

const userschema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true
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

userschema.pre("save",async function(next){
  if( ! this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password,12)
  this.confirmPassword = undefined
})

// check if the password is true
userschema.methods.isCorrectPassword = async function (
  condidatPassword,
  password
) {
  console.log("*****");
  return await bcrypt.compare(condidatPassword, password);
};

const User = model("User", userschema);
module.exports = User;
