const nodemailer = require('nodemailer');

exports.sendEmail = async (emailData) => {
    try {
        const transpoter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD

            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'Inventory Management <mdrafat248@gmail.com>',
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html
        };

        return await transpoter.sendMail(mailOptions);

    } catch (error) {
        return { success: false, message: 'Something went wrong' }
    }
};