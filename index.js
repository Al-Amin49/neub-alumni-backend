import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
const app = express()
dotenv.config()

const port = process.env.PORT || 4000;


//config database
connectDB()
//health route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Alumni listening on port  ${port}`)
})