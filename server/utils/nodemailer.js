// Libs
import NodeMailer from 'nodemailer'
import dotenv from 'dotenv'

// Config
dotenv.config()

const transporter = NodeMailer.createTransport({
    host: "nems.o2switch.net",
    port: 465,
    secure: true,
    auth: {
        user: "damien@vdpv1530.odns.fr",
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
        from: `Paresport <damien@vdpv1530.odns.fr>`,
        to: receiver,
        subject: "Mail validation",
        text: `Please click on the following link to validate your email address: http://localhost:3000/validate?token=${token}`,
        html: `<p>Please click on the following link to validate your email address: <a href="http://localhost:3000/validate?token=${token}">http://localhost:3000/validate?token=${token}</a></p>`
    })

    return mail
}