import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, trim: true, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {
    type: String,
    required: function () {
      // Password is required only if social authentication is not used
      return !this.authProvider;
    },
  },
  authProvider: { type: String, enum: ["google"] },
  createdAt: { type: Date, default: Date.now },
});
const USER = mongoose.model("User", UserSchema);

export default USER;
