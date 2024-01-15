import mongoose, { Schema, model } from "mongoose";

const ProfileSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
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
  links: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
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

const Profile = model("Profile", ProfileSchema);

export default Profile;
