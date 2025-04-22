import { ObjectId } from 'mongodb';
import mongoose, { Schema, model } from 'mongoose';
import { IMatchFeedback, matchFeedbackSchema } from './feedback';

export interface IMatch extends Document {
    partnerAId: ObjectId;
    partnerBId: ObjectId;
    partnerAFeedback: IMatchFeedback;
    partnerBFeedback: IMatchFeedback;
    overallStatus: 'pending' | 'complete' | 'partial';
    pokedA: boolean; // user A pokes then pokedA = true, and email is sent to user B
    pokedB: boolean; // user B pokes then pokedB = true, and email is sent to user A
    mutual: boolean;
    score: number;
    superMatch: boolean;
    platonic: boolean;
}

const matchSchema: Schema = new Schema<IMatch>({
    partnerAId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    partnerBId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    partnerAFeedback: matchFeedbackSchema,
    partnerBFeedback: matchFeedbackSchema,
    overallStatus: { type: String, required: true },
    pokedA: { type: Boolean, required: true },
    pokedB: { type: Boolean, required: true },
    mutual: { type: Boolean, required: true },
    score: { type: Number, required: true },
    superMatch: { type: Boolean, required: true },
    platonic: { type: Boolean, required: true },
});

export const Match = mongoose.models.Match || model<IMatch>('Match', matchSchema);
