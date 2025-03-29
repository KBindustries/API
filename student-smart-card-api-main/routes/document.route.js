import express from "express"
import {createDocument, getAllDocuments, getDocument, updateDocument, deleteDocument} from "../controllers/document.controller.js"


const router = express.Router()

router.post('/',  createDocument)
router.get('/',getAllDocuments)
router.get('/:id',getDocument)
router.put("/:id", updateDocument)
router.delete("/:id", deleteDocument)

export default router