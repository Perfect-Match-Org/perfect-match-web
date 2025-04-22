export type User = {
    _id: string;
    matchCount?: number;
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
    firstName: string;
    lastName: string;
    complete: boolean;
};
export type Survey = {
    complete: boolean;
    _id: string;
};
export type Crushes = {
    _id: string;
};
export type Forbidden = {
    _id: string;
};

export interface Matches extends User { }

export type Review = {
    overallRating: number;
    topReasonForRating: string;
    metMatch: boolean;
    numberOfDates: number;
    inRelationshipWithMatch: boolean;
    additionalComments: string;
    dateSubmitted?: Date;
};

export type MatchReview = {
    _id: string;
    partnerAId: Matches;
    partnerBId: Matches;
    partnerAFeedback: Review;
    partnerBFeedback: Review;
    overallStatus: 'pending' | 'complete' | 'partial';
    pokedA: boolean;
    pokedB: boolean;
    mutual: boolean;
    score: number;
    superMatch: boolean;
    platonic: boolean;
};
