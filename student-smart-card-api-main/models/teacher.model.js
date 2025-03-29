import mongoose from 'mongoose'

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    email: {
        type: String,
        required: [true, 'must provide email']
    },
    avatar:{
        type: String
    },
    phone: {
        type: String,
        required: [true, 'must provide phone']
    },
    address: {
        type: String,
        required: [true, 'must provide address']
    },
    weeklyTimetable:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeeklyTimetable',
      }],
},
{timestamps: true}
)

export default mongoose.model('Teacher', TeacherSchema)  