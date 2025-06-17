import { Router } from "express";
import { Jobs } from "../model/jobs.js";

const jobRoute= Router()

jobRoute.post('/jobs',async (req, res)=>{
    await Jobs.create(req.body)
    res.send({message:"Job Posted"})
})

jobRoute.get('/jobs', async(req,res)=>{
    const job = await Jobs.find(req.body)
    res.send(job)
})
jobRoute.get('/jobs/:JobId', async(req,res)=>{
    const job = await Jobs.findById(req.params.JobId)
    res.send(job)
})

export default jobRoute