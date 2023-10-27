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
        <div className="w-full items-center px-2 py-4 sm:px-0">
            {/* General Feedback Section */}
            <div className="mt-6">
                <details className="text-gray-600 border rounded-md p-4">
                    <summary className="cursor-pointer mb-2">General Feedback (Click to expand)</summary>
                    {/* Feedback content */}
                    <div className="space-y-4">
                        {/* Category Ranking */}
                        <div>
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
                        <div>
                            <label htmlFor="surveyFeedback">Feedback about current survey questions:</label>
                            <textarea
                                id="surveyFeedback"
                                rows={4}
                                value={feedback.surveyFeedback}
                                onChange={(e) => setFeedback({ ...feedback, surveyFeedback: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                            ></textarea>
                        </div>

                        {/* Valentine's Day Impact */}
                        <div>
                            <label htmlFor="valentinesDayImpact">
                                How did Valentine&apos;s Day impact your experience?
                            </label>
                            <input
                                type="text"
                                id="valentinesDayImpact"
                                value={feedback.valentinesDayImpact.join(',')}
                                onChange={(e) =>
                                    setFeedback({ ...feedback, valentinesDayImpact: e.target.value.split(',') })
                                }
                                className="w-full p-2 mt-2 border rounded-md"
                                placeholder="E.g.: 1,2,3,4"
                            />
                        </div>

                        {/* Other Valentine's Day Impact */}
                        <div>
                            <label htmlFor="otherValentinesDayImpact">Other Valentine&apos;s Day Impact:</label>
                            <textarea
                                id="otherValentinesDayImpact"
                                rows={4}
                                value={feedback.otherValentinesDayImpact}
                                onChange={(e) => setFeedback({ ...feedback, otherValentinesDayImpact: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                            ></textarea>
                        </div>

                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </details>
            </div>
            <Matches matches={user.matchReviews} userId={user._id} refresh={props.refresh} />
        </div>
    );
}

export default ProfileTabs;
