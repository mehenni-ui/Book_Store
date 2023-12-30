const asynchandler = require("express-async-handler");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

const {
  createUserRegisterValidation,
  createUserLoginValidation,
} = require("../utils/validation");

const registerUser = asynchandler(async (req, res) => {
  const { error } = createUserRegisterValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already registred" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });

  const result = await user.save();
  const token = user.generateToken();
  const { password, ...other } = result._doc;
  return res
    .status(400)
    .json({ ...other, message: "user created succcesuflly", token: token });
});

const loginUser = asynchandler(async (req, res) => {
  const { error } = createUserLoginValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user does not exist, please register" });
  }

  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordMatched) {
    console.log(passwordMatched);
    return res.status(400).json({ message: "wrong password" });
  }
  const token = user.generateToken();

  return res
    .status(201)
    .json({
      message: "sign in successfully, welcome",
      token: token,
      userr: user,
    });
});

module.exports = {
  registerUser,
  loginUser,
};
