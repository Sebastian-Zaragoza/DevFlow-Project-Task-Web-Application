import {Request, Response} from "express"
import User from "../models/user";
import {checkPassword, hashPassword} from "../utils/auth"
import Token from "../models/token";
import {generateToken} from "../utils/token"
import {AuthEmails} from "../emails/authEmails";
import {generateJWT} from "../utils/jwt";

export class AuthController {
    static createAccount = async(req: Request, res: Response) => {
        const {email} = req.body
        const userExists = await User.findOne({email})
        if(userExists){
            const error = new Error("El usuario ya existe")
            res.status(409).json({error: error.message})
        }
        const user = new User(req.body)
        user.password = await hashPassword(req.body.password)

        const token = new Token()
        token.token = generateToken()
        token.user = user.id

        AuthEmails.sendConfirmationEmail({
            email: user.email,
            name: user.name,
            token: token.token
        })

        await Promise.allSettled([user.save(), token.save()])
        res.send('User created successfully, please check the email to confirm the account')
    }
    static confirmAccount = async(req: Request, res: Response) => {
        try{
            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error("Token invalid")
                res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('User confirmed successfully')
        }
        catch(error){
            res.status(500).json({error: 'Error occurred'})
        }
    }
    static login = async(req: Request, res: Response) => {
        try{
            const{email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error("User does not exist")
                res.status(404).json({error: error.message})
            }
            if(!user.confirmed){
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()
                AuthEmails.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })
                const error = new Error("Account have not been confirmed. We have sent other e-mail to confirm your account")
                res.status(401).json({error: error.message})
            }

            const isPasswordValid = await checkPassword(password, user.password)
            if(!isPasswordValid){
                const error = new Error("Password does not match")
                res.status(401).json({error: error.message})
            }
            const token = generateJWT({id: user.id})
            res.send(token)
        }
        catch(error){
            res.status(500).json({error: 'Error occurred'})
        }
    }

    static requestConfirmAccount = async(req: Request, res: Response) => {
        try{
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error("User does not exist")
                res.status(404).json({error: error.message})
            }

            if(user.confirmed){
                const error = new Error("User has been confirmed")
                res.status(403).json({error: error.message})
            }

            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            AuthEmails.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])
            res.send('New token has been sent to your e-mail')
        }catch(error){
            res.status(404).json({error: error.message})
        }
    }

    static forgotPassword = async(req: Request, res: Response) => {
        try{
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user){
                const error = new Error("User does not exist")
                res.status(404).json({error: error.message})
            }

            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

            AuthEmails.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            })
            res.send('Check your e-mail to reset your password')
        }catch(error){
            res.status(404).json({error: "error.message"})
        }
    }
    static validateToken = async(req: Request, res: Response) => {
        try{
            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error("Token invalid")
                res.status(404).json({error: error.message})
            }
            res.send('Token validated, reset your password')
        }
        catch(error){
            res.status(500).json({error: 'Error occurred'})
        }
    }
    static updatePassword = async(req: Request, res: Response) => {
        try{
            const {token} = req.params
            const tokenExists = await Token.findOne({token})
            if(!tokenExists){
                const error = new Error("Token invalid")
                res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExists.user)
            user.password = await hashPassword(req.body.password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('Password modified successfully')
        }
        catch(error){
            res.status(500).json({error: 'Error occurred'})
        }
    }
    static user = async(req: Request, res: Response) => {
        res.json(req.user)
    }
}
