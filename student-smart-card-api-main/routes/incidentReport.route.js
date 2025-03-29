import express from "express"
import { createIncident, getAllIncident, getSingleIncident,markRead, updateIncident, deleteIncident } from "../controllers/incidentReport.controller.js"


const router = express.Router()

router.post('/',  createIncident)
router.get('/',getAllIncident)
router.get('/:id',getSingleIncident)

router.put("/read/:id", markRead)
router.put("/:id", updateIncident)
router.delete("/:id", deleteIncident)

export default router