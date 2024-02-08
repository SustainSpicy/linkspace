import mongoose, { Schema, model } from "mongoose";
import { generateRandomString } from "../utils/index.js";

const profileSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    default: () => {
      return generateRandomString(6);
    },
  },
  isFirstTime: { type: Boolean, default: true },
  links: [
    {
      title: {
        type: String,
      },
      url: {
        type: String,

        trim: true,
      },
      img: {
        type: String,
        trim: true,
      },
      type: { type: String, required: true, enum: ["header", "social"] },
    },
  ],
  dob: {
    type: Date,
    validate: {
      validator: function (date) {
        // Add custom date validation logic if needed
        return date <= new Date();
      },
      message: "Date of birth cannot be in the future.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent updating createdAt
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

//check if profile exist
profileSchema.statics.profileExist = async function (email) {
  try {
    const existingProfile = await this.findOne({ email });
    return existingProfile;
  } catch (error) {
    throw error;
  }
};

// create new profile
profileSchema.statics.createProfile = async function (profileData) {
  try {
    const profile = await this.create(profileData);
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//get all profiles
profileSchema.statics.getAllProfiles = async function () {
  try {
    const profiles = await this.find({});
    return profiles;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//get profile by id

//get all profiles
profileSchema.statics.getProfileById = async function (id) {
  try {
    const profile = await this.findOne({ _id: id });
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get profile by email
profileSchema.statics.getProfileByEmail = async function (email) {
  try {
    const profile = await this.findOne({ email });
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update profile username
profileSchema.statics.updateProfileUsername = async function (userData) {
  try {
    const profile = await this.updateOne(userData);
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update profile links
profileSchema.statics.updateProfileLinks = async function (linkData) {
  try {
    const profile = await this.links.push(linkData);
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PROFILE = model("Profile", profileSchema);

export default PROFILE;
