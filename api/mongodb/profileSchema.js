import mongoose, { Schema, model } from "mongoose";

const profileSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: { type: String, unique: true, trim: true },
  links: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
      img: {
        type: String,
        trim: true,
      },
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
userSchema.statics.profileExist = async function (email) {
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
profileSchema.statics.updateProfile = async function (userData) {
  try {
    const profile = await this.updateOne(userData);
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PROFILE = model("Profile", profileSchema);

export default PROFILE;
