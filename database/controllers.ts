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
  const doc = await User.findOne({ email: user.email });
  return doc;
};

export const getUsers = async () => {
  const resp = await User.find();
  return resp;
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

export const updateUserProfileComplete = async () => {
  const reqFields: any[] = [
    "profile.firstName",
    "profile.lastName",
    "profile.gender",
    "profile.genderPref",
    "profile.age",
    "profile.height",
    "profile.city",
    "profile.race",
    "profile.year",
    "profile.college",
    "profile.major",
    "profile.commitment",
    "profile.relationshipType",
    "profile.agePref.youngest",
    "profile.agePref.oldest",
    "profile.activities",
    "profile.describeYourself",
    "profile.bio",
  ];
  const constraints = reqFields.map((field) => {
    return { [field]: { $exists: true, $ne: "" } };
  });

  const condition = constraints.reduce(
    (obj, item) => Object.assign(obj, item),
    {}
  );
  const users = await User.find(condition).exec();
  await User.updateMany(condition, {
    $set: { "profile.complete": true },
  }).exec();
  return users;
};
