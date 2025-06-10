import { Router } from "express";
import { Jobs } from "../model/jobs.js";

const jobRoute= Router()

jobRoute.post('/jobs',async (req, res)=>{
    await Jobs.create(req.body)
    res.send("job created")
})

jobRoute.get('/jobs', async(req,res)=>{
    const job = await Jobs.find(req.body)
    res.send(job)
})

export default jobRoute