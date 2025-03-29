import express from "express"
import { register, login, getAllUsers , getSingleUser} from "../controllers/authController.js"
import { deleteUser } from "../controllers/userController.js"
const router = express.Router()

router.post("/users/register", register)

router.post("/users/login", login)

router.get('/users',getAllUsers) 

router.get('/users/:id',getSingleUser) 

router.delete('/users/:id',deleteUser) 

export default router