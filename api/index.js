const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const postRoutes = require('./routes/postRoute.js');
const commentRoutes = require('./routes/comment.route.js');
const contactRoutes = require('./routes/contact.route.js');
const cookie = require('cookie-parser');
const path = require('path');
dotenv.config();

// const __dirname = path.resolve();

const port = 3000;

const corsOptions = {
    origin: '*', // Your frontend origin
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
app.use('/api/comment',commentRoutes);
app.use('/api/contact',contactRoutes);
app.listen(port, () => {
    console.log('app is running on port ', port);
})

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });

app.use((err, req, res, next) => {
    const statuscode = err.status || 500;
    const msg = err.message || "internal server error";
    return res.status(statuscode).json({
        success: false,
        statuscode: statuscode,
        message: msg,
    });
})