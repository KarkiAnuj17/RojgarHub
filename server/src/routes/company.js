import { Router } from "express";
import { Company } from "../model/company.js";
import sendMail from "../utilis/sendEmail.js";

const companyRoute = Router();

companyRoute.post('/company', async (req, res) => {
    const company =await Company.create(req.body);

    res.send({ message: "Registration Successful" ,isRegistered:true, company:company});
  } );

companyRoute.get('/company', async (req, res) => {
    const unApproved= await Company.find({ isApproved: false});
    const approved = await Company.find({ isApproved: true})
res.send({
      unapproved: unApproved,
      approved: approved
    })  } );

  companyRoute.patch('/company/:id', async (req, res) => {
    const company = await Company.findById(req.params.id).populate('createdBy')
    company.isApproved = true
    await sendMail(company.createdBy.email)
    await company.save()
    return res.send({message: "Company approved successfully", company})
  })

export default companyRoute;  