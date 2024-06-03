const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: [100, 'Description cannot exceed 100 characters.'],
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
