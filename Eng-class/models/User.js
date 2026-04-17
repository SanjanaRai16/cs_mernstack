import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendEmail = async(to, subject, html) => {
    await transporter.sendMail({
        from:process.env.USER_EMAIL,
        to,
        subject,
        html
    })
    console.log("message sent")
}

export default sendEmail;