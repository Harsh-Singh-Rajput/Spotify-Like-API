import jwt from "jsonwebtoken";
import {Tokens} from "../models/Models.js"
import getToken from "../utils/getBearerToken.js";
const authenticateToken = async (req, res, next) => {
    let token = getToken(req)
    let invalidToken
    if (!token ) return res.status(401).send("Signup/Sign in to use the service");
    
    const checkInvalidToken = await Tokens.findOne({
        where:{
            token
        }
    })
    console.log(checkInvalidToken);
    if(checkInvalidToken){
        invalidToken = checkInvalidToken.dataValues.token
        console.log("invalid", invalidToken);
    }

    if(token === invalidToken) return res.status(401).send("Invalid token, Sign in again to use the service")

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("invalid token");
        req.user = user;
        next();
    });
};


export { authenticateToken };
