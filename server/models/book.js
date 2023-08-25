const mongoose = require('mongoose');

const Book = mongoose.model('Book', mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    }
}));

module.exports.Book = Book;