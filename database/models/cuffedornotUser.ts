import mongoose, { Model } from 'mongoose';

// Minimal model — only used for countDocuments() against the shared MongoDB.
// Full schema lives in the cuffedornot repo.
const cuffedOrNotUserSchema = new mongoose.Schema({}, { strict: false });

export const CuffedOrNotUser: Model<any> =
    mongoose.models.cuffedornot_user ||
    mongoose.model('cuffedornot_user', cuffedOrNotUserSchema, 'cuffedornot_users');
