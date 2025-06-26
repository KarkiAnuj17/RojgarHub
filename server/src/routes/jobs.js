import { Router } from "express";
import { Jobs } from "../model/jobs.js";

const jobRoute= Router()

jobRoute.post('/jobs',async (req, res)=>{
    const job = await Jobs.create(req.body)
    res.send({message:"Job Posted",job})
})

jobRoute.get('/jobs', async(req,res)=>{
    let job
    if (req.query.postedBy)
    {
        job = await Jobs.find({postedBy:req.query.postedBy}).populate('postedBy').populate('company')
    }
    else
    {
        job = await Jobs.find().populate('company')
    }
        res.send(job)

})
jobRoute.get('/jobs/:JobId', async(req,res)=>{
    const job = await Jobs.findById(req.params.JobId).populate('postedBy').populate('company')
    res.send(job)
})

jobRoute.put('/jobs/:JobId',async(req,res)=>{
    const updatejob = await Jobs.findByIdAndUpdate(req.params.JobId , req.body).populate('createdBy')
    res.send(updatejob)
})

jobRoute.delete('/jobs/:JobId',async(req,res)=>{
    const deleteJobs = await Jobs.findByIdAndDelete(req.params.JobId)
    res.send(deleteJobs)
})



export default jobRoute