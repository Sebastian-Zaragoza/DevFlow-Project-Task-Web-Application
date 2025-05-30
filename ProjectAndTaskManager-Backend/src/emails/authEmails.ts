import {transporter} from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmails {
    static sendConfirmationEmail = async (user: IEmail) =>{
        const info = await transporter.sendMail({
            from: 'AdministerTasks <devflow.com>',
            to: user.email,
            subject: 'AdministerTasks - Confirm your account',
            text: 'AdministerTasks - Confirm your account',
            html: `<p>Hello: ${user.name}, you have created your account in AdministerTasks. You just need to confirm it</p>
                <p>Visit the next link: </p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm your account</a>
                <p>Enter the code: <b>${user.token}</b></p>
                <p>This token expires in 10 minutes</p>
            `
        })
        console.log('Message sent', info)
    }

    static sendPasswordResetToken = async (user: IEmail) =>{
        const info = await transporter.sendMail({
            from: 'AdministerTasks <devflow.com>',
            to: user.email,
            subject: 'AdministerTasks - Reset your password',
            text: 'AdministerTasks -  Reset your password',
            html: `<p>Hello: ${user.name}, you have request reset your password</p>
                <p>Visit the next link: </p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset your password</a>
                <p>Enter the code: <b>${user.token}</b></p>
                <p>This token expires in 10 minutes</p>
            `
        })
        console.log('Message sent', info)
    }
}