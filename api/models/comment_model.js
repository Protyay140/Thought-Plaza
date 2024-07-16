const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userId : {
        type : String,
        required: true
    },
    postId : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    likes : {
        type : Array,
        default : []
    },
    totalLikes : {
        type : Number,
        default : 0
    }
},{timestamps : true});

const Comment = mongoose.model('comment',commentSchema);

module.exports = Comment;