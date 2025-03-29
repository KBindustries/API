import express from "express"
import {createStudent, getAllStudents, getStudent,getStudentByQrcode, updateStudent,getStudentsBySpecialty, deleteStudent} from "../controllers/student.controller.js"
import { verifyAdmin, verifyDelegate, verifySecurity } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/',  createStudent)  //verify admin
router.get('/',getAllStudents)    //
router.get('/:id',getStudent)
router.get('/:qrcode',getStudentByQrcode)
router.put("/:id", updateStudent)
router.post("/specialty", getStudentsBySpecialty)   //verify Admin, verifyDelegate,
router.delete("/:id", deleteStudent)

export default router