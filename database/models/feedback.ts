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
    categoryRanking: number[];
    surveyFeedback: string;
    valentinesDayImpact: string[];
    otherValentinesDayImpact: string;
    anyComment: string;
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
        categoryRanking: [{ type: Number, required: true }],
        surveyFeedback: { type: String, required: true },
        valentinesDayImpact: [{ type: String, required: true }],
        otherValentinesDayImpact: { type: String, required: false },
        anyComment: { type: String, required: false },
    },
    { _id: false },
);
