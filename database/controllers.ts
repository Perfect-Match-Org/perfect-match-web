import { User, OTP } from "./models";
import AWS from "aws-sdk";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const matchRevealData =
  "id profile.name profile.firstName profile.year profile.major profile.firstName profile.city profile.describeYourself survey.hookupsong profile.bio survey.contact.insta survey.contact.fb survey.contact.twitter survey.contact.linkedin survey.contact.phone survey.contact.snap";

export const createUser = async (user: any) => {
  const { email, given_name, family_name } = user;
  const newUser = new User({
    email: user.email,
    optIn: false,
    profile: { firstName: given_name, lastName: family_name, email: email },
  });
  const doc = await newUser.save();
  return doc;
};

export const getUser = async (user: any) => {
  const doc = await User.findOne({ email: user.email }).populate(
    "matches",
    matchRevealData
  );
  return doc;
};

export const getUsersCount = async () => {
  const resp = await User.countDocuments();
  return resp;
};

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

export const updateSurvey = async (user: any, survey: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { survey: survey },
    { new: true }
  );
  return doc;
};

export const updateProfile = async (user: any, profile: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { profile: profile },
    { new: true }
  );
  return doc;
};

export const updateCrushes = async (user: any, crushes: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { crushes: crushes },
    { new: true }
  );
  return doc;
};

export const updateForbidden = async (user: any, forbidden: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { forbidden: forbidden },
    { new: true }
  );
  return doc;
};

export const updateUserOptIn = async (user: any, optIn: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { optIn: optIn },
    { new: true }
  );
  return doc;
};

export const requestOTP = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const existingOTP = await OTP.findOne({ email }).exec();
  let otpValue;
  if (!existingOTP) {
    otpValue = crypto.randomBytes(3).toString("hex");
    const newOTP = new OTP({ email, otp: otpValue });
    await newOTP.save();
  } else {
    otpValue = existingOTP.otp;
  }
  return await sendOTP(user, otpValue);
};

export const getMutualVerifiedMatches = async (email: string, otp: number) => {
  // find user with that email
  const registeredOTP = await OTP.findOne({ email: email }).exec();
  if (!registeredOTP || registeredOTP.otp !== otp) return null;
  const user = await User.findOneAndUpdate(
    { email: email },
    { "collab.mutual": true },
    { new: true }
  ).populate("matches");
  if (!user) return [];
  const verifiedMatches = user.matches
    .map((match: any) => {
      if (match?.collab?.mutual) return match.email;
    })
    .filter((email: string) => email);
  return verifiedMatches;
};

async function sendOTP(user: any, otp: string) {
  const emailsDirectory = path.join(process.cwd(), "emails");
  const html = await fs
    .readFile(emailsDirectory + "/otp.html", "utf8")
    .then((data) => data);
  const message = html
    .replace("{name}", user.profile.firstName)
    .replace("{otp}", otp);
  const params = {
    Destination: { ToAddresses: [user.email] },
    Message: {
      Body: { Html: { Charset: "UTF-8", Data: message } },
      Subject: {
        Charset: "UTF-8",
        Data: "Your OTP for Mutual X Perfect Match Verification",
      },
    },
    Source: " Perfect Match <noreply@perfectmatch.ai>",
  };
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  await new AWS.SES({ apiVersion: "latest" }).sendEmail(params).promise();
  return otp;
}
