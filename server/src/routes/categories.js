import { Router } from "express";
import { Category } from "../model/categories.js";
import multer from "multer"
const categoriesRoute= Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

categoriesRoute.post('/categories',upload.single('categoryImage'),async(req,res)=>{
      req.body.image  = req.file?.filename;
    const categories = await Category.create({ isActive:true ,...req.body})
    res.send({message:"Categories added sucessfully",categories})
})

categoriesRoute.get('/categories/', async (req, res) => {
    const categories = await Category.find()
    res.send(categories);
  })

export default categoriesRoute