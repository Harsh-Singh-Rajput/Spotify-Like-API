import jwt from 'jsonwebtoken'
import {Tokens} from "../models/Models.js"
import getToken from './getBearerToken.js'

const generateAccessToken = (user) =>{
    let token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1440m'})
    return token
}

const invalidateAccessToken = (req) => {
    let token = getToken(req)
    Tokens.create({token:token})
}

export {generateAccessToken, invalidateAccessToken}