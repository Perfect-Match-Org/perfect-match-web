export type User = {
    _id: string;
    optIn: boolean;
    email: string;
    profile: Profile;
    survey: Survey;
    matches: Matches[];
    matchReviews: MatchReview[];
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

export type Review = {
    rating: number;
    comment: string;
};

export type MatchReview = {
    _id: string;
    partnerAId: Matches;
    partnerBId: Matches;
    partnerAReview: Review;
    partnerBReview: Review;
};
