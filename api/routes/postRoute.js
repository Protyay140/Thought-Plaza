const express = require('express');
const Post = require('../models/post_model');
const verifyUser = require('../middleware/verifyUser');
const router = express.Router();

router.post('/create-post',async(req,res,next)=>{
    try {

        // if(req.user.isAdmin==false){
        //     return res.status(401).json({success : false,message : "you are not allowed to post "})
        // }

        const newPost = await Post.create(
            req.body
        )

        res.status(200).json({success : true,message : "Post created successfully",postInfo : newPost});
    } catch (err) {
        next(err);
    }
})

module.exports = router ; 