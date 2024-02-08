import express from "express";

import {
  getProfileByEmail,
  updateProfileLinks,
  updateProfileUser,
} from "../controllers/profileController.js";

const router = express.Router();

// Get a specific profile by email
router.get("/:email", getProfileByEmail);

router.put("/:id/user", updateProfileUser);
router.put("/:id/links", updateProfileLinks);

export default router;
