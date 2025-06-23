import { Router} from 'express'
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { User } from '../model/user.js'
import jwt from 'jsonwebtoken'
const userRoute = Router()

userRoute.post('/register',async(req,res)=>{
const user = await User.findOne({email:req.body.email})
if(user) res.send({message:"Email Already Exist"})
else {
req.body.password = await bcrypt.hash(req.body.password , saltRounds)
User.create(req.body)}
return res.send({message:"User created"})
})

userRoute.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user) res.send({message:"Email doesnot Exist"})
    const isMatched = await bcrypt.compare(req.body.password,user.password)
    if(!isMatched) res.send({message:"Password doesnot Match"})
        const token = await jwt.sign({ email: req.body.email}, process.env.JWT_SECRET);
    return res.send({ token, user:user, isLoggedIn:true,
        message:"Login Successful! Welcome to RojgarHub"
    });
    
})
export default userRoute