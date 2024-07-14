const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token = req.cookies.auth_token;
    // console.log('request cookie : ',req.cookies);
    if(!token){
        // console.log("token : ",token);
        return res.status(401).json({success:false,message : "unAutherized"});
    }else{
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(401).json({success:false,message : "unAutherized"});
            }

            req.user = user;
            next();
        })
    }
}
module.exports = verifyUser;