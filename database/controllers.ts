import { User, OTP } from './models';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { User as UserType, Review, MatchReview } from '../types/users';
import { Match } from './models/match';
import ReviewModel, { IReviewData } from './models/review';
import { ObjectId } from 'mongodb';
import { connect } from './database';

const matchRevealData =
    'id email profile.name profile.firstName profile.year profile.major profile.firstName profile.city profile.describeYourself profile.describePartner profile.bio survey.hookupsong survey.hookupsongURL survey.contact survey.greenflag survey.interests profile.guiltyPleasure profile.greenFlag profile.relationshipType survey.humor survey.date survey.introvert';

/**
 * Populates match data with specific fields from the User model.
 * @param {string} index - The index of the partner (A or B) to populate.
 * @returns An object with the path, model, and selected fields for populating match data.
 */
const populateMatch = (index: string) => {
    return {
        path: `partner${index}Id`,
        model: 'User',
        select: matchRevealData,
    };
};

// User CRUD operations-----------------------------------------------------------------------------------------------

/**
 * Creates a new user in the database.
 * @param {UserType} user - The user data to create a new user.
 * @returns A Promise that resolves to the created UserType.
 */
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

/**
 * Retrieves a user from the database by email and populates match reviews.
 * @param {any} user - The user object containing the email to search for.
 * @returns A Promise that resolves to the UserType with populated match reviews.
 */
export const getUser = async (user: any): Promise<UserType> => {
    const doc = await User.findOne({ email: user.email }).populate({
        path: 'matchReviews',
        model: 'Match',
        options: { sort: { 'score': -1 } },
        populate: [populateMatch('A'), populateMatch('B')],
    });
    // remove the match's feedback from the user for security reasons
    if (doc) {
        const matchCount = doc?.matchReviews.length || 0;
        doc.matchReviews = doc.matchReviews.slice(0, 8).map((match: any) => {
            if (match.partnerAId.email === user.email) match.partnerBFeedback = null;
            else match.partnerAFeedback = null;
            return match;
        });
        doc.matchCount = matchCount;
    }
    return doc;
};

/**
 * Counts the number of User documents in the database.
 * @returns A Promise that resolves to the number of users.
 */
export const getUsersCount = async (): Promise<number> => {
    const resp = await User.countDocuments();
    return resp;
};

/**
 * Counts the number of User documents in the database who have opted in.
 * @returns A Promise that resolves to the number of users who have opted in.
 */
export const getOptInUsersCount = async (): Promise<number> => {
    const resp = await User.countDocuments({ optIn: true });
    return resp;
};

/**
 * Counts the number of User documents in the database who have completed the profile.
 * @returns A Promise that resolves to the number of users who have completed the profile.
 */
export const getProfiledUsersCount = async (): Promise<number> => {
    const resp = await User.countDocuments({ "profile.complete": true });
    return resp;
};

/**
 * Counts the number of User documents in the database who have completed the survey.
 * @returns A Promise that resolves to the number of users who have completed the survey.
 */
export const getSurveyedUsersCount = async (): Promise<number> => {
    const resp = await User.countDocuments({ "survey.complete": true });
    return resp;
};

/**
 * Retrieves all users from the database by page.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of users to retrieve per page. If provided as 0, all users are retrieved.
 * @param {String} searchTerm - The search term to filter users by for matching name or email. Empty string retrieves all users.
 * @returns A Promise that resolves to an array of UserType.
 */
export const getUsers = async (page: number, limit: number, searchTerm: string): Promise<UserType[]> => {
    const filter = searchTerm ? {
        $or: [
            { $expr: { $regexMatch: { input: { $concat: ["$profile.firstName", " ", "$profile.lastName"] }, regex: searchTerm, options: "i" } } },
            { email: { $regex: searchTerm, $options: "i" } },
        ]
    } : {};

    const users = await User.find(filter)
        .skip((page - 1) * limit)
        .limit(limit > 0 ? limit : 0);
    return users;
};

/**
 * Updates the crushes list for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} crushes - The new crushes data to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateCrushes = async (user: any, crushes: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { crushes: crushes }, { new: true });
    return doc;
};


/**
 * This function updates a match document in a database with new values for pokedA and pokedB fields.
 * @param {any} match - The match object containing the _id to match.
 * @returns A Promise that resolves to the updated MatchReview.
 */
export const updateMatchPoked = async (matchId: any, pokedA: boolean, pokedB: boolean): Promise<MatchReview | any> => {
    const doc = await Match.findOneAndUpdate({ _id: new ObjectId(matchId) }, { pokedA, pokedB }, { new: true });
    return doc;
}

/**
 * Updates the forbidden list for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} forbidden - The new forbidden data to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateForbidden = async (user: any, forbidden: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { forbidden: forbidden }, { new: true });
    return doc;
};

/**
 * Updates the opt-in status for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} optIn - The new opt-in status to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateUserOptIn = async (user: any, optIn: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { optIn: optIn }, { new: true });
    return doc;
};

// Survey and Profile CRUD operations---------------------------------------------------------------------------------------------

/**
 * Updates the survey data for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} survey - The new survey data to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateSurvey = async (user: any, survey: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { survey: survey }, { new: true });
    return doc;
};

/**
 * Updates the profile information for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} profile - The new profile data to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateProfile = async (user: any, profile: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { profile: profile }, { new: true });
    return doc;
};

/**
 * Updates the feedback for a specific user.
 * @param {any} user - The user object containing the email to match.
 * @param {any} feedback - The new feedback data to update.
 * @returns A Promise that resolves to the updated UserType.
 */
export const updateFeedback = async (user: any, feedback: any): Promise<UserType> => {
    const doc = await User.findOneAndUpdate({ email: user.email }, { feedback: feedback }, { new: true });
    return doc;
};

// Match Review CRUD operations---------------------------------------------------------------------------------------------

/**
 * Updates or creates a match review for a specific match and user.
 * @param {string} userEmail - The email of the user providing the review.
 * @param {string} matchId - The ID of the match being reviewed.
 * @param {Review} review - The review data to update.
 * @returns A Promise that resolves to the updated MatchReview or null if not valid.
 */
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
    ); return updatedMatch;
};

/**
 * Retrieves all pending reviews from the database.
 * Used in pending-reviews page for admin review management.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of reviews to retrieve per page. If provided as 0, all reviews are retrieved.
 * @returns A Promise that resolves to an array of pending reviews sorted by creation date (newest first).
 */
export const getPendingReviews = async (page: number = 1, limit: number = 0) => {
    await connect();
    const query = ReviewModel.find({ status: 'pending' }).sort({ createdAt: -1 });

    if (limit > 0) {
        return await query.skip((page - 1) * limit).limit(limit);
    }

    return await query;
};

/**
 * Retrieves all approved reviews from the database.
 * Used in testimonial page for displaying customer reviews.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of reviews to retrieve per page. If provided as 0, all reviews are retrieved.
 * @returns A Promise that resolves to an array of approved reviews sorted by creation date (newest first).
 */
export const getApprovedReviews = async (page: number = 1, limit: number = 0) => {
    await connect();
    const query = ReviewModel.find({ status: 'approved' }).sort({ createdAt: -1 });

    if (limit > 0) {
        return await query.skip((page - 1) * limit).limit(limit);
    }

    return await query;
};

/**
 * Counts the number of pending reviews in the database.
 * @returns A Promise that resolves to the number of pending reviews.
 */
export const getPendingReviewsCount = async (): Promise<number> => {
    await connect();
    const resp = await ReviewModel.countDocuments({ status: 'pending' });
    return resp;
};

/**
 * Counts the number of approved reviews in the database.
 * @returns A Promise that resolves to the number of approved reviews.
 */
export const getApprovedReviewsCount = async (): Promise<number> => {
    await connect();
    const resp = await ReviewModel.countDocuments({ status: 'approved' });
    return resp;
};

/**
 * Submits a new review to the database with pending status.
 * Used in testimonials page for customers to submit new reviews.
 * @param {IReviewData} reviewData - The review data containing title, body, author, and optional name.
 * @returns A Promise that resolves to the saved review document.
 */
export const submitReview = async (reviewData: IReviewData) => {
    await connect();
    const review = new ReviewModel({
        ...reviewData,
        status: 'pending',
    });

    return await review.save();
};

/**
 * Approves a pending review by updating its status.
 * Used in pending-reviews page for admin approval workflow.
 * @param {string} id - The ID of the review to approve.
 * @returns A Promise that resolves to the updated review document.
 */
export const approveReview = async (id: string) => {
    await connect();
    return await ReviewModel.findByIdAndUpdate(
        id,
        { status: 'approved', updatedAt: new Date() },
        { new: true }
    );
};

/**
 * Rejects a pending review by updating its status.
 * Used in pending-reviews page for admin moderation workflow.
 * @param {string} id - The ID of the review to reject.
 * @returns A Promise that resolves to the updated review document.
 */
export const rejectReview = async (id: string) => {
    await connect();
    return await ReviewModel.findByIdAndUpdate(
        id,
        { status: 'rejected', updatedAt: new Date() },
        { new: true }
    );
};

/**
 * Soft deletes a previously approved review by updating its status.
 * Used for deleting reviews that need to be removed from public display.
 * @param {string} id - The ID of the review to delete.
 * @returns A Promise that resolves to the updated review document.
 */
export const deleteReview = async (id: string) => {
    await connect();
    return await ReviewModel.findByIdAndUpdate(
        id,
        { status: 'deleted', updatedAt: new Date() },
        { new: true }
    );
};

/**
 * Retrieves a review by its ID.
 * Used for fetching specific review details across the application.
 * @param {string} id - The ID of the review to retrieve.
 * @returns A Promise that resolves to the review document or null if not found.
 */
export const getReviewById = async (id: string) => {
    await connect();
    return await ReviewModel.findById(id);
};

// Collab CRUD operations---------------------------------------------------------------------------------------------

/**
 * Requests a One-Time Password (OTP) for a user to perform a mutual verification.
 * @param {string} email - The email of the user requesting the OTP.
 * @returns A Promise that resolves to the OTP if it was successfully sent, or null if the user does not exist.
 */
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

/**
 * Retrieves a list of mutual verified matches for a user after verifying their OTP.
 * @param {string} email - The email of the user.
 * @param {number} otp - The OTP provided by the user for verification.
 * @returns A Promise that resolves to an array of emails representing the mutual verified matches.
 */
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
