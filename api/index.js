const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

dotenv.config();
const port = 3000;

// connect to mongodb database .....
mongoose.connect(
    process.env.MONGO
).then(()=>{
    console.log('mongodb connected successfully ...')
}).catch(()=>{
    console.log('mongodb connection failed ...')
});

app.listen(port,()=>{
    console.log('app is running on port ',port);
})