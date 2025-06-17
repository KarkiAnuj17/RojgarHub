import { Router} from 'express'
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { User } from '../model/user.js'
import jwt from 'jsonwebtoken'
const userRoute = Router()

userRoute.post('/register',async(req,res)=>{
const user = await User.findOne({email:req.body.email})
if(user) res.send({message:"Email Already Exist"})
else 
req.body.password = await bcrypt.hash(req.body.password , saltRounds)
User.create(req.body)
return res.send({message:"User created"})
})

userRoute.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user) res.send({message:"Email doesnot Exist"})
    const isMatched = await bcrypt.compare(req.body.password,user.password)
    if(!isMatched) res.send({message:"Password doesnot Match"})
        const token = await jwt.sign({ email: req.body.email}, 'f351bde270198284e160885955749ff1541e81ac341e97f85dced21e0749204b488186e280067b14d7d0b331124490d93205c4dba2222a4b1838f77048f8a69aee3c00407cf8dee3ba170a55193ba9749c36b13fcbc9d69aa2214c501cce174fb7b204c1e48476f2a08d61f822e38f804d65c1abf9472936ddc8646f5551ce95');
    return res.send({ token, user:user, isLoggedIn:true,
        message:"Login Successful! Welcome to RojgarHub."
    });
    
})

export default userRoute