import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './routes/authRoutes.js'
import specialtyRoute from './routes/specialty.route.js'
import courseRoute from './routes/course.route.js'
import attendanceRoute from './routes/attendance.route.js'
import studentRoute from './routes/student.route.js'
import teacherRoute from './routes/teacher.route.js'
import timeTableRoute from './routes/weeklyTimetable.route.js'
import ongoingRoute from './routes/ongoing.route.js'
import AnnouncementRoute from './routes/anouncement.route.js'
import FeedbackRoute from './routes/feedback.route.js'
import IncidentRoute from './routes/incidentReport.route.js'
import documentRoute from './routes/document.route.js'
import cardRoute from './routes/smartcard.route.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
    Credentials: true
}

// database connection
mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDb database connected')
    } catch (error) {
        console.log(`Failed to connect to MongoDb ${error}`)
    }
}

// for testing
app.get("/", (req,res)=>{
    res.send("api working")
} )

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// routes
app.use('/auth', authRoute)
app.use('/specialties', specialtyRoute)
app.use('/courses', courseRoute)
app.use('/attendances', attendanceRoute)
app.use('/announcements', AnnouncementRoute)
app.use('/feedbacks', FeedbackRoute)
app.use('/incidents', IncidentRoute)
app.use('/students', studentRoute)
app.use('/teachers', teacherRoute)
app.use('/timeTables', timeTableRoute)
app.use('/ongoing', ongoingRoute)
app.use('/documents', documentRoute)
app.use('/cards', cardRoute)

app.listen(port, () =>{
    connect()
    console.log(`server listening on port ${port}`)
})