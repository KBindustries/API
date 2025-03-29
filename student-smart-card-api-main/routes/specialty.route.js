import express from "express"
import {createSpecialty, getAllSpecialties, getSpecialty, updateSpecialty,toggleFeeCheck, deleteSpecialty} from "../controllers/specialty.controller.js"


const router = express.Router()

router.post('/',  createSpecialty)
router.get('/',getAllSpecialties)
router.get('/:id',getSpecialty)
router.put("/:id", updateSpecialty)
router.patch("/toggle/:id", toggleFeeCheck)
router.delete("/:id", deleteSpecialty)

export default router