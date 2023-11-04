import mongoose, { model, Schema } from 'mongoose';

export interface IOTP extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

const otpSchema: Schema = new Schema<IOTP>({
    email: { type: String, required: true, unique: true, index: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: '60m', default: Date.now },
});

export const OTP = mongoose.models.OTP || model<IOTP>('OTP', otpSchema);
