const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}));

module.exports.Category = Category;
