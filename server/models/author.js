const mongoose = require('mongoose');

const Author = mongoose.model('Author', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    job:{
        type: String,
        required: true
    },
    about: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    phoneNumber: {
        type: String
    }
}));

module.exports.Author = Author;
