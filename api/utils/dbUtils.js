import USER from "../mongodb/userSchema.js";
import PROFILE from "../mongodb/profileSchema.js";

export const addUserToDb = async (userData, session) => {
  try {
    const newUser = new USER(userData);

    return await newUser.save({ session });
  } catch (error) {
    throw error.message;
  }
};

export const createNewProfile = async (profileData) => {
  try {
    const newProfile = new PROFILE(profileData);

    return await newProfile.save();
  } catch (error) {
    throw error.message;
  }
};
