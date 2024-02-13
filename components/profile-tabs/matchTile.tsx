import React, { useState, useMemo } from 'react';
import { Review } from '../../types/users';

const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳'];
const color = [
    'text-rose-400',
    'text-orange-400',
    'text-yellow-400',
    'text-lime-500',
    'text-emerald-400',
    'text-sky-400',
    'text-purple-400',
];

const ratingOptions = [
    'My match ghosted me',
    'My match and I were not a physical match',
    'My match and I were not a personality match',
    'I did not reach out',
    'They did not reach out',
    'We have nothing in common, but they seem cool',
    'Different majors, but could be fun to learn something new',
    'Same college - gives us something to talk about!',
    'Their class year makes them an interesting match',
    'Major heart-eyes for their music taste',
    'Their three words are a vibe, we might click',
    'They seem fun, and their profile stands out',
    'Our majors are worlds apart, but opposites attract?',
    'Their song choice is my jam, we could be in tune',
    'Feels like we’d click, their profile just clicked with me',
    'The way they describe themselves is intriguing, wanna know more',
    'Everything aligns – their college, major, and those three words',
    'Their profile is all good vibes, can’t wait to chat',
    'They sound ambitious, and their taste in music is a bonus',
    'Just my type on paper – from their major to their song choice',
    'Their description’s got depth and their song choice rocks',
    'Their profile’s a perfect pitch – right college, right year, right tune',
    'We’re in the same class year, and their profile’s class apart',
    'Their college and major are impressive, and so is their profile',
    'It’s a match! Their profile’s got personality and brains',
    'A+ profile – love the academic flair and personal touch',
];

function MatchFeedback({ matchID, matchFeedback, refresh }: any) {
    const [review, setReview] = useState<Review>({
        overallRating: matchFeedback?.overallRating || '',
        topReasonForRating: matchFeedback?.topReasonForRating || '',
        metMatch: matchFeedback?.metMatch || false,
        numberOfDates: matchFeedback?.numberOfDates || 0,
        inRelationshipWithMatch: matchFeedback?.inRelationshipWithMatch || false,
        additionalComments: matchFeedback?.additionalComments || '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const submitFeedback = async () => {
        await fetch(`/api/review/${matchID}`, {
            method: 'POST',
            body: JSON.stringify({ ...review, dateSubmitted: new Date() }),
        });
        refresh();
        setIsModalOpen(false);
    };
    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-1 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Leave Feedback
            </button>
            ;
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl mb-4 mt-2 font-extrabold text-rose-400">Match Feedback</h2>

                        {/* Feedback form */}
                        <div className="space-y-4 text-gray-500">
                            {/* Overall Rating */}
                            <div>
                                <label>
                                    On a scale of 1-10, is this match a Perfect Match? &#40;1-terrible match; 10-Perfect
                                    Match!&#41;
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={review.overallRating}
                                    onChange={(e) => setReview({ ...review, overallRating: Number(e.target.value) })}
                                    className="w-full bg-white p-2 mt-1 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>

                            {/* Top Reason for Rating */}
                            <div>
                                <label>Top Reason for Rating:</label>
                                <select
                                    autoFocus
                                    className="w-full bg-white border rounded-md overflow-hidden"
                                    value={review.topReasonForRating}
                                    onChange={(e) => setReview({ ...review, topReasonForRating: e.target.value })}
                                >
                                    {ratingOptions.map((option: string) => (
                                        <option key={option} value={option} className="bg-white">
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Met Match */}
                            <div>
                                <label className="text-gray-600">Have you met this match?</label>
                                <input
                                    className="ml-1 cursor-pointer"
                                    type="checkbox"
                                    checked={review.metMatch}
                                    onChange={(e) => setReview({ ...review, metMatch: e.target.checked })}
                                />
                            </div>

                            {/* Number of Dates */}
                            <div>
                                <label className="text-gray-600">Number of Dates:</label>
                                <input
                                    className="bg-white ml-1 pl-1"
                                    type="number"
                                    value={review.numberOfDates}
                                    onChange={(e) => setReview({ ...review, numberOfDates: Number(e.target.value) })}
                                />
                            </div>

                            {/* In Relationship with Match */}
                            <div>
                                <label className="text-gray-600">In Relationship with Match:</label>
                                <input
                                    className="ml-1 cursor-pointer"
                                    type="checkbox"
                                    checked={review.inRelationshipWithMatch}
                                    onChange={(e) =>
                                        setReview({
                                            ...review,
                                            inRelationshipWithMatch: e.target.checked,
                                        })
                                    }
                                />
                            </div>

                            {/* Additional Comments */}
                            <div>
                                <label className="text-gray-600">Additional Comments:</label>
                                <textarea
                                    value={review.additionalComments}
                                    onChange={(e) => setReview({ ...review, additionalComments: e.target.value })}
                                    className="w-full p-2 mt-1 border rounded-md bg-white"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-2 mb-2 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={submitFeedback}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MatchTile({ matchID, matchData, contact, matchFeedback, refresh }: any) {
    const matchEmoji = useMemo(() => {
        return emoji[Math.floor(Math.random() * emoji.length)];
    }, []);

    return (
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1 sm:flex">
            <div className="items-center rounded-lg shadow-xl sm:flex sm:mx-[10%] lg:mx-[20%]">
                <div className="flex sm:contents">
                    <div className="text-8xl mt-4 sm:mt-0 sm:text-9xl mx-auto sm:ml-12 sm:mr-0">{matchEmoji}</div>
                </div>
                <div className="p-3 pt-1 sm:pl-10 sm:pr-16 sm:py-5">
                    <h3 className="text-3xl font-bold font-botracking-tight text-gray-500">
                        <span className={color[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}>
                            {matchData.profile.firstName}
                        </span>
                    </h3>
                    <hr className="h-0.5 my-2 bg-rose-200 border-0"></hr>
                    <p className="text-gray-500">
                        📚 {matchData.profile.year.charAt(0).toUpperCase() + matchData.profile.year.slice(1)},{' '}
                        {matchData.profile.major.charAt(0).toUpperCase() + matchData.profile.major.slice(1)}
                    </p>
                    <p className="text-gray-500 ">📍 {matchData.profile.city}</p>
                    <p className="mt-3 sm:mt-4 mb-2 text-gray-500">
                        Three words to describe me:{' '}
                        <span className="font-bold">{matchData.profile.describeYourself.describe1}</span>,{' '}
                        <span className="font-bold">{matchData.profile.describeYourself.describe2}</span>,{' '}
                        <span className="font-bold">{matchData.profile.describeYourself.describe3}</span>
                    </p>
                    <p className="mb-3 sm:mb-3 text-gray-500">
                        First song on my hookup playlist: 🎶
                        <span className="font-bold"> {matchData.survey.hookupsong}</span>
                    </p>
                    <p className="mb-4 sm:mb-3 text-gray-500">
                        Bio: <span className="font-bold">{matchData.profile.bio}</span>
                    </p>
                    {contact.insta && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Instagram: <span className="font-bold">{contact.insta}</span>
                        </p>
                    )}
                    {contact.fb && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Facebook: <span className="font-bold">{contact.fb}</span>
                        </p>
                    )}
                    {contact.twitter && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Twitter: <span className="font-bold">{contact.twitter}</span>
                        </p>
                    )}
                    {contact.linkedin && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            LinkedIn: <span className="font-bold">{contact.linkedin}</span>
                        </p>
                    )}
                    {contact.phone && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Phone Number: <span className="font-bold">{contact.phone}</span>
                        </p>
                    )}
                    {contact.snap && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Snapchat: <span className="font-bold">{contact.snap}</span>
                        </p>
                    )}
                    {contact.other && (
                        <p className="mb-4 sm:mb-3 text-gray-500">
                            Other: <span className="font-bold">{contact.other}</span>
                        </p>
                    )}
                    {/* <MatchFeedback matchID={matchID} matchFeedback={matchFeedback} refresh={refresh} /> */}
                </div>
            </div>
        </div>
    );
}

export default MatchTile;
