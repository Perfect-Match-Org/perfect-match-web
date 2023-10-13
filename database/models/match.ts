import { ObjectId } from 'mongodb';
import mongoose, { Schema, model } from 'mongoose';

export interface IMatch extends Document {
    partnerAId: ObjectId;
    partnerBId: ObjectId;
    partnerAFeedback: {
        rating: number;
        comment: string;
        dateSubmitted: Date;
    };
    partnerBFeedback: {
        rating: number;
        comment: string;
        dateSubmitted: Date;
    };
    overallStatus: 'pending' | 'complete' | 'partial';
}

const matchSchema: Schema = new Schema<IMatch>({
    partnerAId: { type: ObjectId, required: true, ref: 'User' },
    partnerBId: { type: ObjectId, required: true, ref: 'User' },
    partnerAFeedback: {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        dateSubmitted: { type: Date, required: true },
    },
    partnerBFeedback: {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        dateSubmitted: { type: Date, required: true },
    },
    overallStatus: { type: String, required: true },
});

export const Match = mongoose.models.Match || model<IMatch>('Match', matchSchema);
