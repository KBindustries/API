import WeeklyTimetable from '../models/weeklyTimetable.model.js';
import moment from 'moment-timezone';


export const OngoingCourse = async(req, res) => {
    console.log("one");
    try {
        // Find all WeeklyTimetable entries that have the current WAT date
        const currentWAT = moment().tz('Africa/Douala').format('M/D/YYYY');
    
        const ongoingCourses = await WeeklyTimetable.aggregate([
          {
            $unwind: '$timetable', // Deconstruct the 'timetable' array
          },
          {
            $match: {
              'timetable.date': currentWAT,
              'timetable.status': 'Ongoing'
            },
          },
          {
            $project: {
              _id: 0, // Exclude the '_id' field from the result
              weekStartDate: 1,
              specialty: 1,
              'timetable.course': 1,
              'timetable.teacher': 1,
              'timetable.date': 1,
              'timetable.day': 1,
              'timetable.startTime': 1,
              'timetable.stopTime': 1,
              'timetable.status': 1,
              createdAt: 1,
              updatedAt: 1,
            },
          }
        ]);
    
  console.log("ongoing",ongoingCourses)
      res.json(ongoingCourses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error', error });
    }
  }
  
  