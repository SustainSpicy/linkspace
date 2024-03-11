import express from "express";
import dotenv from "dotenv";
import {
  googleAuth,
  requestEmailVerification,
  signin,
  signup,
  verifyEmail,
} from "../controllers/authController.js";
import { athenticateToken } from "../utils/jwt.js";
import { limitRequest } from "../utils/index.js";

dotenv.config();
const router = express.Router();

router.post("/google", googleAuth);

router.post("/signup", signup);

router.post("/signin", signin);

router.get(
  "/send-verification-email",
  athenticateToken,
  limitRequest,
  requestEmailVerification
);
router.get("/verify-email/:token", athenticateToken, verifyEmail);
export default router;
