const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
dotenv.config();
const port = 3000;

app.use(cors());

app.use(express.json());

// connect to mongodb database .....
mongoose.connect(
    process.env.MONGO
).then(()=>{
    console.log('mongodb connected successfully ...')
}).catch(()=>{
    console.log('mongodb connection failed ...')
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log('app is running on port ',port);
})

app.use((err,req,res,next)=>{
    const statuscode = err.status || 500;
    const msg = err.message || "internal server error";
    return res.status(statuscode).json({error:{
        success : false,
        statuscode : statuscode,
        message:msg,
    },
    err});
})