
const express = require('express');
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message : "server is running fine ..."});
});

module.exports = router;