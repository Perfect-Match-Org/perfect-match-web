import mongoose, { Schema, Document } from 'mongoose';
export interface IReview extends Document {
    id: string;
    title: string;
    body: string;
    name: string;
    author: string;
    status: 'pending' | 'approved' | 'rejected' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
}

export interface IReviewData {
    title: string;
    body: string;
    author: string;
    name?: string;
}
const ReviewSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [250, 'Title cannot be more than 250 characters'], //Prevent trolls
    },
    body: {
        type: String,
        required: [true, 'Review content is required'],
        trim: true,
        maxlength: [3000, 'Review cannot be more than 3000 characters'],
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [75, 'Author name cannot be more than 75 characters'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
}, {
    timestamps: true,
});

const ReviewModel = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;

