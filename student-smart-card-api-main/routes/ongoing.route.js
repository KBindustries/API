import express from "express"


const router = express.Router()
import { OngoingCourse } from "../controllers/ongoing.controller.js";


router.get('/',OngoingCourse)

export default router