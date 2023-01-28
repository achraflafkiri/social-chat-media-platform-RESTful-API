const { Schema, model } = require("mongoose");
var validator = require("validator");

const usermodel = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
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
});

const User = model("User", usermodel);
module.exports = User;
