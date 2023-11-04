import { Schema } from 'mongoose';
import * as survey from '../../types/surveyEnums';

export interface ISurvey extends Document {
    complete: boolean;
    contact: {
        fb: string;
        insta: string;
        twitter: string;
        snapchat: string;
        linkedin: string;
        phone: string;
    };
    faction: string;
    libraryRanking: number;
    clothDate: string;
    alternative: string;
    task: string;
    hookupsong: string;
    hookupsongartist: string;
    slopeDay: string;
    study: string;
    workTo: string;
    interests: string[];
    music: string[];
    tv: string;
    date: string;
    sleeptime: string;
    waketime: string;
    plans: string;
    meal: string;
    perfectDay: string;
    startover: string;
    timeormoney: string;
    quality: string;
    humor: string[];
    sociability: string[];
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
    p7: string;
    p8: string;
    p9: string;
    p10: string;
    p11: string;
    p12: string;
    p13: string;
    p14: string;
    p15: string;
    p16: string;
    p17: string;
    p18: string;
    p19: string;
    generalPersonality: string;
    introvert: number;
    introvert_same: string;
    easygoing: number;
    easygoing_same: string;
    numdated: number;
    longestrelationship: number;
    ricePurity: string;
    pairedwith: string;
    apps: string[];
    politics: number;
    politically_active: number;
    habits: {
        drinking: string;
        smoking: string;
        weed: string;
        other: string;
    };
    partner_habits: {
        drinking: string;
        smoking: string;
        weed: string;
        other: string;
    };
    deal_breakers: string[];
}

export const surveySchema: Schema = new Schema<ISurvey>(
    {
        complete: { type: Boolean, default: false },
        contact: {
            fb: { type: String },
            insta: { type: String },
            twitter: { type: String },
            snapchat: { type: String },
            linkedin: { type: String },
            phone: { type: String },
        },
        faction: { type: String, enum: survey.faction },
        libraryRanking: { type: Number, min: 1, max: 10 },
        clothDate: { type: String, enum: survey.clothDate },
        alternative: { type: String, enum: survey.alternative },
        task: { type: String, enum: survey.task },
        hookupsong: { type: String },
        hookupsongartist: { type: String },
        slopeDay: { type: String },
        study: { type: String, enum: survey.study },
        workTo: { type: String, enum: survey.workto },
        interests: [{ type: String, enum: survey.interests }],
        music: [{ type: String, enum: survey.music }],
        tv: { type: String, enum: survey.tv },
        date: { type: String, enum: survey.date },
        sleeptime: { type: String, enum: survey.sleeptime },
        waketime: { type: String, enum: survey.waketime },
        plans: { type: String, enum: survey.plans },
        meal: { type: String, enum: survey.meal },
        perfectDay: { type: String, enum: survey.perfectDay },
        startover: { type: String, enum: ['yes', 'no'] },
        timeormoney: { type: String, enum: survey.timeormoney },
        quality: { type: String, enum: survey.quality },
        humor: [{ type: String, enum: survey.humor }],
        sociability: [{ type: String, enum: survey.sociability }],
        p1: { type: String, enum: survey.range },
        p2: { type: String, enum: survey.range },
        p3: { type: String, enum: survey.range },
        p4: { type: String, enum: survey.range },
        p5: { type: String, enum: survey.range },
        p6: { type: String, enum: survey.range },
        p7: { type: String, enum: survey.range },
        p8: { type: String, enum: survey.range },
        p9: { type: String, enum: survey.range },
        p10: { type: String, enum: survey.range },
        p11: { type: String, enum: survey.range },
        p12: { type: String, enum: survey.range },
        p13: { type: String, enum: survey.range },
        p14: { type: String, enum: survey.range },
        p15: { type: String, enum: survey.range },
        p16: { type: String, enum: survey.range },
        p17: { type: String, enum: survey.range },
        p18: { type: String, enum: survey.range },
        p19: { type: String, enum: survey.range },
        generalPersonality: { type: String, enum: ['similar', 'different'] },
        introvert: { type: Number, min: 1, max: 10 },
        introvert_same: { type: String, enum: survey.panel },
        easygoing: { type: Number, min: 1, max: 10 },
        easygoing_same: { type: String, enum: survey.panel },
        numdated: { type: Number, min: 0 },
        longestrelationship: { type: Number, min: 0, max: 144 },
        ricePurity: { type: String, enum: survey.ricePurity },
        pairedwith: { type: String, enum: ['similar', 'different', 'either'] },
        apps: [{ type: String, enum: survey.apps }],
        politics: { type: Number, min: 1, max: 10 },
        politically_active: { type: Number, min: 1, max: 5 },
        habits: {
            drinking: { type: String, enum: survey.habits },
            smoking: { type: String, enum: survey.habits },
            weed: { type: String, enum: survey.habits },
            other: { type: String, enum: survey.habits },
        },
        partner_habits: {
            drinking: { type: String, enum: survey.habits },
            smoking: { type: String, enum: survey.habits },
            weed: { type: String, enum: survey.habits },
            other: { type: String, enum: survey.habits },
        },
        deal_breakers: [{ type: String, enum: survey.deal_breakers }],
    },
    { _id: false },
);
