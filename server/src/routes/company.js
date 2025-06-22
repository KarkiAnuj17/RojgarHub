import { Router } from "express";
import { Company } from "../model/company.js";
import sendMail from "../utilis/sendEmail.js";

const companyRoute = Router();

companyRoute.get('/company', async (req, res) => {
    const unApproved= await Company.find({ isApproved: false});
    const approved = await Company.find({ isApproved: true})
res.send({
      unapproved: unApproved,
      approved: approved
    })  } );

companyRoute.post('/company/:id', async (req, res) => {
    const company =await Company.create({createdBy : req.params.id,isRegistered:true,...req.body});
    res.send({ message: "Registration Successful" ,company});
  } );

    companyRoute.get('/company/:id', async (req, res) => {
  const company = await Company.findOne({ createdBy: req.params.id });
  if (!company) return res.status(404).send({ isApproved: false, isRegistered: false, message: "Company not registered" });
  return res.send({ isApproved: company.isApproved, isRegistered: company.isRegistered, message: "Company registered" });
});

  companyRoute.patch('/company/:id', async (req, res) => {
    const company = await Company.findById(req.params.id).populate('createdBy')
    company.isApproved = true
    await sendMail(company.createdBy.email)
    await company.save()
    
    return res.send({message: "Company approved successfully", company})
  })

export default companyRoute;  