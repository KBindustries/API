import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
    date:  {
        type: Date,
        default: Date.now
      },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Course'},
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Student'},
    status: { 
        type: Boolean, 
        default: false }  // present or absent
},
{timestamps: true}
)

export default mongoose.model('Attendance', AttendanceSchema)  