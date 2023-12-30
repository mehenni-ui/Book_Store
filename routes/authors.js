const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  updateAuthorValidation,
  createAuthorValidation,
} = require("../utils/validation.js");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const { Author } = require("../models/Author.js");
const asyncHandler = require("express-async-handler");

/**
 * @desc Get all author
 * @route /api/authors
 * @method GET
 * @acces public
 */

router.get(
  "/",

  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    res.status(201).json(authors);
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
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (author) {
      return res.status(200).json(author);
    }

    return res.status(404).json({ message: "author not avaible" });
  })
);

/**
 * @desc create  new author
 * @route /api/books
 * @method POST
 * @acces public
 */

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = createAuthorValidation(req.body);

    if (error) {
      return res.json(error.details[0].message);
    }

    const { fName, lName, nationality, image } = req.body;

    const author = new Author({ fName, lName, nationality, image });

    const createdAuthorresult = await author.save();
    if (createdAuthorresult) {
      return res.status(201).json(createdAuthorresult);
    }

    return res
      .status(500)
      .json({ message: "something went wrong at creating author" });
  })
);

/**
 * @desc update author
 * @route /api/authors/:id
 * @method PUT
 * @acces public
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = updateAuthorValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fName: req.body.fName,
          lName: req.body.lName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    if (author) {
      return res.status(201).json({ mrssage: "author has been updated" });
    }

    return res.status(404).json({ mrssage: "author update failed" });
  })
);

/**
 * @desc delete author
 * @route /api/authors/:id
 * @method Delete
 * @acces public
 */

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      return res.status(201).json({ mrssage: "author has been deleted" });
    }

    return res.status(404).json({ mrssage: "author does not exist" });
  })
);

module.exports = router;
