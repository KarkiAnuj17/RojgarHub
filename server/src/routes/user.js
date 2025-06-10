import { Router} from 'express'
import { User } from '../model/user.js'
const userRoute = Router()

userRoute.post('/students',async(req,res)=>{
User.create(req.body)
res.send("student created")
})

userRoute.get('/students',async(req,res)=>{
  const users = await User.find(req.body)
  res.send(users)
})

userRoute.delete('/students/:id',async(req,res)=>{
  await User.findByIdAndDelete(req.params.id)
  res.send("deleted sucessfully ")
})

userRoute.put('/students/:id',async(req,res)=>{
  await User.findByIdAndUpdate(req.params.id,req.body)
  res.send("updated sucessufully")
})

export default userRoute