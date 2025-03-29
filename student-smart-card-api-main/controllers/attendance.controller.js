import Attendance from '../models/attendance.model.js'
import Student from '../models/student.model.js'
import Course from '../models/course.model.js'

//create Attendance
export const createAttendance = async (req, res) =>{
    const newAttendance  = new Attendance(req.body);
    try {
        
        
        const savedAttendance = await newAttendance.save();
         // Update the specialty's courses array
         await Student.findByIdAndUpdate(newAttendance.student_id, {$push: {attendance: newAttendance._id}});
         await Course.findByIdAndUpdate(newAttendance.course_id, {$push: {attendance: newAttendance._id}});
        res.status(200).json({
            success: true,
            message:"Successfuly created",
            data: savedAttendance
        });
      } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: err.message });
      }
}


//get all attendances

export const getAllAttendances = async(req, res) =>{
    try {
        // Find all attendances from the database
        const attendances = await Attendance.find()
          .populate("course_id")
          .populate({
            path: "student_id",
            strictPopulate: false
          });
        // Send the response with status 200 and the attendances array
        res.status(200).json({
            success: true,
             data:attendances});
      } catch (err) {
        // Handle any errors
        res.status(500).json({ 
            success: false,
            message: err.message });
      }
}


//get single attendance

export const getSingleAttendance = async(req, res) =>{
    // Get the id parameter from the request
    const id = req.params.id;

    try {        
        // Find the attendance with the given id from the database
        const attendance = await Attendance.findById(id)
          .populate("course_id")
          .populate({
            path: "student_id",
            strictPopulate: false
          });
        // If the attendance is not found, send a 404 response
        if (!attendance) {
          return res.status(404).json({ message: "Attendance not found" });
        }
        // Send the response with status 200 and the attendance object
        res.status(200).json({
            success: true,
            message: "Found",
            data: attendance});
      } catch (err) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: err.message });
      }
}


//get attendance by student_id

export const getAttendanceByStudent = async(req, res) =>{
    const student_id = req.params.student_id;
    try{
    const attendance = await Attendance.find({
        student_id
    });

    res.status(200).json({
        success: true,
        data: attendance
    })
}catch(error){
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}


//get attendance by course_id

export const getAttendanceByCourse = async(req,res) =>{
    const course_id = req.params.course_id;
    try{
        const courseAttendance = await Attendance.find({
            course_id
        }).populate({ path: 'course_id',
        select: 'name ',
        strictPopulate: false
        }).populate({ path: 'student_id',
        select: 'name ',
        strictPopulate: false});
        res.status(200).json({
            success: true,
            data: courseAttendance
        })
    }catch(error){

    res.status(500).json({
        success: false,
        message: error.message
    })
}

}

//update attendance

export const updateAttendance = async(req, res) =>{
    try {
        // Get the id parameter from the request
        const id = req.params.id;
        // Get the date, course_id, student_id and status from the request body
        const { date, course_id, student_id, status } = req.body;
        // Validate the input data
        if (!date || !course_id || !student_id || !status) {
          return res.status(400).json({ message: "Invalid input data" });
        }

        const updatedAttendance = await Attendance.findByIdAndUpdate(
            id,
            { date, course_id, student_id, status },
            {new: true}
        ).populate("course_id")
        .populate("student_id");
        res.status(200).json({
            success: true,
            message: "Successfully uodated",
            data: updatedAttendance
        });
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//delete attendance

export const deleteAttendance = async ( req, res) =>{
    const id = req.params.id;
    try{
        const deletedAttendance= await Attendance.findByIdAndDelete(id);
        if (deletedAttendance) {
            // Update the department's courses array
            await Course.findByIdAndUpdate(deletedAttendance.specialty, {$pull: {attendance: deletedAttendance._id}});
            await Student.findByIdAndUpdate(deletedAttendance.specialty, {$pull: {attendance: deletedAttendance._id}});
            res.status(200).json({
                success: true,
                message: "Successfully uodated",
                data: deletedAttendance
            });
          } else {
            res.status(404).json({error: 'Attendance not found'});
          }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}