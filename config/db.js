const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI_CONNECTION);
    console.log("succesfully to mongo db");
  } catch (error) {
    console.log("error to mongo db ", error);
  }
}


module.exports = {
      connectDB
}