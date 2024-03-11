import mongoose, { Schema, model } from "mongoose";
import { generateRandomString } from "../utils/index.js";

const profileSchema = Schema({
  email: {
    type: String,
    required: true,
    immutable: true,
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
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  isOnboarding: {
    valid: { type: Boolean },
    todo: {
      type: [String],
      default: ["username", "headerLink", "socialLink"],
      set: function (todo) {
        this.isOnboarding.valid = todo.length > 0;
        return todo;
      },
    },
  },
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
      display: { type: Boolean, required: true, default: true },
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

profileSchema.post("findOneAndUpdate", async function (result) {
  const doc = await this.model.findOne({ _id: result._id });
  const updatedDoc = result;
  console.log(doc !== updatedDoc);
  console.log(doc, updatedDoc);
  if (doc.username !== updatedDoc.username) {
    doc.isOnboarding.todo = doc.isOnboarding.todo.filter(
      (item) => item !== "username"
    );
  }
  if (updatedDoc.links) {
    if (doc.links.some((link) => link.type === "header")) {
      doc.isOnboarding.todo = doc.isOnboarding.todo.filter(
        (item) => item !== "headerLink"
      );
    }
    if (doc.links.some((link) => link.type === "social")) {
      doc.isOnboarding.todo = doc.isOnboarding.todo.filter(
        (item) => item !== "socialLink"
      );
    }
  }
  doc.isOnboarding.valid = doc.isOnboarding.todo.length > 0;
  await doc.save();
});

//check if profile exist
profileSchema.statics.profileExist = async function (data) {
  try {
    const existingProfile = await this.findOne(data);
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
    throw error;
  }
};

//get all profiles
profileSchema.statics.getAllProfiles = async function () {
  try {
    const profiles = await this.find({});
    return profiles;
  } catch (error) {
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
    throw error;
  }
};

// get profile by email
profileSchema.statics.getProfileByEmail = async function (email) {
  try {
    const profile = await this.findOne({ email });
    return profile;
  } catch (error) {
    throw error;
  }
};

//update profile username
profileSchema.statics.updateProfileUsername = async function (filter, update) {
  try {
    const profile = await this.findOneAndUpdate(filter, update);
    return profile;
  } catch (error) {
    throw error;
  }
};

//update profile links
profileSchema.statics.updateProfileLinks = async function (filter, update) {
  try {
    const profile = await PROFILE.findOneAndUpdate(filter, {
      $push: { links: update },
    });

    return profile;
  } catch (error) {
    throw error;
  }
};

const PROFILE = model("Profile", profileSchema);

export default PROFILE;
