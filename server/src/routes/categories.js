import { Router } from "express";
import { Category } from "../model/categories.js";
const categoriesRoute= Router()

categoriesRoute.post('/categories',async(req,res)=>{
    const categories = await Category.create({ isActive:true ,...req.body})
    res.send({message:"Categories added sucessfully",categories})
})

categoriesRoute.get('/categories/', async (req, res) => {
    const categories = await Category.find()
    res.send(categories);
  })

export default categoriesRoute