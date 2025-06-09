import { connect } from '@/database';
import ReviewModel from '@/models/review';

// Reviews data to seed - taken from testimonials.tsx
const fakeReviews = [
    {
        title: 'Amazing compatibility!',
        body: "I was skeptical about filling out another survey, but Perfect Match really works! My match and I have so much in common - we both love indie music and late-night study sessions. We've been dating for 3 months now!",
        author: 'StudyBuddy22',
    },
    {
        title: 'Found my person on campus',
        body: "The survey was pretty detailed but totally worth it. I got matched with someone from my dorm who I'd never talked to before. Turns out we're both night owls who love Korean food and hate early morning classes!",
        author: 'DormLife',
    },
    {
        title: 'Better than dating apps',
        body: "Tired of swiping through profiles, I decided to try Perfect Match. The questionnaire really dug deep into personality and values. My match and I clicked immediately - we're both introverts who love board games!",
        author: 'AntiSocialSocial',
    },
    {
        title: 'Great friendship too!',
        body: "Even though my romantic match didn't work out, I made an awesome friend through the platonic matching option. We study together all the time and she's helped me get through organic chemistry!",
        author: 'ChemStressed',
    },
    {
        title: 'Surprisingly accurate',
        body: "I didn't expect much from a school club matching service, but wow! My match and I both love hiking, hate parties, and are majoring in similar fields. We've been together for 8 months now.",
        author: 'OutdoorType',
    },
    {
        title: 'Made my college experience better',
        body: "As a transfer student, I was struggling to meet people. Perfect Match connected me with someone who shares my love for coffee shops and obscure documentaries. We're inseparable now!",
        author: 'TransferStudent',
    },
    {
        title: 'The survey really works',
        body: "I was honest about being a huge nerd who spends weekends gaming. My match turned out to be just as into RPGs as I am! We've started a D&D campaign together and it's been amazing.",
        author: 'NaturalTwenty',
    },
    {
        title: 'Honest matching works',
        body: "I put down that I'm messy, procrastinate, and love reality TV. Somehow they found someone just as chaotic as me! We're perfect for each other and our dorm room is wonderfully disorganized.",
        author: 'MessyButHappy',
    },
    {
        title: 'Great for introverts',
        body: "The survey let me express that I prefer small groups and quiet activities. My match is also an introvert and we love having movie nights and deep conversations instead of going to loud parties.",
        author: 'QuietConnection',
    },
    {
        title: 'Matched on values',
        body: "What I love most is that we were matched on important stuff - our life goals, family values, and how we handle conflict. The surface-level compatibility is just a bonus!",
        author: 'ValuesMatter',
    },
    {
        title: 'College romance done right',
        body: "Instead of random hookups, Perfect Match helped me find someone who wants the same kind of relationship I do. We take things slow and actually talk about our feelings - revolutionary for college!",
        author: 'MatureStudent',
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
