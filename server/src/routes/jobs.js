import { Router } from "express";
import { Jobs } from "../model/jobs.js";

const jobRoute= Router()

jobRoute.post('/jobs/:id',async (req, res)=>{
    const job = await Jobs.create({postedBy:req.params.id,...req.body})
    res.send({message:"Job Posted",job})
})

jobRoute.get('/jobs', async(req,res)=>{
    const job = await Jobs.find(req.body).populate('postedBy').populate('company')
    res.send(job)
})
jobRoute.get('/jobs/:JobId', async(req,res)=>{
    const job = await Jobs.findById(req.params.JobId).populate('postedBy').populate('company')
    res.send(job)
})

export default jobRoute