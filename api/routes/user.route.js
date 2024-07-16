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
            if (req.body.password) {
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

router.delete('/delete/:userId', verifyUser, async (req, res, next) => {
    try {
        if (req.user.id != req.params.userId) {
            return res.status(401).json({ success: false, message: "not allowed to delete !!!" });
        } else {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            res.status(200).json({ success: true, message: "user successfully deleted !!!" })
        }
    } catch (err) {
        next(err);
    }
})

router.delete('/deleteUsers/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({_id:req.params.userId})
        console.log('user admin : ',user.isAdmin)
        if (user.isAdmin) {
            return res.status(401).json({ success: false, message: "You can not delete Admin" });
        } else {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            res.status(200).json({ success: true, message: "user successfully deleted !!!" })
        }
    } catch (err) {
        next(err);
    }
})

router.post('/signout', async (req, res, next) => {
    try {
        res.clearCookie('auth_token').status(200).json({ success: true, message: "successfully signout" });
    } catch (err) {
        next(err);
    }
})

router.get('/getUsers', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.query.userId });
        console.log('user admin : ', user.isAdmin);
        if (!user.isAdmin) {
            return res.status(401).json({ success: false, message: "user is not allowed to delete !!!" });
        }

        const limit = req.query.limit || 9;
        const startFrom = req.query.startFrom || 0;
        const order = req.query.order == 'asc' ? 1 : -1;

        let users = await User.find({}).skip(startFrom).limit(limit).sort({ createdAt: order })

        users = users.map((user) => {
            const { password: pass, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true, message: "get users successfully",
            postInfo: {
                users,
                totalUsers
            }
        })

    } catch (err) {
        next(err);
    }
})


router.get('/getUser/:userId',async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.params.userId});
        res.status(200).json({success:true,message:'user get successfully',userInfo : user});
    } catch (err) {
        next(err);
    }
})

module.exports = router;