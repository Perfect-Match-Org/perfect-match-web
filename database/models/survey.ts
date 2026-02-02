import { Schema } from 'mongoose';
import * as survey from '../../types/surveyEnums';

export interface ISurvey extends Document {
    complete: boolean;
    contact: {
        phone: string;
        insta: string;
        snapchat: string;
        wechat: string;
        fb: string;
        email: string;
        other: string;
    };
    nicheRedFlag: string;
    lockIn: string;
    greenFlagClub: string;
    cornellIck: string;
    task: string;
    hill: string;
    favActivity: string[];
    biggestRedFlag: string;
    interests: string[];
    music: string[];
    favSong: string;
    tv: string;
    date: string;
    whopays: string;
    greenflag: string;
    lovelanguage: string;
    showlovelanguage: string;
    romanceTrope: string;
    lastRelationship: string;
    sleeptime: string;
    waketime: string;
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
    generalPersonality: string;
    introvert: number;
    introvert_same: string;
    easygoing: number;
    easygoing_same: string;
    whySingle: string;
    numdated: number;
    sexualPartners: number;
    longestrelationship: number;
    ricePurity: string;
    politicalViews: {
        view: number;
        social: number;
        activity: number;
        cornellImpact: number;
    };
    habits: {
        drinking: string;
        smoking: string;
        zyns: string;
        weed: string;
        other: string;
    };
    partner_habits: {
        drinking: string;
        smoking: string;
        zyns: string;
        weed: string;
        other: string;
    };
    deal_breakers: string[];
}

export const surveySchema: Schema = new Schema<ISurvey>(
    {
        complete: { type: Boolean, default: false },
        contact: {
            phone: { type: String },
            insta: { type: String },
            snapchat: { type: String },
            wechat: { type: String },
            fb: { type: String },
            email: { type: String },
            other: { type: String },
        },
        nicheRedFlag: { type: String, enum: survey.nicheRedFlag, required: true },
        lockIn: { type: String, enum: survey.lockIn, required: true },
        greenFlagClub: { type: String, enum: survey.greenFlagClub, required: true },
        cornellIck: { type: String, enum: survey.cornellIck, required: true },
        task: { type: String, enum: survey.task, required: true },
        hill: { type: String, enum: survey.hill, required: true },
        favActivity: [{ type: String, enum: survey.favActivity, required: true }],
        biggestRedFlag: { type: String, enum: survey.biggestRedFlag, required: true },
        interests: [{ type: String, enum: survey.interests, required: true }],
        music: [{ type: String, enum: survey.music, required: true }],
        favSong: { type: String, required: true },
        tv: { type: String, enum: survey.tv, required: true },
        date: { type: String, enum: survey.date, required: true },
        whopays: { type: String, enum: survey.whopays, required: true },
        greenflag: { type: String, enum: survey.greenflag, required: true },
        lovelanguage: { type: String, enum: survey.lovelanguage, required: true },
        showlovelanguage: { type: String, enum: survey.showlovelanguage, required: true },
        romanceTrope: { type: String, enum: survey.romanceTrope, required: true },
        lastRelationship: { type: String, enum: survey.lastRelationship, required: true },
        sleeptime: { type: String, enum: survey.sleeptime, required: true },
        waketime: { type: String, enum: survey.waketime, required: true },
        humor: [{ type: String, enum: survey.humor, required: true }],
        sociability: [{ type: String, enum: survey.sociability, required: true }],
        p1: { type: String, enum: survey.range, required: true },
        p2: { type: String, enum: survey.range, required: true },
        p3: { type: String, enum: survey.range, required: true },
        p4: { type: String, enum: survey.range, required: true },
        p5: { type: String, enum: survey.range, required: true },
        p6: { type: String, enum: survey.range, required: true },
        p7: { type: String, enum: survey.range, required: true },
        p8: { type: String, enum: survey.range, required: true },
        p9: { type: String, enum: survey.range, required: true },
        p10: { type: String, enum: survey.range, required: true },
        p11: { type: String, enum: survey.range, required: true },
        generalPersonality: { type: String, enum: survey.generalPersonality, required: true },
        introvert: { type: Number, min: 1, max: 10, required: true },
        introvert_same: { type: String, enum: survey.introvert_same, required: true },
        easygoing: { type: Number, min: 1, max: 10, required: true },
        easygoing_same: { type: String, enum: survey.easygoing_same, required: true },
        whySingle: { type: String, enum: survey.whySingle, required: true },
        numdated: { type: Number, min: 0, max: 200, required: true },
        sexualPartners: { type: Number, min: 0, max: 300, required: false },
        longestrelationship: { type: Number, min: 0, max: 300, required: true },
        ricePurity: { type: String, enum: survey.ricePurity, required: true },
        politics: { type: Number, min: 1, max: 10, required: true },
        politically_active: { type: Number, min: 1, max: 5, required: true },
        habits: {
            drinking: { type: String, enum: survey.habits, required: true },
            smoking: { type: String, enum: survey.habits, required: true },
            zyns: { type: String, enum: survey.habits, required: true },
            weed: { type: String, enum: survey.habits, required: true },
            other: { type: String, enum: survey.habits, required: true },
        },
        partner_habits: {
            drinking: { type: String, enum: survey.partner_habits, required: true },
            smoking: { type: String, enum: survey.partner_habits, required: true },
            zyns: { type: String, enum: survey.partner_habits, required: true },
            weed: { type: String, enum: survey.partner_habits, required: true },
            other: { type: String, enum: survey.partner_habits, required: true },
        },
        deal_breakers: [{ type: String, enum: survey.deal_breakers, required: true }],
    },
    { _id: false },
);