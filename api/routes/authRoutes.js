import express from "express";
import dotenv from "dotenv";
import { googleAuth, signin, signup } from "../controllers/authController.js";

dotenv.config();
const router = express.Router();

router.post("/google", googleAuth);

router.post("/signup", signup);

router.post("/signin", signin);

export default router;
