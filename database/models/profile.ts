import { Schema } from 'mongoose';
import * as profile from '../../types/profileEnums';

export interface IProfile extends Document {
    complete: boolean;
    firstName: string;
    lastName: string;
    gender: string;
    genderPref: string[];
    age: number;
    height: number;
    city?: string;
    race: string[];
    year: string;
    college: string;
    major?: string;
    commitment: string;
    relationshipType: string;
    agePref: {
        youngest: number;
        oldest: number;
    };
    activities: string[];
    describeYourself?: { describe1: string; describe2: string; describe3: string };
    describePartner?: { describe1: string; describe2: string; describe3: string };
    bio?: string;
}

export const profileSchema: Schema = new Schema<IProfile>(
    {
        complete: { type: Boolean, default: false },
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
        gender: { type: String, enum: profile.gender },
        genderPref: [{ type: String, enum: profile.gender }],
        age: { type: Number, min: 17, max: 40 },
        height: { type: Number, min: 55, max: 78 },
        city: { type: String },
        race: [{ type: String, enum: profile.race }],
        year: { type: String, enum: profile.classYear },
        college: { type: String, enum: profile.college },
        major: { type: String },
        commitment: { type: String, enum: profile.commitment },
        relationshipType: { type: String, enum: profile.relationshipType },
        agePref: {
            youngest: { type: Number, min: 17, max: 40 },
            oldest: { type: Number, min: 17, max: 40 },
        },
        activities: [{ type: String, enum: profile.activities }],
        describeYourself: {
            describe1: { type: String },
            describe2: { type: String },
            describe3: { type: String },
        },
        describePartner: {
            describe1: { type: String },
            describe2: { type: String },
            describe3: { type: String },
        },
        bio: { type: String },
    },
    { _id: false },
);
