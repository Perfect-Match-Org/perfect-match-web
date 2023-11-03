import { Tab } from '@headlessui/react';
import Status from './status';
import SurveyComponent from './survey';
import ProfileComponent from './profile-section';
import Crushes from './crushes';
import Matches from './matches';
import { useRouter } from 'next/router';
import { useState, DragEvent } from 'react';
import { ISurveyFeedback } from '../../database/models';

const MapRankDescription: Record<string, string> = {
    Interest: 'Personal interests (shared hobbies etc.)',
    Lifestyle: 'Lifestyle (work/life balance, drinking habits etc.)',
    Beliefs: 'Core values and beliefs (religious beliefs, political views etc.)',
    Goal: 'Long-term goals (careers, academic paths etc.)',
    Vibe: 'Overall vibes (personalities etc.)',
};

interface DraggableListProps {
    initialItems: string[];
    onRankChange: (newRankings: { [key: number]: string }) => void;
}

interface DraggableItemProps {
    item: string;
    index: number;
    onDragStart: (index: number) => void;
    onDragOver: (index: number) => void;
    onDragEnd: () => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, onDragStart, onDragOver, onDragEnd }) => (
    <div
        draggable
        onDragStart={() => onDragStart(index)}
        onDragOver={(e: DragEvent) => {
            e.preventDefault();
            onDragOver(index);
        }}
        onDragEnd={onDragEnd}
        className="flex relative mb-3 cursor-move border border-gray-400 rounded-md h-10 sm:h-12"
    >
        <label htmlFor={item} className="absolute left-3 mt-2.5">
            {index + 1}. {MapRankDescription[item]}
        </label>
    </div>
);

const DraggableList: React.FC<DraggableListProps> = ({ initialItems, onRankChange }) => {
    const [items, setItems] = useState<string[]>(initialItems);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const onDragStart = (index: number) => {
        setDraggedItem(items[index]);
    };

    const onDragOver = (index: number) => {
        if (draggedItem === null) return;
        const newItems = items.filter((item) => item !== draggedItem);
        newItems.splice(index, 0, draggedItem);
        setItems(newItems);
    };

    const onDragEnd = () => {
        const newRankings = items.reduce<{ [key: number]: string }>((acc, item, index) => {
            acc[index + 1] = item;
            return acc;
        }, {});
        onRankChange(newRankings);
        setDraggedItem(null);
    };

    return (
        <div className="pt-4 ">
            {items.map((item, index) => (
                <DraggableItem
                    key={item}
                    item={item}
                    index={index}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnd={onDragEnd}
                />
            ))}
        </div>
    );
};

function ProfileTabs(props: any) {
    const router = useRouter();
    const user = props.user;

    const [feedback, setFeedback] = useState<ISurveyFeedback>({
        surveyFeedback: props.user?.feedback?.surveyFeedback || '',
        otherValentinesDayImpact: props.user?.feedback?.otherValentinesDayImpact || '',
        comments: props.user?.feedback?.comments || '',
        categoryRanking: props.user?.feedback?.categoryRanking || ['Interest', 'Lifestyle', 'Beliefs', 'Goal', 'Vibe'],
        anticipation: props.user?.feedback?.anticipation || false,
        memories: props.user?.feedback?.memories || false,
        joy: props.user?.feedback?.joy || false,
        fun: props.user?.feedback?.fun || false,
        opportunities: props.user?.feedback?.opportunities || false,
        bad: props.user?.feedback?.bad || false,
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
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedback),
            });
            if (response.ok) props.refresh();
            else console.error('Failed to submit feedback');
        } catch (error) {
            console.error('There was an error updating the feedback:', error);
        }
    };

    const handleRankChange = (newRankings: { [key: number]: string }) => {
        setFeedback({ ...feedback, categoryRanking: Object.values(newRankings) });
    };

    return (
        <div className="w-full items-center">
            {/* General Feedback Section */}
            <div className="my-14 mx-[2%] sm:mx-[15%] lg:mx-[22%] text-sm sm:text-base">
                <details className="text-gray-500 border rounded-lg">
                    <summary className="text-lg cursor-pointer my-4 text-center text-rose-400 font-extrabold sm:text-xl">
                        General Feedback (Click to expand)📝
                    </summary>
                    {/* Feedback content */}
                    <div className="pt-4 pb-6 sm:px-6 px-3">
                        {/* Category Ranking */}
                        <p className="mb-4">
                            1. Rank the following categories by importance in matching (topmost is most important)
                        </p>
                        <DraggableList initialItems={feedback.categoryRanking} onRankChange={handleRankChange} />

                        {/* Survey Feedback */}
                        <div className="my-14">
                            <label htmlFor="surveyFeedback">
                                2. Provide any feedback on the 2023 Perfect Match survey questions:
                            </label>
                            <textarea
                                id="surveyFeedback"
                                rows={4}
                                value={feedback.surveyFeedback}
                                onChange={(e) => setFeedback({ ...feedback, surveyFeedback: e.target.value })}
                                className="w-full bg-white p-2 mt-4 border rounded-md"
                                placeholder="Remove certain questions, add new questions..."
                            ></textarea>
                        </div>

                        {/* Valentine's Day Impact */}
                        <fieldset>
                            <legend className="mb-4">
                                3. What did Perfect Match add to your last Valentine&#39;s Day💖? Choose one or more.
                            </legend>

                            <div className="relative flex mb-3">
                                <label htmlFor="anticipation" className="absolute left-9">
                                    A sense of anticipation and excitement.
                                </label>
                                <input
                                    type="checkbox"
                                    id="anticipation"
                                    checked={feedback.anticipation}
                                    onChange={(e) => setFeedback({ ...feedback, anticipation: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="memories" className="absolute left-9">
                                    Memorable and personalized experiences.
                                </label>
                                <input
                                    type="checkbox"
                                    id="memories"
                                    checked={feedback.memories}
                                    onChange={(e) => setFeedback({ ...feedback, memories: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>

                            <div className="relative flex sm:mb-3 mb-7">
                                <label htmlFor="joy" className="absolute left-9">
                                    The joy of meeting like-minded people on campus.
                                </label>
                                <input
                                    type="checkbox"
                                    id="joy"
                                    checked={feedback.joy}
                                    onChange={(e) => setFeedback({ ...feedback, joy: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="fun" className="absolute left-9">
                                    Fun and surprises.
                                </label>
                                <input
                                    type="checkbox"
                                    id="fun"
                                    checked={feedback.fun}
                                    onChange={(e) => setFeedback({ ...feedback, fun: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>

                            <div className="relative flex sm:mb-3 mb-7">
                                <label htmlFor="opportunities" className="absolute left-9">
                                    The opportunity to explore new activities and interests.
                                </label>
                                <input
                                    type="checkbox"
                                    id="opportunities"
                                    checked={feedback.opportunities}
                                    onChange={(e) => setFeedback({ ...feedback, opportunities: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>

                            <div className="relative flex mb-3">
                                <label htmlFor="bad" className="absolute left-9">
                                    Something bad, unfortunately.
                                </label>
                                <input
                                    type="checkbox"
                                    id="bad"
                                    checked={feedback.bad}
                                    onChange={(e) => setFeedback({ ...feedback, bad: e.target.checked })}
                                    className="ml-1 w-5 h-5 sm:mt-0.5 cursor-pointer"
                                />
                            </div>
                        </fieldset>

                        {/* Other Valentine's Day Impact */}
                        <div>
                            <label htmlFor="otherValentinesDayImpact" className="ml-9">
                                Other:
                            </label>
                            <input
                                type="text"
                                id="otherValentinesDayImpact"
                                value={feedback.otherValentinesDayImpact}
                                onChange={(e) => setFeedback({ ...feedback, otherValentinesDayImpact: e.target.value })}
                                className="sm:w-96 bg-white w-80 p-2 border rounded-md h-6 sm:ml-2 sm:mt-0 mt-2 ml-9"
                            ></input>
                        </div>

                        <div className="mt-14">
                            <label htmlFor="comments">4. Leave comments about any aspects of Perfect Match:</label>
                            <textarea
                                id="comments"
                                rows={4}
                                value={feedback.comments}
                                onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                                className="w-full p-2 mt-2 border rounded-md bg-white"
                                placeholder="Matching algorithms, new features, survey result visualizations..."
                            ></textarea>
                        </div>
                        <div className="mb-16 mt-4">
                            <button
                                className="float-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleFeedbackSubmit}
                            >
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
