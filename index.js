import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { authRoutes } from './routes/user.routes.js'

const app = express()
dotenv.config()

const port = process.env.PORT || 4000;

//config database
connectDB()

//middlewares
app.use(cors())
app.use(express.json())

// application routes
app.use('/api/v1/users', authRoutes)


//health route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Alumni listening on port  ${port}`)
})