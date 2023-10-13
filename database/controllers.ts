import { User, OTP } from './models';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { User as UserType, Review, MatchReview } from '../types/users';
import { Match } from './models/match';
import { ObjectId } from 'mongodb';

const matchRevealData =
    'id email profile.name profile.firstName profile.year profile.major profile.firstName profile.city profile.describeYourself survey.hookupsong profile.bio survey.contact.insta survey.contact.fb survey.contact.twitter survey.contact.linkedin survey.contact.phone survey.contact.snap';

const populateMatch = (index: string) => {
    return {
        path: `partner${index}Id`,
        model: 'User',
        select: matchRevealData,
    };
};

// User CRUD operations-----------------------------------------------------------------------------------------------
export const createUser = async (user: any): Promise<UserType> => {
    const { email, given_name, family_name } = user;
    const newUser = new User({
        email: user.email,
        optIn: false,
        profile: { firstName: given_name, lastName: family_name, email: email },
    });
    const doc = await newUser.save();
    return doc;
};

export const getUser = async (user: any): Promise<UserType> => {
    const doc = await User.findOne({ email: user.email }).populate({
        path: 'matchReviews',
        model: 'Match',
        populate: [populateMatch('A'), populateMatch('B')],
    });
    // remove the match's feedback from the user for security reasons
    if (doc) {
        doc.matchReviews = doc.matchReviews.map((match: any) => {
            if (match.partnerAId.email === user.email) match.partnerBFeedback = null;
            else match.partnerAFeedback = null;
            return match;
        });
    }
    return doc;
};

export const getUsersCount = async (): Promise<number> => {
    const resp = await User.countDocuments();
    return resp;
};

export const getUsers = async (): Promise<UserType[]> => {
    const users = await User.find();
    return users;
};

export const updateCrushes = async (user: any, crushes: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { crushes: crushes }, { new: true });
    return doc;
};

export const updateForbidden = async (user: any, forbidden: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { forbidden: forbidden }, { new: true });
    return doc;
};

export const updateUserOptIn = async (user: any, optIn: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { optIn: optIn }, { new: true });
    return doc;
};

// Survey and Profile CRUD operations---------------------------------------------------------------------------------------------
export const updateSurvey = async (user: any, survey: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { survey: survey }, { new: true });
    return doc;
};

export const updateProfile = async (user: any, profile: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { profile: profile }, { new: true });
    return doc;
};

// Match Review CRUD operations---------------------------------------------------------------------------------------------
export const updateMatchReview = async (
    userEmail: string,
    matchId: string,
    review: Review,
): Promise<MatchReview | null> => {
    const user = await User.findOne({ email: userEmail });
    if (!user) return null;

    const match = await Match.findOne({ _id: new ObjectId(matchId) });
    if (!match) return null;

    const { _id: userId } = user;
    const { partnerAId, partnerBId } = match;
    // IMPORTANT SECURITY CHECK
    if (!userId.equals(partnerAId) && !userId.equals(partnerBId)) return null;

    const partnerField = userId.equals(partnerAId) ? 'partnerAFeedback' : 'partnerBFeedback';
    const oppositeField = userId.equals(partnerAId) ? 'partnerBFeedback' : 'partnerAFeedback';
    const status = match[oppositeField].dateSubmitted !== null ? 'reviewed' : 'partial';

    const updatedMatch = await Match.findOneAndUpdate(
        { _id: new ObjectId(matchId) },
        {
            [partnerField]: review,
            overallStatus: status,
        },
        { upsert: true, new: true },
    );

    return updatedMatch;
};

// Collab CRUD operations---------------------------------------------------------------------------------------------
export const requestOTP = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const existingOTP = await OTP.findOne({ email }).exec();
    let otpValue;

    if (!existingOTP) {
        otpValue = crypto.randomBytes(3).toString('hex');
        const newOTP = new OTP({ email, otp: otpValue });
        await newOTP.save();
    } else otpValue = existingOTP.otp;

    return await sendOTP(user, otpValue);
};

export const getMutualVerifiedMatches = async (email: string, otp: number) => {
    const registeredOTP = await OTP.findOne({ email }).exec();

    if (!registeredOTP || registeredOTP.otp !== otp) return null;

    const user = await User.findOneAndUpdate({ email }, { 'collab.mutual': true }, { new: true }).populate('matches');

    if (!user) return [];

    const verifiedMatches = user.matches
        .map((match: any) => (match?.collab?.mutual ? match.email : null))
        .filter((email: string) => email);

    return verifiedMatches;
};

async function sendOTP(user: any, otp: string) {
    const emailsDirectory = path.join(process.cwd(), 'reminders/emails');
    const html = await fs.readFile(emailsDirectory + '/otp.html', 'utf8').then((data) => data);
    const message = html.replace('{name}', user.profile.firstName).replace('{otp}', otp);

    const params = {
        Destination: { ToAddresses: [user.email] },
        Message: {
            Body: { Html: { Charset: 'UTF-8', Data: message } },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your OTP for Mutual X Perfect Match Verification',
            },
        },
        Source: ' Perfect Match <noreply@perfectmatch.ai>',
    };

    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    await new AWS.SES({ apiVersion: 'latest' }).sendEmail(params).promise();
    return otp;
}
