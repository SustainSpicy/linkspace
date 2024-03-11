import express from "express";

import {
  createProfileLinks,
  deleteProfileLink,
  getProfileByEmail,
  getProfileByUsername,
  updateProfileLinks,
  updateProfileUserName,
} from "../controllers/profileController.js";

const router = express.Router();

// Get a specific profile by email
router.get("/:email", getProfileByEmail);

//username routes
router.get("/username/:username", getProfileByUsername);
router.put("/username/:email", updateProfileUserName);

router.put("/links/:email", createProfileLinks);

router.put("/updatelink/:email", updateProfileLinks);

router.delete("/links/:linkId", deleteProfileLink);
export default router;
