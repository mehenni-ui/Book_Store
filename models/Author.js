const mongoose = require("mongoose")


const authorSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    nationality:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    image: {
        type: String,
        default: "default-avatar.png"
    }
}, {
    timestamps: true
})


const Author = mongoose.model("Author", authorSchema)

module.exports = {
    Author
}