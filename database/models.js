const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    comments: Array,
    title: {
        type: String,
        required: true
    },
    commentcount: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book
