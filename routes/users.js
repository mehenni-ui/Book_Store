const express = require("express");
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  updateUser,
  getAllUser,
  getUserById,
  deleteUser,
} = require("../controllers/userControllers");

router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.get("/", verifyTokenAndAdmin, getAllUser);

router.get("/:id", verifyTokenAndAuthorization, getUserById);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
