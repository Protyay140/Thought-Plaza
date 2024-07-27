const express = require('express');
const Comment = require('../models/comment_model');
const verifyUser = require('../middleware/verifyUser');
const Post = require('../models/post_model');
const User = require('../models/user_model');
const router = express.Router();

router.post('/create-comment', async (req, res, next) => {
    try {
        const { userId, postId, comment } = req.body;
        const newComment = await Comment.create({
            userId,
            postId,
            comment
        })
        res.status(200).json({ success: false, message: 'comment created successfully', commentInfo: newComment });
    } catch (err) {
        next(err);
    }

})

router.get('/getComments/:postId', async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });

        res.status(200).json({ message: 'get the post comments successfully', success: true, commentInfo: comments });
    } catch (err) {
        next(err);
    }
})

router.delete('/delete-comment/:commentId', async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.commentId });
        if (!comment) {
            return res.status(501).json({ message: 'comment not found' });
        }

        // if (comment.userId != req.user.id) {
        //     return res.status(400).json({ success: false, message: 'you are not allowed to delete !' });
        // }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ success: true, message: 'comment deleted' });
    } catch (err) {
        next(err);
    }
})

router.get('/getParticularUserPostComments/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ user: userId });
        const postIds = posts.map(post => post._id);

        console.log('postIds : ',postIds);
        const comments = await Comment.find({ postId: { $in: postIds } });
        
        console.log('commetns : ',comments);
        return res.status(200).json({success : true,message : 'successfully get user post comments',commentsInfo : comments});
    } catch (err) {
        next(err);
    }
})

router.get('/getAllComments',async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.query.userId});
        if(!user.isAdmin){
            return res.status(400).json({success:false,message:'not allowed to get all comments'});
        }

        const totalComments = await Comment.countDocuments();
        return res.status(200).json({success:true,message:'get all comments successfully',commentInfo:totalComments});
    } catch (err) {
        next(err);
    }
})

router.get('/getRecentComments',async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.query.userId});
        if(!user.isAdmin){
            return res.status(400).json({success:false,message:'not allowed '});
        }
        const limit = req.query.limit || 5;
        const recentComments = await Comment.find({}).sort({ createdAt: -1 }).limit(limit);

        return res.status(200).json({success:true,message:'get all recent comments successfully',commentInfo:recentComments});
    } catch (err) {
        next(err);
    }
})

module.exports = router;