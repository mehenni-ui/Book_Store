const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { updateUserValidation } = require("../utils/validation");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    const { error } = updateUserValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "something went wrong in updating", err: error });
    }

    if (req.body.password) {
      let salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    ).select("-password");
    console.log("---------headers ----------", req.headers);
    return res
      .status(201)
      .json({ message: "update info seccussfuly", info: updatedUser });
  })
);

//only admin can get all users
router.get(
  "/",
  verifyTokenAndAdmin,
  asynchandler(async (req, res) => {
    const users = await User.find().select("-password");
    console.log("---------headers ----------", req.headers);
    return res
      .status(201)
      .json({ message: "get all users seccussfuly", user: users });
  })
);

router.get(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      return res
        .status(201)
        .json({ message: "get user seccussfuly", user: user });
    } else {
      return res.status(401).json({ message: "user not found" });
    }
  })
);

router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      await User.findByIdAndDelete(req.params.id)
      return res
        .status(201)
        .json({ message: "dlete user seccussfuly"});
    } else {
      return res.status(401).json({ message: "user not found" });
    }
  })
);


module.exports = router;
