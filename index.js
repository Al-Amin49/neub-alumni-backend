import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { authRoutes } from './routes/user.routes.js'
import { alumniRoutes } from './routes/alumniDirectory.route.js'
import { newsfeedRoutes } from './routes/newsfeedpost.route.js'
import { announcementRoute } from './routes/announcement.route.js'
import { libraryResouceRoute } from './routes/libraryresource.route.js'
import { chatRoutes } from './routes/chat.route.js'
import { messageRoutes } from './routes/message.routes.js'

const app = express()
dotenv.config()

const port = process.env.PORT || 4000;

//config database
connectDB()

//middlewares
app.use(cors())
app.use(express.json())

// application routes
//user routes
app.use('/api/v1/users', authRoutes)
//alumni routes
app.use('/api/v1/alumni', alumniRoutes)
//newsfeed routes
app.use('/api/v1/newsfeed', newsfeedRoutes)
//announcements routes
app.use('/api/v1/announcements', announcementRoute)
//library routes
app.use('/api/v1/resources', libraryResouceRoute)
//chat routes
app.use('/api/v1/chats', chatRoutes)
//message routes
app.use('/api/v1/message',messageRoutes)



//health route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Alumni listening on port  ${port}`)
})