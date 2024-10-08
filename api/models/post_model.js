const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "uncategorized",
    },
    image: {
        type: String,
        default: ''
    }

}, { timestamps: true })

const Post = mongoose.model('post', postSchema);
module.exports = Post;