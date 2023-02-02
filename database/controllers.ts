import { User } from "./models";

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
  const doc = await User.findOne({ email: user.email }).lean();
  return doc;
};

export const getUsersCount = async () => {
  const resp = await User.countDocuments();
  return resp;
};

export const getUsers = async () => {
  const resp = await User.find().lean();
  return resp;
};

export const updateSurvey = async (user: any, survey: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { survey: survey },
    { new: true }
  ).lean();
  return doc;
};

export const updateProfile = async (user: any, profile: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { profile: profile },
    { new: true }
  ).lean();
  return doc;
};

export const updateCrushes = async (user: any, crushes: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { crushes: crushes },
    { new: true }
  ).lean();
  return doc;
};

export const updateForbidden = async (user: any, forbidden: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { forbidden: forbidden },
    { new: true }
  ).lean();
  return doc;
};

export const updateUserOptIn = async (user: any, optIn: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { optIn: optIn },
    { new: true }
  ).lean();
  return doc;
};
