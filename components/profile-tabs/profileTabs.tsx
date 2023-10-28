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
        surveyFeedback: '',
        otherValentinesDayImpact: '',
        anyComment: '',
        categoryInterest: [],
        categoryLifestyle: [],
        categoryBeliefs: [],
        categoryGoal: [],
        categoryVibe: [],
        addAnticipation: undefined,
        addMemories: undefined,
        addJoy: undefined,
        addFun: undefined,
        addOpportunities: undefined,
        addBad: undefined,
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
            <div className="my-14 mx-[2%] sm:mx-[15%] lg:mx-[22%]">
                <details className="text-gray-500 border rounded-lg">
                    <summary className="text-lg cursor-pointer my-4 text-center text-rose-400 font-extrabold sm:text-xl">General Feedback (Click to expand)📝</summary>
                    {/* Feedback content */}
                    <div className="py-6 px-6">
                        {/* Category Ranking */}
                        <p className="mb-4">1. Rank the following key categories by importance in matching (1-most important, 5-least important):</p>

                        <div className="flex relative mb-3">
                            <label htmlFor="interest" className="absolute left-16">Personal interests (shared hobbies etc.)</label>
                            <input
                                type="number"
                                id="interest"
                                min="1"
                                max="5"
                                value={feedback.categoryInterest}
                                onChange={(e) => setFeedback({ ...feedback, categoryInterest: e.target.value })}
                                className="w-14 px-2 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex relative mb-3">
                            <label htmlFor="lifestyle" className="absolute left-16">Lifestyle (work/life balance, drinking habits etc.)</label>
                            <input
                                type="number"
                                id="lifestyle"
                                min="1"
                                max="5"
                                value={feedback.categoryLifestyle}
                                onChange={(e) => setFeedback({ ...feedback, categoryLifestyle: e.target.value })}
                                className="w-14 px-2 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex relative mb-3">
                            <label htmlFor="beliefs" className="absolute left-16">Core values and beliefs (religious beliefs, political views etc.)</label>
                            <input
                                type="number"
                                id="beliefs"
                                min="1"
                                max="5"
                                value={feedback.categoryBeliefs}
                                onChange={(e) => setFeedback({ ...feedback, categoryBeliefs: e.target.value })}
                                className="w-14 px-2 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex relative mb-3">
                            <label htmlFor="goal" className="absolute left-16">Long-term goals (careers, academic paths etc.)</label>
                            <input
                                type="number"
                                id="goal"
                                min="1"
                                max="5"
                                value={feedback.categoryGoal}
                                onChange={(e) => setFeedback({ ...feedback, categoryGoal: e.target.value })}
                                className="w-14 px-2 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex relative mb-3">
                            <label htmlFor="vibe" className="absolute left-16">Overall vibes (personalities etc.)</label>
                            <input
                                type="number"
                                id="vibe"
                                min="1"
                                max="5"
                                value={feedback.categoryVibe}
                                onChange={(e) => setFeedback({ ...feedback, categoryVibe: e.target.value })}
                                className="w-14 px-2 border rounded-md text-base leading-light focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Survey Feedback */}
                        <div className="my-12">
                            <label htmlFor="surveyFeedback">2. Provide any feedback on the 2023 Perfect Match survey questions:</label>
                            <textarea
                                id="surveyFeedback"
                                rows={4}
                                value={feedback.surveyFeedback}
                                onChange={(e) => setFeedback({ ...feedback, surveyFeedback: e.target.value })}
                                className="w-full p-2 mt-4 border rounded-md"
                                placeholder='Remove certain questions, add new questions...'
                            ></textarea>
                        </div>

                        {/* Valentine's Day Impact */}
                        <fieldset>
                            <legend className="mb-4">3. What did Perfect Match add to your last Valentine&#39;s Day💖? Choose one or more.</legend>

                            <div className="relative flex mb-3">
                                <label htmlFor="anticipation" className="absolute left-9">A. A sense of anticipation and excitement.</label>
                                <input
                                    type="checkbox"
                                    id="anticipation"
                                    checked={feedback.addAnticipation}
                                    onChange={(e) => setFeedback({ ...feedback, addAnticipation: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="memories" className="absolute left-9">B. Memorable and personalized experiences.</label>
                                <input
                                    type="checkbox"
                                    id="memories"
                                    checked={feedback.addMemories}
                                    onChange={(e) => setFeedback({ ...feedback, addMemories: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="joy" className="absolute left-9">C. The joy of meeting like-minded people on campus.</label>
                                <input
                                    type="checkbox"
                                    id="joy"
                                    checked={feedback.addJoy}
                                    onChange={(e) => setFeedback({ ...feedback, addJoy: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="fun" className="absolute left-9">D. Fun and surprises.</label>
                                <input
                                    type="checkbox"
                                    id="fun"
                                    checked={feedback.addFun}
                                    onChange={(e) => setFeedback({ ...feedback, addFun: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="opportunities" className="absolute left-9">E. The opportunity to explore new activities and interests.</label>
                                <input
                                    type="checkbox"
                                    id="opportunities"
                                    checked={feedback.addOpportunities}
                                    onChange={(e) => setFeedback({ ...feedback, addOpportunities: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="bad" className="absolute left-9">F. Something bad, unfortunately.</label>
                                <input
                                    type="checkbox"
                                    id="bad"
                                    checked={feedback.addBad}
                                    onChange={(e) => setFeedback({ ...feedback, addBad: e.target.checked })}
                                    className="ml-1 w-5 h-5 mt-0.5"
                                />
                            </div>
                        </fieldset>

                        {/* Other Valentine's Day Impact */}
                        <div>
                            <label htmlFor="otherValentinesDayImpact" className="ml-9">G. Other:</label>
                            <input
                                type="text"
                                id="otherValentinesDayImpact"
                                value={feedback.otherValentinesDayImpact}
                                onChange={(e) => setFeedback({ ...feedback, otherValentinesDayImpact: e.target.value })}
                                className="w-96 p-2 border rounded-md h-6 ml-2"
                            ></input>
                        </div>

                        <div className="mt-12">
                            <label htmlFor="anyComment">4. Leave comments about any aspects of Perfect Match:</label>
                            <textarea
                                id="anyComment"
                                rows={4}
                                value={feedback.anyComment}
                                onChange={(e) => setFeedback({ ...feedback, anyComment: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md"
                                placeholder='Matching algorithms, new features, survey result visualizations...'
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
