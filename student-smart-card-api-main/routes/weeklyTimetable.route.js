import express from "express"
import {createWeeklyTimetable,getAllWeeklyTimetables,getByWeekStart, getSpecialtyWeeklyTimetable, getTimetablyById,updateWeeklyTimetable,deleteWeeklyTimetable } from "../controllers/weeklyTimetable.controller.js"


const router = express.Router()

router.post('/', createWeeklyTimetable)
router.get('/',getAllWeeklyTimetables)
router.get('/:id',getTimetablyById)
router.get('/weeklyTimetable/:weekStartDate',getByWeekStart)
// router.get('/ongoing',OngoingCourse)
router.post('/weeklyTimetable',getSpecialtyWeeklyTimetable)
router.put("/:id", updateWeeklyTimetable)
router.delete("/:id", deleteWeeklyTimetable)


export default router