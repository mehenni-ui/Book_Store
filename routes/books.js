const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", verifyTokenAndAdmin, createNewBook);

router.put("/:id", verifyTokenAndAdmin, updateBook);

router.delete("/:id", verifyTokenAndAdmin, deleteBook);

module.exports = router;
