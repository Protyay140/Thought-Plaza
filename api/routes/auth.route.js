const express = require('express');
const User = require('../models/user_model');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup',async (req,res,next)=>{
    
    try {
        const {username,email,password} = req.body;
        

        console.log("username : ",username);
        console.log("email : ",email);
        console.log("password : ",password);
        if(!username || !email || !password){
           return res.status(500).json({message : "all fields are required ..."});    
        }
        
        const hashPassword = bcryptjs.hashSync(password,10);
        const newUser = await User.create({
            username,
            email,
            password : hashPassword 
        })

        res.status(200).json({msg : "signup successful", success:true});
    } catch (err) {
        next(err);
    }
})


router.post('/signin',async (req,res,next)=>{
    const { email , password } = req.body;

    if(!email || !password){
        return res.status(500).json({message : "all fields are required" , success : false});
    }

    try {
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(500).json({message : "email doesn't exist !!!" ,success : false});
        }
        const checkPassword = bcryptjs.compareSync(password,checkUser.password);
        if(!checkPassword){
            return res.status(500).json({message : "wrong password !!!" , success : false});
        }

        const token = jwt.sign(
            {id : checkUser._id} , process.env.JWT_SECRET
        )

        // seperating the password from the rest of the information of the user .....
        const {password:pass ,...rest} = checkUser._doc;


        res.status(200).cookie('auth_token',token,{httpOnly : true}).json({success:true , message:"signin successfull", userData:rest});
    } catch (err) {
        next(err);
    }
})

module.exports = router;