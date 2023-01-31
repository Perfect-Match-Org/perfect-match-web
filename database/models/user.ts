import { ObjectId } from "mongodb";
import mongoose, { model, Schema } from "mongoose";
import { profileSchema } from "./profile";
import { surveySchema } from "./survey";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  optIn: { type: Boolean, required: true },
  profile: profileSchema,
  survey: surveySchema,
  crushes: [{ type: String }],
  forbidden: [{ type: String }],
  matches: [{ type: ObjectId, ref: "User" }],
});

export const User = mongoose.models.User || model("User", userSchema);
