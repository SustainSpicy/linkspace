import express from "express";
import PROFILE from "../mongodb/profileSchema";

const router = express.Router();

router.get("/profiles", async (req, res) => {
  try {
    const profiles = await PROFILE.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Get a specific profile by ID
router.get("/profiles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await PROFILE.findById(id);
    if (!profile) {
      return res.status(404).json({ msg: "Unauthorized action" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/profiles/:id", async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;

  try {
    //check if profile exists
    const profile = await PROFILE.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});
router.delete();
