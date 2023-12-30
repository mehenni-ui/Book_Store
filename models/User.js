const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 10,
      maxlength: 50,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


userSchema.methods.generateToken = function(){
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.SECRET_KEY
  )
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
