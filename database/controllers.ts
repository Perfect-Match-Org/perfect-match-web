import { User } from "../models";

export const createUser = async (user: any) => {
  const { email, name, given_name, family_name } = user;
  const newUser = new User({
    email: user.email,
    profile: { firstName: given_name, lastName: family_name, email: email },
  });
  const doc = await newUser.save().lean();
  return doc;
};

export const getUser = async (user: any) => {
  const doc = await User.findOne({ email: user.email }).lean();
  return doc;
};

export const getUsers = async () => {
  const resp = await User.find();
  return resp;
};

export const updateUser = async (user: any, survey: any) => {
  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { $set: { survey: survey } },
    { new: true }
  ).lean();
  return doc;
};
