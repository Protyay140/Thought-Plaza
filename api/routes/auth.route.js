const express = require('express');
const User = require('../models/user_model');
const router = express.Router();
const bcryptjs = require('bcryptjs');

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

router.get('/test',(req,res)=>{
    res.json({msg : "dsfdsf"});
})

module.exports = router;