import { Tab } from '@headlessui/react';
import Status from './status';
import SurveyComponent from './survey';
import ProfileComponent from './profile-section';
import Crushes from './crushes';
import Matches from './matches';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ISurveyFeedback } from '../../database/models';

function ProfileTabs(props: any) {
    const router = useRouter();
    const user = props.user;

    const [feedback, setFeedback] = useState<ISurveyFeedback>({
        categoryRanking: [],
        surveyFeedback: '',
        valentinesDayImpact: [],
        otherValentinesDayImpact: '',
        anyComment: ''
    });

    const section = router.asPath.split('#')[1];
    const tabIndex: Record<string, number> = {
        status: 0,
        profile: 1,
        survey: 2,
        crushes: 3,
        matchReviews: 4,
    };

    const handleFeedbackSubmit = async () => {
        try {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, feedback }),
            });
            if (response.ok) props.refresh();
            else console.error('Failed to submit feedback');
        } catch (error) {
            console.error('There was an error updating the feedback:', error);
        }
    };

    return (
        <div className="w-full items-center">
            {/* General Feedback Section */}
            <div className="my-14 sm:mx-[15%] lg:mx-[22%]">
                <details className="text-gray-500 border rounded-lg">
                    <summary className="cursor-pointer my-4 text-center text-rose-400 font-extrabold text-xl">General Feedback (Click to expand)📝</summary>
                    {/* Feedback content */}
                    <div className="p-4">
                        {/* Category Ranking */}
                        <div className="mb-8">
                            <label htmlFor="categoryRanking">Rank the category of questions:</label>
                            <input
                                type="text"
                                id="categoryRanking"
                                value={feedback.categoryRanking.join(',')}
                                onChange={(e) =>
                                    setFeedback({ ...feedback, categoryRanking: e.target.value.split(',').map(Number) })
                                }
                                className="w-full p-2 mt-2 border rounded-md"
                                placeholder="E.g.: 1,2,3,4"
                            />
                        </div>

                        {/* Survey Feedback */}
                        <div className="mb-8">
                            <label htmlFor="surveyFeedback">Feedback on the 2023 Perfect Match survey questions:</label>
                            <textarea
                                id="surveyFeedback"
                                rows={4}
                                value={feedback.surveyFeedback}
                                onChange={(e) => setFeedback({ ...feedback, surveyFeedback: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                            ></textarea>
                        </div>

                        {/* Valentine's Day Impact */}
                        <div className="mb-8">
                            <label htmlFor="valentinesDayImpact">
                                What did Perfect Match add to your last Valentine&#39;s Day? Choose one or more.
                            </label>
                            <input
                                type="checkbox"
                                id="valentinesDayImpact"
                                value={feedback.valentinesDayImpact.join(',')}
                                onChange={(e) =>
                                    setFeedback({ ...feedback, valentinesDayImpact: e.target.value.split(',') })
                                }
                                className="w-full p-2 mt-2 border rounded-md"
                                name="A. A sense of anticipation and excitement."
                            />
                        </div>

                        {/* Other Valentine's Day Impact */}
                        <div>
                            <label htmlFor="otherValentinesDayImpact">What did Perfect Match add to your last Valentine&#39;s Day? Choose one or more.</label>
                            <textarea
                                id="otherValentinesDayImpact"
                                rows={4}
                                value={feedback.otherValentinesDayImpact}
                                onChange={(e) => setFeedback({ ...feedback, otherValentinesDayImpact: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="anyComment">Comments about any aspect of Perfect Match:</label>
                            <textarea
                                id="anyComment"
                                rows={4}
                                value={feedback.anyComment}
                                onChange={(e) => setFeedback({ ...feedback, anyComment: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                            ></textarea>
                        </div>
                        <div className="mb-16 mt-4">
                            <button className="float-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Submit
                            </button>
                        </div>
                    </div>
                </details>
            </div>
            <Matches matches={user.matchReviews} userId={user._id} refresh={props.refresh} />
        </div>
    );
}

export default ProfileTabs;
