import { ObjectId } from 'mongoose';

export type Match = {
    _id: ObjectId;
    name: String;
    email: String;
};
