import { Router } from "express";
import { Application } from "../model/application.js";
const applicationRoute= Router()

applicationRoute.post('/applications',async(req,res)=>{
    const application = await Application.create({ isApplied:true ,...req.body})
    res.send({message:"Applied Sucessfully",application})
})

applicationRoute.get('/applications/:jobId', async (req, res) => {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('jobSeekerId');
    res.send(applications);
  })

export default applicationRoute