import { ObjectId } from 'mongodb';
import mongoose, { model, Schema } from 'mongoose';
import { IProfile, profileSchema } from './profile';
import { ISurvey, surveySchema } from './survey';
import { ISurveyFeedback, surveyFeedbackSchema } from './feedback';

type Crush = {
    // Note: This is a recent change. Therefore, some users may have an array of strings instead of an array of objects.
    email: string;
    reachout: boolean;
};
export interface IUser extends Document {
    email: string;
    optIn: boolean;
    profile: IProfile;
    survey: ISurvey;
    crushes: Crush[] | string[];
    forbidden: string[];
    matches: ObjectId[];
    matchReviews: ObjectId[];
    collab: { mutual: boolean };
    categoryRanking: number[];
    feedback: ISurveyFeedback;
}

const userSchema: Schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, index: true },
    optIn: { type: Boolean, required: true },
    profile: profileSchema,
    survey: surveySchema,
    crushes: [{ type: Object }],
    forbidden: [{ type: String }],
    matches: [{ type: ObjectId, ref: 'User' }],
    matchReviews: [{ type: ObjectId, ref: 'Match' }],
    collab: { mutual: { type: Boolean } },
    categoryRanking: [{ type: Number, required: true }],
    feedback: surveyFeedbackSchema,
});

export const User = mongoose.models.User || model<IUser>('User', userSchema);
