import PROFILE from "../mongodb/profileSchema.js";

export const getProfileByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    //check if profile exsits
    const profile = await PROFILE.profileExist(email);
    if (!profile) {
      return res.status(400).json({ msg: "Unauthorized action" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const updateProfileUser = async (req, res) => {
  const { username } = req.body;
  const { email } = req.params;
  try {
    //check if profile exists
    const profile = await PROFILE.profileExist(email);

    if (!profile) {
      return res.status(400).json({ error: "Profile not found" });
    }
    const updatedProfile = PROFILE.updateProfileUsername(username);
    updatedProfile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateProfileLinks = async () => {
  const { title, url, img, type } = req.body;
  const { email } = req.params;
  try {
    //check if profile exists
    const profile = await PROFILE.profileExist(email);

    if (!profile) {
      return res.status(400).json({ error: "Profile not found" });
    }
    const updatedProfile = PROFILE.updateProfileLinks({
      title,
      url,
      img,
      type,
    });
    // profile.
    updatedProfile.save();
    res.status(200).json({ msg: "Profile updated", updatedProfile });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
