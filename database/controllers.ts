import { User } from "./models";
import { redisClient } from "./redis";

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

export const getMutualVerifiedMatches = async (email: string) => {
  await User.findOneAndUpdate(
    { email: email },
    { "collab.mutual": true }
  ).exec();
  const user = await User.findOne({ email: email }).populate("matches");
  const verifiedMatches = user.matches
    .map((match: any) => {
      if (match?.collab?.mutual) return match.email;
    })
    .filter((email: string) => email);
  return verifiedMatches;
};
