const { Book } = require("../models/Book");
const asyncHandler = require("express-async-handler");
const {
  createBookValidation,
  updateBookValidation,
} = require("../utils/validation");

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @acces public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  //$eq --> equals  =
  //$ne --> not equals =/=
  //lte --> less then and equal <=
  //gte --> greater then and equals
  console.log("request query : ", req.query);
  const { maxPrice, minPrice } = req.query;

  let books;

  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "fName", "lName"]);
  } else {
    books = await Book.find().populate("author", ["_id", "fName", "lName"]);
  }

  res.status(201).json(books);
});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @acces public
 */

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    return res.status(200).json(book);
  }
  return res.status(404).json({ message: "book nout avaible" });
});

/**
 * @desc create  new book
 * @route /api/books
 * @method POST
 * @acces public
 */

const createNewBook = asyncHandler(async (req, res) => {
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
});



/**
 * @desc update book
 * @route /api/books/:id
 * @method PUT
 * @acces public
 */

const updateBook = asyncHandler(async (req, res) => {
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
});



/**
 * @desc delete book
 * @route /api/books/:id
 * @method Delete
 * @acces public
 */


const deleteBook = asyncHandler(async (req, res) => {
      const book = await Book.findById(req.params.id);
      if (book) {
        await Book.findByIdAndDelete(req.params.id);
        return res.status(201).json({ mrssage: "book has been deleted" });
      }
      return res.status(404).json({ mrssage: "book does not exist" });
    })

module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook
};
