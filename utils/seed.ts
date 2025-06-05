import { connect } from '@/database';
import ReviewModel from '@/models/review';

// Reviews data to seed - taken from testimonials.tsx
const fakeReviews = [
    {
        title: 'I found my soulmate!',
        body: "I never believed in online dating until I met her on Perfect Match. We clicked instantly and now we're planning our wedding!",
        author: 'HopelessRomantic23',
    },
    {
        title: 'Love at first swipe!',
        body: "I thought it was all just a game, but Perfect Match made me realize that true love can be found with the right person. I'm engaged now!",
        author: 'LoveIsReal',
    },
    {
        title: 'Perfect match, perfect life.',
        body: "I've been using dating apps for years, but I never met someone like him. Thanks to Perfect Match, I finally found my other half.",
        author: 'LookingForMyPerson',
    },
    {
        title: 'The one I was waiting for!',
        body: "After a few weeks on Perfect Match, I met the person I had been dreaming about. We share everything in common and can't wait for the future together!",
        author: 'MatchMadeInHeaven',
    },
    {
        title: 'Changed my life.',
        body: "Perfect Match helped me find love when I wasn't even looking for it. I feel like I've known my partner for a lifetime!",
        author: 'UnexpectedlyHappy',
    },
    {
        title: "I didn't think it was possible!",
        body: "We met on Perfect Match, and from the first date, I knew we were meant to be. It's crazy how fast everything clicked!",
        author: 'SoulmateFinder',
    },
    {
        title: 'True love exists!',
        body: "I never thought I would find someone who understands me so completely. Thanks to Perfect Match, I now have the love of my life!",
        author: 'EverAfterDreamer',
    },
    {
        title: 'A fairytale come true.',
        body: "Perfect Match turned my doubts into faith. We've been inseparable since we met and our relationship is everything I've ever wanted.",
        author: 'FairytaleRomance',
    },
    {
        title: 'Found my forever!',
        body: "We both swiped right at the same time and now we're planning our future together. I never thought I'd find someone so perfect!",
        author: 'HappilyEverAfter',
    },
    {
        title: 'A new beginning.',
        body: "I had given up on finding true love until I found her on Perfect Match. Now, we're inseparable and have a love I never thought possible.",
        author: 'LoveRestored',
    },
    {
        title: 'The perfect person for me.',
        body: "We started talking on Perfect Match and instantly hit it off. I feel like I've known them forever. Thank you for making my dreams come true!",
        author: 'DreamCouple',
    },
    {
        title: 'Love is real, and so is Perfect Match.',
        body: "I was skeptical at first, but I've never been more grateful for giving Perfect Match a try. I found my one and only.",
        author: 'HeartfeltConnection',
    },
    {
        title: 'Finally met the one.',
        body: "I was ready to give up on dating until I met him on Perfect Match. It feels like everything just fell into place!",
        author: 'DestinedForYou',
    },
];

/**
 * Seeds the database with fake review data.
 * This function will create approved reviews that can be displayed in the testimonials section.
 * 
 * @param clearExisting - Whether to clear existing approved reviews before seeding (default: false)
 * @returns Promise<void>
 */
export async function seedReviews(clearExisting: boolean = false): Promise<void> {
    try {
        await connect();

        if (clearExisting) {
            console.log('🗑️ Clearing existing approved reviews...');
            await ReviewModel.deleteMany({ status: 'approved' });
            console.log('✅ Existing approved reviews cleared');
        }

        console.log('📝 Seeding reviews...');

        // Create reviews with approved status
        const reviewsToInsert = fakeReviews.map(review => ({
            ...review,
            status: 'approved' as const,
        }));

        const insertedReviews = await ReviewModel.insertMany(reviewsToInsert);

        console.log(`✅ Successfully seeded ${insertedReviews.length} reviews to the database`);
        console.log('📋 Seeded reviews:');
        insertedReviews.forEach((review, index) => {
            console.log(`   ${index + 1}. "${review.title}" by ${review.author}`);
        });

    } catch (error) {
        console.error('❌ Error seeding reviews:', error);
        throw error;
    }
}

/**
 * Clears all approved reviews from the database.
 * Useful for resetting the testimonials section.
 * 
 * @returns Promise<void>
 */
export async function clearApprovedReviews(): Promise<void> {
    try {
        console.log('🔌 Connecting to database...');
        await connect();

        console.log('🗑️ Clearing all approved reviews...');
        const result = await ReviewModel.deleteMany({ status: 'approved' });

        console.log(`✅ Successfully cleared ${result.deletedCount} approved reviews`);

    } catch (error) {
        console.error('❌ Error clearing reviews:', error);
        throw error;
    }
}

/**
 * Gets the count of approved reviews in the database.
 * 
 * @returns Promise<number>
 */
export async function getApprovedReviewsCount(): Promise<number> {
    try {
        await connect();
        const count = await ReviewModel.countDocuments({ status: 'approved' });
        return count;
    } catch (error) {
        console.error('❌ Error getting approved reviews count:', error);
        throw error;
    }
}

// Export the reviews data in case it's needed elsewhere
export { fakeReviews };

// If this file is run directly, seed the reviews
if (require.main === module) {
    seedReviews()
        .then(() => {
            console.log('🎉 Seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seeding failed:', error);
            process.exit(1);
        });
}
