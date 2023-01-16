import express from "express";
import {validateName, validateEmail, validatePassword} from '../utils/validator.js';
import {generateAccessToken, invalidateAccessToken} from '../utils/token.js';
import bcrypt from 'bcrypt';
import {User} from "../models/Models.js";
const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
      where:{
        email
      }
    }) 
    if (userExists) {
      return res.status(403).send("User Exists");
    }
    if(!validateName(name)){
      return res.status(403).send('Invalid name: Error: Invalid user name: name must be longer than four characters and must include any numbers')
      }
    if(!validateEmail(email)){
      return res.status(403).send('Invalid email')
    }
    if(!validatePassword(password)){
      return res.status(403).send('Invalid password: Password must be at least 8 characters long and must include atlest one - one uppercase letter, one lowercase letter, one digit, one special character')
    }

    const hashPassowrd = await bcrypt.hash(password, 10)
    const saveToDB = {
      name, email, password:hashPassowrd
    }
    const createdUser = await User.create(saveToDB);
    console.log(createdUser);
    res.status(201).send({message:`Success, ${name} your account is created`, });
  } catch (error) {
    console.log(error);
  }

  
});

router.post("/signin", async (req, res) => {
  try {
    const {email, password} = req.body;
    if(! email || ! password){
      return res.status(500).send({error:"email or password missing"})
    }
    const userExists = await User.findOne({
      where:{
        email
      }
    }) 
    if(!userExists){
      return res.send("User doesn't exists");
    }
    console.log(userExists.dataValues);
    const getPassword = userExists.dataValues.password;
    const passMatch = await bcrypt.compare(password, getPassword);
    // console.log(passMatch);
    if(!passMatch){
      return res.send('Password mismatch');
      
    }
    const user = {
      id:userExists.dataValues.id,
      name:userExists.dataValues.name,
      email:userExists.dataValues.email,

    }
    
    const accessToken = generateAccessToken(user)
    return res.status(200).send({message:"success", accessToken:accessToken});

  } catch (error) {
    console.log(error);
  }
  
});

router.get('/logout', (req, res) =>{
  invalidateAccessToken(req)
  res.status(200).send({message:"logged out successfully"})
})

router.post("/forgot", (req, res) => {
  const email= req.body

})



export default router;
