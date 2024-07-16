const express = require('express');
const Comment = require('../models/comment_model');
const verifyUser = require('../middleware/verifyUser');
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

router.delete('/delete-comment/:commentId',verifyUser,async(req,res,next)=>{
    try {
       const comment = await Comment.findOne({_id : req.params.commentId});
       if(!comment){
        return res.status(501).json({message : 'comment not found'});
       }

       if(comment.userId != req.user.id){
        return res.status(400).json({success:false,message:'you are not allowed to delete !'});
       }

       await Comment.findByIdAndDelete(req.params.commentId);
       res.status(200).json({success:true,message:'comment deleted'});
    } catch (err) {
        next(err);
    }
})

module.exports = router;