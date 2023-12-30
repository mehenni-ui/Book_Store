const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthor,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

router.get("/", getAllAuthor);

router.get("/:id", getAuthorById);

router.post("/", verifyTokenAndAdmin, createAuthor);

router.put("/:id", verifyTokenAndAdmin, updateAuthor);

router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
