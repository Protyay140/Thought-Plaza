const express = require('express');
const User = require('../models/user_model');
const router = express.Router();
const bcryptjs = require('bcryptjs');

router.post('/signup',async (req,res)=>{
    
    try {
        const {username,email,password} = req.body;
        

        console.log("req : ",req.body);
        if(!username || !email || !password){
           return res.status(500).json({message : "all fields are required ..."});    
        }
        
        const hashPassword = bcryptjs.hashSync(password,10);
        const newUser = await User.create({
            username,
            email,
            password : hashPassword
        })

        res.status(200).json({msg : "signup successful"});
    } catch (err) {
        console.log("signup failed : ",err);
    }
})

router.get('/test',(req,res)=>{
    res.json({msg : "dsfdsf"});
})

module.exports = router;