import USER from "../mongodb/schema.js";

export const addUserToDb = async (userData) => {
  try {
    const newUser = new USER(userData);

    return await newUser.save();
  } catch (error) {
    throw "Error adding user to the database " + error;
  }
};
