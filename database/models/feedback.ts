import { Schema } from 'mongoose';

export interface IMatchFeedback {
    overallRating: number;
    topReasonForRating: string;
    metMatch: boolean;
    initialRatingDifference: boolean;
    numberOfDates: number;
    inRelationshipWithMatch: boolean;
    additionalComments: string;
    dateSubmitted?: Date;
}

export interface ISurveyFeedback {
    bad: boolean;
    opportunities: boolean;
    fun: boolean;
    joy: boolean;
    memories: boolean;
    anticipation: boolean;
    categoryRanking: string[];
    surveyFeedback: string;
    otherValentinesDayImpact: string;
    comments: string;
}

export const matchFeedbackSchema: Schema = new Schema<IMatchFeedback>(
    {
        overallRating: { type: Number, required: true },
        topReasonForRating: { type: String, required: true },
        metMatch: { type: Boolean, required: true },
        initialRatingDifference: { type: Boolean, required: true },
        numberOfDates: { type: Number, required: true },
        inRelationshipWithMatch: { type: Boolean, required: true },
        additionalComments: { type: String, required: true },
        dateSubmitted: { type: Date, required: false },
    },
    { _id: false },
);

export const surveyFeedbackSchema: Schema = new Schema<ISurveyFeedback>(
    {
        categoryRanking: { type: [String], required: true, default: ['Interest', 'Lifestyle', 'Beliefs', 'Goal', 'Vibe'] },
        surveyFeedback: { type: String, required: true },
        otherValentinesDayImpact: { type: String, required: false },
        comments: { type: String, required: false },
        bad: { type: Boolean, required: false, default: false },
        opportunities: { type: Boolean, required: false, default: false },
        fun: { type: Boolean, required: false, default: false },
        joy: { type: Boolean, required: false, default: false },
        memories: { type: Boolean, required: false, default: false },
        anticipation: { type: Boolean, required: false, default: false },
    },
    { _id: false },
);
