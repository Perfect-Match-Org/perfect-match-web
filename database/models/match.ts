import { ObjectId } from 'mongodb';
import mongoose, { Schema, model } from 'mongoose';
import { IMatchFeedback, matchFeedbackSchema } from './feedback';

export interface IMatch extends Document {
    partnerAId: ObjectId;
    partnerBId: ObjectId;
    partnerAFeedback: IMatchFeedback;
    partnerBFeedback: IMatchFeedback;
    overallStatus: 'pending' | 'complete' | 'partial';
}

const matchSchema: Schema = new Schema<IMatch>({
    partnerAId: { type: ObjectId, required: true, ref: 'User' },
    partnerBId: { type: ObjectId, required: true, ref: 'User' },
    partnerAFeedback: matchFeedbackSchema,
    partnerBFeedback: matchFeedbackSchema,
    overallStatus: { type: String, required: true },
});

export const Match = mongoose.models.Match || model<IMatch>('Match', matchSchema);
