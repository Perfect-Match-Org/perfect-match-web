import { ObjectId } from 'mongoose';

export type Match = {
    _id: ObjectId;
    name: string;
    email: string;
};
