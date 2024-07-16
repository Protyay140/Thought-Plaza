const express = require('express');
const Comment = require('../models/comment_model');
const router = express.Router();

router.post('/create-comment',async(req,res,next)=>{
    try{
        const {userId,postId,comment} = req.body;
        const newComment = await Comment.create({
            userId,
            postId,
            comment
        })
        res.status(200).json({success:false,message:'comment created successfully',commentInfo:newComment});
    }catch(err){
        next(err);
    }

})

router.get('/getComments/:postId',async(req,res,next)=>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({createdAt : -1});

        res.status(200).json({message:'get the post comments successfully',success : true,commentInfo : comments});
    } catch (err) {
        next(err);
    }
})

module.exports = router;