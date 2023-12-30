const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  createBookValidation,
  updateBookValidation,
} = require("../utils/validation.js");
const { Book } = require("../models/Book.js");
const asyncHandler = require("express-async-handler");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");


/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @acces public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", [
      "_id",
      "fName",
      "lName",
    ]);
    res.status(201).json(books);
  })
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @acces public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      return res.status(200).json(book);
    }
    return res.status(404).json({ message: "book nout avaible" });
  })
);

/**
 * @desc create  new book
 * @route /api/books
 * @method POST
 * @acces public
 */

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = createBookValidation(req.body);

    if (error) {
      return res.json(error.details[0].message);
    }

    const { title, author, desciption, price, cover } = req.body;

    const book = new Book({ title, author, desciption, price, cover });

    const createdBook = await book.save();
    if (createdBook) {
      return res.status(201).json(createdBook);
    }
    return res
      .status(500)
      .json({ message: "something went wrong at creting book" });
  })
);

/**
 * @desc update book
 * @route /api/books/:id
 * @method PUT
 * @acces public
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = updateBookValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          desciption: req.body.desciption,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );

    if (book) {
      return res.status(201).json({ message: "book has been updated" });
    }
    return res.status(404).json({ mrssage: "book not found to be updated" });
  })
);

/**
 * @desc delete book
 * @route /api/books/:id
 * @method Delete
 * @acces public
 */

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      return res.status(201).json({ mrssage: "book has been deleted" });
    }
    return res.status(404).json({ mrssage: "book does not exist" });
  })
);

module.exports = router;
