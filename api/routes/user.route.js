const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser.js');
const bcryptjs = require('bcryptjs');
const User = require('../models/user_model.js');

router.put('/update/:userId', verifyUser, async (req, res, next) => {
    try {
        // console.log('verify User : ', req.user);
        if (req.user.id != req.params.userId) {
            return res.status(401).json({ success: false, message: "not allowed !!!" });
        } else {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }
            const updateUser = await User.findByIdAndUpdate(req.user.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profileImage: req.body.profileImage
                }
            }, { new: true });

            const { password: pass, ...rest } = updateUser._doc;

            return res.status(200).json({ success: true, message: "update successfull", userData: rest });

        }
    } catch (err) {
        next(err);
    }
})

router.delete('/delete/:userId',verifyUser,async(req,res,next)=>{
    try {
        if(req.user.id != req.params.userId){
            return res.status(401).json({ success: false, message: "not allowed to delete !!!" });
        }else{
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            res.status(200).json({ success: true, message: "user successfully deleted !!!" })
        }
    } catch (err) {
        next(err);
    }
})


router.post('/signout',async(req,res,next)=>{
    try {
        res.clearCookie('auth_token').status(200).json({success : true,message : "successfully signout"});
    } catch (err) {
        next(err);
    }
})

module.exports = router;