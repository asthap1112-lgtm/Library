const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publishedyear: {
        type: Number,
    },
    category: {
        type: String,
    },
    trusted: {
        type: Boolean,
        default: false,
    },
},
    {timestamps: true }
);
module.exports = mongoose.model('Book',BookSchema);