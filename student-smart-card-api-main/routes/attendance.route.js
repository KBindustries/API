import express from "express"
import { createAttendance, getAllAttendances, getSingleAttendance,getAttendanceByStudent,getAttendanceByCourse, updateAttendance, deleteAttendance } from "../controllers/attendance.controller.js"


const router = express.Router()

router.post('/',  createAttendance)
router.get('/',getAllAttendances)
router.get('/:id',getSingleAttendance)
//by student
router.get("/student/:student_id", getAttendanceByStudent)

//by course
router.get("/course/:course_id", getAttendanceByCourse)


router.put("/:id", updateAttendance)
router.delete("/:id", deleteAttendance)

export default router