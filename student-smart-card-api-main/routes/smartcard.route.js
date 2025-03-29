import express from "express"
import {createSmartcard, getAllSmartcards, getSmartcard, updateSmartcard, deleteSmartcard} from "../controllers/smartcard.controller.js"


const router = express.Router()

router.post('/',  createSmartcard)
router.get('/',getAllSmartcards)
router.get('/:id',getSmartcard)
router.put("/:id", updateSmartcard)
router.delete("/:id", deleteSmartcard)

export default router