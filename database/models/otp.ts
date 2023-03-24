import mongoose, { model, Schema } from "mongoose";

const otpSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: "60m", default: Date.now },
});

export const OTP = mongoose.models.OTP || model("OTP", otpSchema);
