import express from 'express'
import cors from 'cors'
import { dbConnect } from './db/connect.js'
import userRoute from './routes/user.js'
import jobRoute from './routes/jobs.js'

const app = express()
const port = 8000
dbConnect()
app.use(cors())
app.use(express.json())

app.use(userRoute)
app.use(jobRoute)




app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
})