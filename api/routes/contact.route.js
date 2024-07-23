const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/sendMail', async (req, res, next) => {
    try {
        const { email, subject, message } = req.body;
        console.log(email, subject, message);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: email,
            to: process.env.MAIL_USER,
            subject: subject,
            html: `<h3>email from : ${email} -------
                    message : ${message}</h3>`
        }

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });

        return res.status(200).json({ success: true, message: 'email send successfully' });
    } catch (err) {
        next(err);
    }
})

module.exports = router;