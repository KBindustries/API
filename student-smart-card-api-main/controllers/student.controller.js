import Student from "../models/student.model.js"
import Specialty from '../models/specialty.model.js'
import Course from '../models/course.model.js'
import mongoose from 'mongoose'
import QrCode from 'qrcode'




async function generateQrCode(newStudent) {
    const qrCodeUrl = await QrCode.toDataURL(JSON.stringify(newStudent));
    return qrCodeUrl;
}


//create student

// export const createStudent = async (req, res) =>{
//       const newStudent = new Student(req.body)
//   try {
//     const savedStudent = await newStudent.save();
//     // Update the department's and courses' students arrays
//     await Specialty.findByIdAndUpdate(savedStudent.specialty_id,
//          {$push: {students: savedStudent._id}
//         });
    
//      res.json({
//         success: true,
//         message: "Successfully Created",
//         data:savedStudent,
    
//     });
//   } catch (err) {
//     res.status(500).json({
//         success: false,
//         error: err.message});
//   }
// }



//get single student
// export const getStudent = async (req, res) => {
//     const {idOrName} = req.params
//     try {
//     // const student;
//     if(mongoose.Types.ObjectId.isValid(idOrName)){
//         const student = await Student.findById(idOrName).populate({
//             path: 'specialty_id',
//             select: 'name level total_fee  fee_check',
//             strictPopulate: false
//         }).populate({
//             path:"attendance",
//             strictPopulate:false
//         });
//     }else{
//         const student = await Student.findOne({name: idOrName}).populate({
//             path: 'specialty_id',
//             select: 'name level total_fee  fee_check',
//             strictPopulate: false
//         }).populate({
//             path:"attendance",
//             strictPopulate:false
//         });
//     }

  
//     } catch (error) {
//         res.status(404).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// //get single student
export const getStudent = async (req, res) => {
    const id = req.params.id

    try {
        const student = await Student.findById(id).populate({
            path: 'specialty_id',
            select: 'name level total_fee academic_year  fee_check',
            strictPopulate: false
        }).populate({
            path:"attendance",
            strictPopulate:false
        });;
        res.status(200).json({
            success: true,
            message: "Successfull",
            data: student
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

//get all students

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate({
            path: 'specialty_id',
            select: 'name level total_fee academic_year  fee_check',
            strictPopulate: false
        }).populate('attendance');
        res.status(200).json({
            success: true,
            message: "succesful",
            data: students
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get student info bu qrcode

export const getStudentByQrcode = async (req, res) => {
    const qrcode = req.params.qrcode

    try {
        const student = await student.findOne({ qrcode }).populate({
            path: 'specialty_id',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        });

        res.status(404).json({
            success: true,
            message: "successful",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get students by specialty and level
export const getStudentsBySpecialty = async (req, res) => {
    const specialty_id = req.body.specialty_id;
    // const level = req.body.level

    try {
        const filteredStudents = await Student.find({
            specialty_id: specialty_id,
            // level: level
        }).populate({
            path: 'specialty_id',
            select: 'name level total_fee academic_year  fee_check',
            strictPopulate: false
        }).populate({
            path:"attendance",
            strictPopulate:false
        });;
        res.status(200).json({
            success: true,
            message: "Successful",
            data: filteredStudents
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: " internal server error"
        })
    }

}



//update student
export const updateStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json({
            success: true,
            message: "Successfully deleted",
            data:updatedStudent
        });
       
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//delete student
export const deleteStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (deletedStudent) {
            // Update the department's courses array
            await Specialty.findByIdAndUpdate(deleteStudent.specialty_id, {$pull: {students: deleteStudent._id}});
            res.json({
              success: true,
              message: "Successfully deleted",
              data:deletedStudent
          });
          } else {
            res.status(404).json({error: 'Course not found'});
          }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}







export const createStudent = async (req, res) => {
    const newStudent = new Student(req.body)


    try {
        // save students without qr
        const saveStudent = await newStudent.save()
       
        // Update the department's and courses' students arrays
        await Specialty.findByIdAndUpdate(saveStudent.specialty_id,
            {$push: {students: saveStudent._id}
        });
        // Retrieve the specialty of the student and populate it
    const populatedStudent = await Student.findById(saveStudent._id).populate({
        path: 'specialty_id',
        select: 'name level total_fee academic_year  fee_check',
        strictPopulate: false
    });

        //generate qrcode
        const qrCodeUrl = await generateQrCode(populatedStudent)
       
        const id = saveStudent._id
        //update saved
        const updateCreated = await Student.findByIdAndUpdate(id, {
            qrcode: qrCodeUrl
        },
            { new: true })
        //save updated create in the savedStudent variable

        const registeredStudent = updateCreated

        res.status(200).json({
            success: true,
            message: " Student created successfully",
            // QrCode:`${qrCodeUrl}`,
            data: registeredStudent
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get single student