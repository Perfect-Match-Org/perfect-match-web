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
    'prob some other options',
];

function MatchTile({ matchID, matchData, contact, matchFeedback, refresh }: any) {
    const [review, setReview] = useState<Review>({
        overallRating: matchFeedback?.overallRating || '',
        topReasonForRating: matchFeedback?.topReasonForRating || '',
        metMatch: matchFeedback?.metMatch || false,
        initialRatingDifference: matchFeedback?.initialRatingDifference || false,
        numberOfDates: matchFeedback?.numberOfDates || 0,
        inRelationshipWithMatch: matchFeedback?.inRelationshipWithMatch || false,
        additionalComments: matchFeedback?.additionalComments || '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const matchEmoji = useMemo(() => {
        return emoji[Math.floor(Math.random() * emoji.length)];
    }, []);

    const submitFeedback = async () => {
        await fetch(`/api/review/${matchID}`, {
            method: 'POST',
            body: JSON.stringify({ ...review, dateSubmitted: new Date() }),
        });
        refresh();
        setIsModalOpen(false);
    };

    return (
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1">
            <div className="items-center rounded-lg shadow-lg sm:flex mx-[1%] sm:mx-[6%] lg:mx-[12%]">
                <div className="flex sm:contents">
                    <div className="text-8xl mt-4 sm:mt-0 sm:text-9xl mx-auto sm:ml-12 sm:mr-0">{matchEmoji}</div>
                </div>
                <div className="p-3 pt-1 sm:pl-10 sm:pr-16 sm:py-5">
                    <h3 className="text-2xl font-bold font-botracking-tight text-gray-500">
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
                    <p className="mt-3 sm:mt-4 mb-3 text-gray-500">
                        Three words to describe me:{' '}
                        <span className="font-bold">{matchData.profile.describeYourself}</span>!
                    </p>
                    <p className="mb-3 sm:mb-4 text-gray-500">
                        First song on my hookup playlist: 🎶
                        <span className="font-bold"> {matchData.survey.hookupsong}</span>
                    </p>
                    <p className="mb-4 sm:mb-6 text-gray-500">
                        Bio: <span className="font-bold">{matchData.profile.bio}</span>
                    </p>
                    {contact.insta && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Instagram: <span className="font-bold">{contact.insta}</span>
                        </p>
                    )}
                    {contact.fb && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Facebook: <span className="font-bold">{contact.fb}</span>
                        </p>
                    )}
                    {contact.twitter && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Twitter: <span className="font-bold">{contact.twitter}</span>
                        </p>
                    )}
                    {contact.linkedin && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            LinkedIn: <span className="font-bold">{contact.linkedin}</span>
                        </p>
                    )}
                    {contact.phone && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Phone Number: <span className="font-bold">{contact.phone}</span>
                        </p>
                    )}
                    {contact.snap && (
                        <p className="mb-4 sm:mb-6 text-gray-500">
                            Snapchat: <span className="font-bold">{contact.snap}</span>
                        </p>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Leave Feedback
                    </button>
                    {isModalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-2xl mb-4 font-extrabold text-rose-400">Match Feedback</h2>

                                {/* Feedback form */}
                                <div className="space-y-4 text-gray-500">
                                    {/* Overall Rating */}
                                    <div>
                                        <label>On a scale of 1-10, is this match a Perfect Match? &#40;1-terrible match; 10-Perfect Match!&#41;</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={review.overallRating}
                                            onChange={(e) =>
                                                setReview({ ...review, overallRating: Number(e.target.value) })
                                            }
                                            className="w-full p-2 mt-1 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Top Reason for Rating */}
                                    <div>
                                        <label>Top Reason for Rating:</label>
                                        <select
                                            value={review.topReasonForRating}
                                            onChange={(e) =>
                                                setReview({ ...review, topReasonForRating: e.target.value })
                                            }
                                        >
                                            {ratingOptions.map((option: string) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Met Match */}
                                    <div>
                                        <label className="text-gray-600">Met Match:</label>
                                        <input
                                            type="checkbox"
                                            checked={review.metMatch}
                                            onChange={(e) => setReview({ ...review, metMatch: e.target.checked })}
                                        />
                                    </div>

                                    {/* Initial Rating Difference */}
                                    <div>
                                        <label className="text-gray-600">Initial Rating Difference:</label>
                                        <input
                                            type="checkbox"
                                            checked={review.initialRatingDifference}
                                            onChange={(e) =>
                                                setReview({ ...review, initialRatingDifference: e.target.checked })
                                            }
                                        />
                                    </div>

                                    {/* Number of Dates */}
                                    <div>
                                        <label className="text-gray-600">Number of Dates:</label>
                                        <input
                                            type="number"
                                            value={review.numberOfDates}
                                            onChange={(e) =>
                                                setReview({ ...review, numberOfDates: Number(e.target.value) })
                                            }
                                        />
                                    </div>

                                    {/* In Relationship with Match */}
                                    <div>
                                        <label className="text-gray-600">In Relationship with Match:</label>
                                        <input
                                            type="checkbox"
                                            checked={review.inRelationshipWithMatch}
                                            onChange={(e) =>
                                                setReview({ ...review, inRelationshipWithMatch: e.target.checked })
                                            }
                                        />
                                    </div>

                                    {/* Additional Comments */}
                                    <div>
                                        <label className="text-gray-600">Additional Comments:</label>
                                        <textarea
                                            value={review.additionalComments}
                                            onChange={(e) =>
                                                setReview({ ...review, additionalComments: e.target.value })
                                            }
                                            className="w-full p-2 mt-1 border rounded-md"
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex justify-end space-x-4">
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
            </div>
        </div>
    );
}

export default MatchTile;
