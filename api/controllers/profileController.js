import PROFILE from "../mongodb/profileSchema.js";
// import { ObjectId } from "mongodb";

export const getProfileByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    //check if profile exsits
    const profile = await PROFILE.profileExist({ email });
    if (!profile) {
      return res.status(400).json({ msg: "Unauthorized action" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const getProfileByUsername = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    //check if profile exsits
    const profile = await PROFILE.profileExist({ username });

    if (profile) {
      return res.status(200).json({ valid: false, msg: "Username taken" });
    }
    res.status(200).json({ valid: true, msg: "Username available" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateProfileUserName = async (req, res) => {
  const { username } = req.body;
  const { email } = req.params;

  try {
    //check if profile exists
    const profile = await PROFILE.profileExist({ email });

    if (!profile) {
      return res.status(400).json({ error: "Profile not found" });
    }
    const updatedProfile = await PROFILE.updateProfileUsername(
      { email },
      { username }
    );

    console.log(updatedProfile);
    res
      .status(200)
      .json({ msg: "Profile updated", ...updatedProfile.toObject() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createProfileLinks = async (req, res) => {
  const { title, url, img, type } = req.body;
  const { email } = req.params;

  try {
    //check if profile exists
    const profile = await PROFILE.profileExist({ email });

    if (!profile) {
      return res.status(400).json({ error: "Error creating link" });
    }
    const newLink = { title, url, img, type };

    const updatedProfile = await PROFILE.updateProfileLinks({ email }, newLink);

    // console.log(updatedProfile);
    res.status(200).json({ msg: "Link created" });
  } catch (error) {
    console.error("eer", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateProfileLinks = async (req, res) => {
  const { title, url, img, type, _id, display } = req.body;
  const { email } = req.params;

  try {
    //check if profile exists
    const profile = await PROFILE.profileExist({ email });
    if (!profile) {
      return res.status(400).json({ error: "Error updating link" });
    }

    // Find the index of the link to update
    const linkIndex = profile.links.findIndex((link) => link._id.equals(_id));

    if (linkIndex === -1) {
      return res.status(404).json({ error: "Link not found" });
    }
    const newLink = { _id, title, url, img, type, display: true };

    // Update the link
    profile.links[linkIndex] = newLink;

    await profile.save();
    res.status(200).json({ msg: "Link Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteProfileLink = async (req, res) => {
  const { linkId } = req.params;
  const { email } = req.user;
  try {
    // Find profile by id
    const profile = await PROFILE.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Find the index of the link in the links array
    const linkIndex = profile.links.findIndex(
      (link) => link._id.toString() === linkId
    );
    if (linkIndex === -1) {
      return res.status(404).json({ message: "Link not found in profile" });
    }
    // Remove the link from the array
    profile.links.splice(linkIndex, 1);
    // Save the updated profile
    await profile.save();

    res.status(200).json({ message: "Link deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting link", error: error.message });
  }
};
