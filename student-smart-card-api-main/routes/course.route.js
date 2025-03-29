import express from "express"
import {createCourse, getAllCourses, getSingleCourse, updateCourse, deleteCourse, createWeeklyTimetable } from "../controllers/course.controller.js"


const router = express.Router()

router.post('/',  createCourse)
router.get('/',getAllCourses)
router.get('/:id',getSingleCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)
router.post('/weekly-timetable',  createWeeklyTimetable)


export default router