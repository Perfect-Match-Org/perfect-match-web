import mongoose, { Schema, Document } from 'mongoose';
export interface IReview extends Document {
    id: string;
    title: string;
    body: string;
    name: string;
    author: string;
    status: 'pending' | 'approved' | 'rejected';
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

//For use in pending-reviews.
export async function getPendingReviews() {
    return await ReviewModel.find({ status: 'pending' }).sort({ createdAt: -1 });
}

//For use in testimonial.
export async function getApprovedReviews() {
    return await ReviewModel.find({ status: 'approved' }).sort({ createdAt: -1 });
}


//For use in write-review.
export async function submitReview(reviewData: IReviewData) {
    const review = new ReviewModel({
        ...reviewData,
        status: 'pending',
    });

    return await review.save();
}

//For use in pending-reviews.
export async function approveReview(id: string) {
    return await ReviewModel.findByIdAndUpdate(
        id,
        { status: 'approved', updatedAt: new Date() },
        { new: true }
    );
}

//For use in pending-reviews.
export async function rejectReview(id: string) {
    return await ReviewModel.findByIdAndUpdate(
        id,
        { status: 'rejected', updatedAt: new Date() },
        { new: true }
    );
}

export async function getReviewById(id: string) {
    return await ReviewModel.findById(id);
}

