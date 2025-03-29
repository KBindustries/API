import express from "express"
import { createAnnouncement, getAllAnnouncements, getSingleAnnouncement, updateAnnouncement, deleteAnnouncement } from "../controllers/announcement.controller.js"


const router = express.Router()

router.post('/',  createAnnouncement)
router.get('/',getAllAnnouncements)
router.get('/:id',getSingleAnnouncement)

router.put("/:id", updateAnnouncement)
router.delete("/:id", deleteAnnouncement)

export default router