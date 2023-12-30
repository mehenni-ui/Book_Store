const { Book } = require("./models/Book");
const { Author } = require("./models/Author")
const { books, authors } = require("./data");
const { connectDB } = require("./config/db");
require("dotenv").config();
connectDB();

const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


const importAuthors = async () => {
      try {
        await Author.insertMany(authors);
        console.log("Authors Imported");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };
    
    const removeAuthors = async () => {
      try {
        await Author.deleteMany();
        console.log("Authors Removed");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };


if (process.argv[2] === "-importB") {
  importBooks();
} else if (process.argv[2] === "-removeB") {
  removeBooks();
}


if (process.argv[2] === "-importA") {
      importAuthors();
    } else if (process.argv[2] === "-removeA") {
      removeAuthors();
    }
    
