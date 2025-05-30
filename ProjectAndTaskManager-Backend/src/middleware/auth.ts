import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import User from "../models/user";
import {IUser} from "../models/user";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if(!bearer){
        const error = new Error('Not authorized')
        res.status(401).send(error.message)
    }
    const [, token] = bearer.split(' ')
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id name email')
            if(user){
                req.user = user
            }else{
                res.status(500).send({error: 'Token invalid'})
            }
        }

    }catch(error){
        res.status(500).send({error: 'Token invalid'})
    }
    next()
}