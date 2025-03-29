import express from "express"
import { createFeedback, getAllFeedbacks, getSingleFeedback, getFeedbackBySpecialty, markRead, updateFeedback, deleteFeedback } from "../controllers/feedback.controller.js"


const router = express.Router()

router.post('/',  createFeedback)
router.get('/', getAllFeedbacks)
router.get('/:id',getSingleFeedback)
router.get('/specialty/:specialtyId',getFeedbackBySpecialty)

router.put("/:id", updateFeedback)
router.put("/read/:id", markRead)
router.delete("/:id", deleteFeedback)

export default router