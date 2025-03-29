import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    specialty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Specialty',
        required: [true, 'must provide specialty id']
    },
    attendance: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attendance'
        }],
        weeklyTimetable:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WeeklyTimetable',
          }],
},
{timestamps: true}
)

export default mongoose.model('Course', CourseSchema)  