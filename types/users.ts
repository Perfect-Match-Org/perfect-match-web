export type User = {
  _id: string;
  profile: Profile;
  survey: Survey;
  matches: Matches[];
  crushes: Crushes[];
  forbidden: Forbidden[];
};
export type Profile = {
  _id: string;
};
export type Survey = {
  _id: string;
};
export type Crushes = {
  _id: string;
};
export type Forbidden = {
  _id: string;
};
export type Matches = {
  _id: string;
};
