import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/userController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getdata', adminMiddleware, getUser);

export default router;