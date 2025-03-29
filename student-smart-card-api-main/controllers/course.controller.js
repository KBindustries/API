import Course from '../models/course.model.js'
import Specialty from '../models/specialty.model.js'
import WeeklyTimetable from '../models/weeklyTimetable.model.js'

// create course 
export const createCourse =async (req , res)=> {
    const newCourse = new Course(req.body)
    try {
        const savedCourse = await newCourse.save();
        // Update the specialty's courses array
        await Specialty.findByIdAndUpdate(newCourse.specialty_id, {$push: {courses: newCourse._id}});
        res.status(200).json({
            success:true,
            message:"Course created successfully",
            data: savedCourse
        });
      } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
      }
}



//get courses
export const  getAllCourses = async (req, res)=>{
    try {
        const courses = await Course.find().populate({
            path: 'specialty_id',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        }).populate("attendance");
        res.json({
            succes:true,
            data:courses,
            message:"Successfully"
        });
      } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message});
      }
}



//get single courses

export const getSingleCourse = async(req, res) => {

    const id= req.params.id;
    try {
        const course = await Course.findById(id).populate({
            path: 'specialty_id',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        }).populate("attendance");
        res.status(200).json({
            success: true,
            message:" Found",
            data: course
        });
      } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
      }
}


//update course

export const updateCourse = async(req, res) =>{
    const id = req.params.id;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
            ).populate({
              path: 'specialty_id',
              select: 'name level total_fee  fee_check',
              strictPopulate: false
          }).populate("attendance");
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedCourse
        });
      } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
      }
}



//delete course

export const deleteCourse = async(req, res) =>{
    const id = req.params.id;
    try{
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (deletedCourse) {
          // Update the department's courses array
          await Specialty.findByIdAndUpdate(deletedCourse.specialty_id, {$pull: {courses: deletedCourse._id}});
          res.json({
            success: true,
            message: "Successfully deleted",
            data:deletedCourse
        });
        } else {
          res.status(404).json({error: 'Course not found'});
        }
      } catch (err) {
        res.status(500).json({error: err.message});
      }
}


// Controller function to create the weekly timetable for a course
export const createWeeklyTimetable = async (req, res) =>{

  const { course, teacher, weekStartDate, timetable } = req.body;

  try {
    // Check if the course exists
    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create a new weekly timetable
    const weeklyTimetable = new WeeklyTimetable({
      course,
      teacher,
      weekStartDate,
      timetable,
    });

    // Save the weekly timetable
    const savedWeeklyTimetable = await weeklyTimetable.save();

    // Update the course with the weekly timetable reference
    existingCourse.weeklyTimetable.push(savedWeeklyTimetable._id);
    await existingCourse.save();

    res.status(201).json(savedWeeklyTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
