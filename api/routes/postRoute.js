const express = require('express');
const Post = require('../models/post_model');
const verifyUser = require('../middleware/verifyUser');
const router = express.Router();

router.post('/create-post', async (req, res, next) => {
    try {

        // if(req.user.isAdmin==false){
        //     return res.status(401).json({success : false,message : "you are not allowed to post "})
        // }

        const newPost = await Post.create(
            req.body
        )

        res.status(200).json({ success: true, message: "Post created successfully", postInfo: newPost });
    } catch (err) {
        next(err);
    }
})

router.get('/getPosts', async (req, res,next) => {
    try {
        const limit = req.query.limit || 9;
        const startFrom = req.query.startFrom || 0;
        const order = req.query.order == 'asc' ? 1 : -1;

        const posts = await Post.find({
            ...(req.query.userId && { user: req.query.userId }),
            ...(req.query.title && { title: req.query.title }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchParam && {
                $or: [
                    { title: { $regex: req.query.searchParam, $options: 'i' } },
                    { category: { $regex: req.query.searchParam, $options: 'i' } }
                ]
            })
        })
            .sort({
                updatedAt: order
            }).limit(limit).skip(startFrom);

        
        const totalPosts = await Post.countDocuments();

        res.status(200).json({success : true , message : "get posts successfully" , 
            postInfo : {
                posts,
                totalPosts
            }
        })
    } catch (err) {
        next(err);
    }
})

router.delete('/delete-post',async(req,res,next)=>{
    try {
        if(!req.query.postId){
            return res.status(200).json({ success: false, message: "post not selected !!!"});
        }
        const data = await Post.findByIdAndDelete({_id : req.query.postId});
        return res.status(200).json({ success: true, message: "post deleted successfully"});
    } catch (err) {
        next(err);
    }
})


module.exports = router; 