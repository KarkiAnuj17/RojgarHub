import { Router } from "express";
import { Application } from "../model/application.js";
const applicationRoute= Router()

applicationRoute.post('/applications',async(req,res)=>{
    const data = await Application.create(req.body)
    res.send({message:"Applied Sucessfully",data})
})

export default applicationRoute