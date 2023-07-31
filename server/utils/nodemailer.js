// Libs
import NodeMailer from 'nodemailer'
import dotenv from 'dotenv'

// Config
dotenv.config()

const transporter = NodeMailer.createTransport({
    host: "smtp-paresport.alwaysdata.net",
    port: 465,
    secure: true,
    auth: {
        user: "no-reply@paresport.com",
        pass: process.env.MAIL_PASSWORD
    }
})

export async function sendMail(sender, receiver, subject, text, html) {
    let mail = await transporter.sendMail({
        from: `${sender}`, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    })

    return mail
}

export async function sendMailValidation(token, receiver) {
    let mail = await transporter.sendMail({
        from: `Paresport <no-reply@paresport.com>`,
        to: receiver,
        subject: "Mail validation",
        text: `Please click on the following link to validate your email address: https://paresport.com/validate?token=${token}`,
        html: `<p>Please click on the following link to validate your email address: <a href="https://paresport.com/validate?token=${token}">https://paresport.com/validate?token=${token}</a></p>`
    })

    return mail
}