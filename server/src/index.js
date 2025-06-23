import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { dbConnect } from './db/connect.js'
import userRoute from './routes/user.js'
import jobRoute from './routes/jobs.js'
import companyRoute from './routes/company.js'

const app = express()
const port = process.env.PORT
dbConnect()
app.use(cors())
app.use(express.json())

app.use(userRoute)
app.use(jobRoute)
app.use(companyRoute)



app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
})