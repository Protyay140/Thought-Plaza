const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const postRoutes = require('./routes/postRoute.js');
const cookie = require('cookie-parser');
dotenv.config();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookie());
// connect to mongodb database .....
mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log('mongodb connected successfully ...')
}).catch(() => {
    console.log('mongodb connection failed ...')
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post',postRoutes);

app.listen(port, () => {
    console.log('app is running on port ', port);
})

app.use((err, req, res, next) => {
    const statuscode = err.status || 500;
    const msg = err.message || "internal server error";
    return res.status(statuscode).json({
        success: false,
        statuscode: statuscode,
        message: msg,
    });
})