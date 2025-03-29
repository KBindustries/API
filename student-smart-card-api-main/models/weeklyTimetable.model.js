import mongoose from 'mongoose';

const weeklyTimetableSchema = new mongoose.Schema(
  {
    weekStartDate: {
      type: String,
      required: true,
    },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
          ref: 'Specialty',
          required: true,
    },
    timetable: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Teacher',
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        day: {
          type: String,
        },
        startTime: {
          type: String,
          required: true,
        },
        stopTime: {
          type: String,
          required: true,
        },
        status:{
          type:String,
          default:"Planned"
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('WeeklyTimetable', weeklyTimetableSchema);
