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
    graduating: string;
    college: string;
    major?: [string];
    commitment: string;
    relationshipType: string;
    agePref: {
        youngest: number;
        oldest: number;
    };
    activities: string[];
    greenFlag: string;
    guiltyPleasure: string;
    bio?: string;
    religion?: string[];
    languages: string[];
}

export const profileSchema: Schema = new Schema<IProfile>(
    {
        complete: { type: Boolean, default: false },
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true },
        gender: { type: String },
        genderPref: [{ type: String }],
        age: { type: Number, min: 17, max: 40 },
        height: { type: Number, min: 55, max: 78 },
        city: { type: String },
        race: [{ type: String }],
        year: { type: String, enum: profile.classYear },
        college: { type: String, enum: profile.college },
        major: [{ type: String }],
        commitment: { type: String, enum: profile.commitment },
        relationshipType: { type: String, enum: profile.relationshipType },
        agePref: {
            youngest: { type: Number, min: 17, max: 40 },
            oldest: { type: Number, min: 17, max: 40 },
        },
        activities: [{ type: String, enum: profile.activities }],
        greenFlag: { type: String },
        guiltyPleasure: { type: String },
        bio: { type: String },
        religion: [{ type: String }],
    },
    { _id: false },
);