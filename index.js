const express = require("express");
const app = express();
require("dotenv").config();
const logger = require("./middlewares/logger.js");
const { notFound, errorHandler } = require("./middlewares/error.js");
const { connectDB } = require("./config/db.js");
app.use(express.json());

// connect to db
connectDB()

app.use(logger);

app.use("/api/books", require("./routes/books.js"));
app.use("/api/authors", require("./routes/authors.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));
//handling error middlware
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
