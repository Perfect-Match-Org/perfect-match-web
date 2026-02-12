import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Review } from '../../types/users';
import Iframe from 'react-iframe';
import Button from '@/components/general/button';
import Popup from '@/components/general/popup';
import Image from 'next/image';
import Link from 'next/link';


const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳', '🤗'];
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

function maskText(text: string): string {
    return text.split('').map(char => char === ' ' ? ' ' : char === ',' ? ',' : '♥').join('');
}

const SurveyGreenFlag = (greenFlag: string) => {
    switch (greenFlag) {
        case 'gcaldate':
            return 'Sends me a GCal invite for the date';
        case 'petlike':
            return 'My pet likes them';
        case 'screentime':
            return 'Has a low screen time';
        case 'smellsgood':
            return 'Smells good';
        case 'gymrat':
            return 'Goes to the gym';
        case 'kids':
            return 'Is good with kids';
        case 'gpa':
            return 'Has a 4.0 gpa';
        default:
            return '';
    }
};

function MatchTile({ matchID, matchData, contact, matchFeedback, refresh, mutualCrush, superMatch, platonic, matchPoked }: any) {
    const matchEmoji = useMemo(() => {
        return emoji[Math.floor(Math.random() * emoji.length)];
    }, []);

    // Function to render the play button or emoji for the hookupsong
    const renderSongSection = () => {
        if (matchData.survey.hookupsongURL) {
            const spotifyID = matchData.survey.hookupsongURL.url.split('/')[4];
            const spotifyURL = `https://open.spotify.com/embed/track/${spotifyID}?utm_source=generator&theme=0`;
            return (
                <div>
                    <p className="mb-3 sm:mb-3 text-gray-500">
                        <button
                            onClick={() => window.open(matchData.survey.hookupsongURL.url, '_blank')}
                            className="font-bold"
                        >
                            <Iframe
                                url={spotifyURL}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                styles={{
                                    border: 'none',
                                    maxHeight: '80px',
                                    borderRadius: '13px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    margin: '7px 0px',
                                    width: '320px',
                                }}
                            ></Iframe>
                        </button>
                    </p>
                </div>
            );
        }
    };

    const [showBack, setShowBack] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = React.createRef<HTMLButtonElement>();
    const [poked, setPoked] = useState(matchPoked);
    // number of fields exists: insta, phone, snapchat, linkedin, email, fb, other, wechat = displayCount
    const safeContact = contact ?? {};
    var displayCount = 0;
    if (safeContact.insta) displayCount++;
    if (safeContact.phone) displayCount++;
    if (safeContact.snapchat) displayCount++;
    if (safeContact.linkedin) displayCount++;
    if (safeContact.email) displayCount++;
    if (safeContact.fb) displayCount++;
    if (safeContact.other) displayCount++;
    if (safeContact.wechat) displayCount++;

    const handleFlip = (): void => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return;
        }
        setShowPopup(false);
        setShowBack(!showBack);
    }

    const handlePop = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        setShowPopup(!showPopup);
    }

    const handlePoke = (): void => {
        fetch(`/api/poke/`, {
            method: 'POST',
            body: JSON.stringify({ matchEmail: matchData.email }),
        }).then((res) => {
            if (!res.ok) alert('Failed to poke match. Please try again later or contact us for help.');
            else setPoked(true);
            setShowPopup(false);
        });
    }

    return (
        <div className={`relative sm:w-3/4 lg:w-2/3 lg:max-w-3xl mx-[2%] sm:mx-auto perspective-400
        transform-3d transition-transform duration-1000 ease-in-out
        ${showBack ? 'rotate-y-half' : 'rotate-y-0'}
        `} onClick={handleFlip}>
            {/* Front of Card  */}
            <div className={`h-full w-full absolute top-0 bottom-0 left-0 right-0
            shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25),18px_12px_0px_0px_rgba(36,67,141,1)] 
            rounded-lg border-2 border-pmblue-500
            sm:flex backface-hidden 
            ${showBack ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                <div
                    className={`flex flex-col bg-white rounded-lg mx-auto w-full h-full
                        ${mutualCrush ? 'animate-pulse-glow' : ''}
                    `}
                >
                    <div className="relative pt-6 px-5 md:px-10 w-full z-20 lg:h-[90%] md:h-3/4">
                        {mutualCrush ? (<div className="-z-10 absolute -top-[0px] -left-[0px] h-[220px] w-[220px] block pointer-events-none">
                            <Image src="/mutualcrushstamp.svg" alt="pm logo" layout='fill' priority={true} draggable='false' />
                        </div>) :
                            (superMatch && (platonic ? (
                                <div className="-z-10 absolute -top-[0px] -left-[0px] h-[220px] w-[220px] block pointer-events-none">
                                    <Image src="/supermatchstampplatonic.svg" alt="pm logo" layout='fill' priority={true} draggable='false' />
                                </div>) :
                                (<div className="-z-10 absolute -top-[0px] -left-[0px] h-[220px] w-[220px] block pointer-events-none">
                                    <Image src="/supermatchstamp.svg" alt="pm logo" layout='fill' priority={true} draggable='false' />
                                </div>)))}
                        <div className="flex justify-end items-center w-full">
                            <div className="flex justify-between w-full md:w-[65%]">
                                <div className="w-3/4 ml">
                                    <h3 className="font-dela-gothic text-center text-4xl font-bold w-full text-pmred-500">
                                        {matchData.profile.firstName}
                                    </h3>
                                </div>
                                {platonic ?
                                    (<div className="w-1/4 h-auto items-center">
                                        <Image src="/matchcardheartsplatonic.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>) :
                                    (<div className="w-1/4 h-auto items-center">
                                        <Image src="/matchcardhearts.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>)}
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row md:flex-row pt-4 al gap-4 min-h-fit justify-end items-center w-full font-work-sans text-xl font-semibold">
                            <div className="flex sm:contents w-1/2 md:w-1/4">
                                <div className="my-0 text-[120px] md:text-[170px] h-full my-10">{matchEmoji}</div>
                            </div>
                            <div className="text-pmblue-500 flex flex-col gap-2 md:w-3/4">
                                <div className="flex justify-start gap-2 flex-wrap text-sm/3 md:text-lg/6">
                                    {matchData.profile.city && (
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 22 27" fill="none">
                                                <path d="M10.6616 13.2886C11.3925 13.2886 12.0182 13.0283 12.5386 12.5079C13.0591 11.9874 13.3193 11.3617 13.3193 10.6309C13.3193 9.89999 13.0591 9.27432 12.5386 8.75385C12.0182 8.23338 11.3925 7.97314 10.6616 7.97314C9.93075 7.97314 9.30508 8.23338 8.78461 8.75385C8.26414 9.27432 8.00391 9.89999 8.00391 10.6309C8.00391 11.3617 8.26414 11.9874 8.78461 12.5079C9.30508 13.0283 9.93075 13.2886 10.6616 13.2886ZM10.6616 23.0557C13.3636 20.5751 15.368 18.3216 16.6747 16.2951C17.9814 14.2686 18.6348 12.4691 18.6348 10.8966C18.6348 8.48254 17.8651 6.50586 16.3259 4.9666C14.7866 3.42734 12.8985 2.65771 10.6616 2.65771C8.42471 2.65771 6.53663 3.42734 4.99737 4.9666C3.45811 6.50586 2.68848 8.48254 2.68848 10.8966C2.68848 12.4691 3.34183 14.2686 4.64854 16.2951C5.95525 18.3216 7.95961 20.5751 10.6616 23.0557ZM10.6616 26.5771C7.09585 23.5429 4.4326 20.7246 2.67187 18.1223C0.91113 15.5199 0.0307617 13.1114 0.0307617 10.8966C0.0307617 7.57449 1.09938 4.92785 3.23663 2.95671C5.37388 0.985569 7.84887 0 10.6616 0C13.4744 0 15.9494 0.985569 18.0866 2.95671C20.2239 4.92785 21.2925 7.57449 21.2925 10.8966C21.2925 13.1114 20.4121 15.5199 18.6514 18.1223C16.8906 20.7246 14.2274 23.5429 10.6616 26.5771Z" fill="#00438D" />
                                            </svg>
                                            <p className="ml-2 text-left">{matchData.profile.city} </p>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 23" fill="none">
                                            <path d="M4.49941 22.2881C3.43608 22.2881 2.52858 21.9123 1.77691 21.1606C1.02525 20.4089 0.649414 19.5014 0.649414 18.4381V4.13809C0.649414 3.07475 1.02525 2.16725 1.77691 1.41559C2.52858 0.663919 3.43608 0.288086 4.49941 0.288086H18.2494V16.7881C17.7911 16.7881 17.4015 16.9485 17.0807 17.2693C16.7598 17.5902 16.5994 17.9798 16.5994 18.4381C16.5994 18.8964 16.7598 19.286 17.0807 19.6068C17.4015 19.9277 17.7911 20.0881 18.2494 20.0881V22.2881H4.49941ZM2.84941 14.9456C3.10608 14.8173 3.37191 14.7256 3.64691 14.6706C3.92191 14.6156 4.20608 14.5881 4.49941 14.5881H5.04941V2.48809H4.49941C4.04108 2.48809 3.6515 2.6485 3.33066 2.96934C3.00983 3.29017 2.84941 3.67975 2.84941 4.13809V14.9456ZM7.24941 14.5881H16.0494V2.48809H7.24941V14.5881ZM4.49941 20.0881H14.7569C14.6469 19.8314 14.5598 19.5702 14.4957 19.3043C14.4315 19.0385 14.3994 18.7498 14.3994 18.4381C14.3994 18.1448 14.4269 17.8606 14.4819 17.5856C14.5369 17.3106 14.6286 17.0448 14.7569 16.7881H4.49941C4.02275 16.7881 3.62858 16.9485 3.31691 17.2693C3.00525 17.5902 2.84941 17.9798 2.84941 18.4381C2.84941 18.9148 3.00525 19.3089 3.31691 19.6206C3.62858 19.9323 4.02275 20.0881 4.49941 20.0881Z" fill="#00438D" />
                                        </svg>
                                        <p className="ml-2 text-left">{matchData.profile.year}, {matchData.profile.major?.join(', ') ?? ''} </p>
                                    </div>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 21 22" fill="none">
                                            <circle cx="8.47521" cy="8.70519" r="7.19444" stroke="#00438D" stroke-width="2.5" />
                                            <path d="M18.147 21.2C18.6352 21.6881 19.4267 21.6881 19.9148 21.2C20.403 20.7118 20.403 19.9204 19.9148 19.4322L18.147 21.2ZM12.6054 15.6583L18.147 21.2L19.9148 19.4322L14.3731 13.8905L12.6054 15.6583Z" fill="#00438D" />
                                        </svg>
                                        <p className="ml-2 text-left">{matchData.profile.relationshipType} </p>
                                    </div>
                                </div>
                                <div className="font-normal text-base/4 md:text-base/5 italic text-left">
                                    <p>
                                        &#8220; {matchData.profile.bio} &#8221;
                                    </p>
                                </div>
                                <div className="flex flex-col justify-start gap-1 text-base flex-wrap font-normal">
                                    <div className="flex items-top">
                                        <div className="mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 28 21" fill="none">
                                                <g filter="url(#filter0_d_1266_695)">
                                                    <path d="M2.96586 18.6783C1.34485 18.671 0.0366807 17.351 0.0439821 15.7299L0.098063 3.72333C0.105364 2.10233 1.42537 0.794157 3.04638 0.801459L20.7786 0.881329C23.3344 0.892841 24.6554 3.93861 22.9173 5.81243L21.0504 7.82523C20.0141 8.94246 20.0052 10.6669 21.0298 11.7948L22.8963 13.8495C24.6135 15.7399 23.2644 18.7697 20.7105 18.7582L2.96586 18.6783Z" fill="#72E16E" />
                                                    <path d="M2.97023 17.7068C1.88577 17.7019 1.0106 16.8188 1.01549 15.7343L1.06957 3.72771C1.07445 2.64325 1.95754 1.76808 3.042 1.77297L20.7742 1.85284C22.484 1.86054 23.3678 3.89817 22.2051 5.15176L20.3381 7.16456C18.9588 8.65158 18.9469 10.9468 20.3107 12.448L21.0298 11.7948L20.3107 12.448L22.1772 14.5028C23.326 15.7674 22.4234 17.7944 20.7149 17.7867L2.97023 17.7068Z" stroke="#00438D" stroke-width="1.94303" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_1266_695" x="0.0439453" y="0.801758" width="25.6621" height="19.9561" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dx="2" dy="2" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.262975 0 0 0 0 0.554769 0 0 0 1 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1266_695" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1266_695" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </div>
                                        {matchData.profile.greenFlag ? (
                                            <div className="w-full">
                                                <p className="ml-2 text-left text-base/5 md:text-lg/6">My green flag: <strong>{matchData.profile.greenFlag ?? ''}</strong> </p>
                                            </div>
                                        ) : (<div className="w-full">
                                            <p className="ml-2 text-left text-base/5 md:text-lg/6">My green flag: <strong>{matchData.survey.greenflag ?? ''}</strong> </p>
                                        </div>)}
                                    </div>
                                    <div className="flex items-top">
                                        <div className="mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 28 21" fill="none">
                                                <g filter="url(#filter0_d_1266_699)">
                                                    <path d="M2.96586 18.6783C1.34485 18.671 0.0366807 17.351 0.0439821 15.7299L0.098063 3.72333C0.105364 2.10233 1.42537 0.794157 3.04638 0.801459L20.7786 0.881329C23.3344 0.892841 24.6554 3.93861 22.9173 5.81243L21.0504 7.82523C20.0141 8.94246 20.0052 10.6669 21.0298 11.7948L22.8963 13.8495C24.6135 15.7399 23.2644 18.7697 20.7105 18.7582L2.96586 18.6783Z" fill="#BB5EED" />
                                                    <path d="M2.97023 17.7068C1.88577 17.7019 1.0106 16.8188 1.01549 15.7343L1.06957 3.72771C1.07445 2.64325 1.95754 1.76808 3.042 1.77297L20.7742 1.85284C22.484 1.86054 23.3678 3.89817 22.2051 5.15176L20.3381 7.16456C18.9588 8.65158 18.9469 10.9468 20.3107 12.448L21.0298 11.7948L20.3107 12.448L22.1772 14.5028C23.326 15.7674 22.4234 17.7944 20.7149 17.7867L2.97023 17.7068Z" stroke="#00438D" stroke-width="1.94303" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_1266_699" x="0.0439453" y="0.801758" width="25.6621" height="19.9561" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dx="2" dy="2" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.262975 0 0 0 0 0.554769 0 0 0 1 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1266_699" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1266_699" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <p className="ml-2 text-left text-base/5 md:text-lg/6">My guilty pleasure: <strong>{matchData.profile.guiltyPleasure}</strong> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {mutualCrush ? (<div className="w-full h-auto z-20 lg:mt-0 mt-2">
                        <Image src="/mutualcrushstripe.svg" alt="mutual crush" height={40} width={913} loading='lazy' draggable='false' />
                    </div>) : (superMatch ? (platonic ? (<div className="w-full h-auto mt-4 z-20">
                        <Image src="/supermatchstripeplatonic.svg" alt="platonic super match" height={40} width={913} loading='lazy' draggable='false' />
                    </div>) :
                        (<div className="w-full h-auto mt-4 z-20">
                            <Image src="/supermatchstripe.svg" alt="super match" height={40} width={913} loading='lazy' draggable='false' />
                        </div>))
                        : (platonic ? (<hr className="z-10 mt-6 mb-2 border-pmorange-500 border-8"></hr>) :
                            (<hr className="z-10 mt-6 mb-2 border-pmpink2-500 border-8"></hr>)))}

                    <div className="z-10 mx-6 relative rounded-md w-auto mb-5 h-auto mt-3 px-6 py-3 font-work-sans text-sm md:text-lg font-semibold text-pmblue-500 bg-pmpink-500">
                        <div className="absolute -top-[120px] -z-20 -right-[20px] h-[150px] w-[220px] block pointer-events-none">
                            <Image src="/matchcardpmlogo.svg" alt="pm logo" layout='fill' priority={true} draggable='false' />
                        </div>
                        <p className="text-left">Interests: <span style={{ color: '#F4001F' }}>{matchData.survey.interests?.join(', ') ?? ''}</span></p>
                        <p className="text-left">Looking For: <span style={{ color: '#F4001F' }}>{matchData.profile.relationshipType}</span></p>
                    </div>
                </div>
            </div >

            {/* Back of Card  */}

            <div className={`h-full w-full absolute top-0 bottom-0 left-0 right-0
            shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25),18px_12px_0px_0px_rgba(36,67,141,1)] 
            rounded-lg border-2 border-pmblue-500 rotate-y-half
            sm:flex backface-hidden 
            ${showBack ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    className={`flex flex-col bg-white rounded-lg mx-auto w-full h-full
                        ${mutualCrush ? 'animate-pulse-glow' : ''}
                    `}
                >
                    <div className=" pt-6 w-full z-10 h-1/4">
                        <div className="px-10">
                            {/* <p className="text-gray-500">
                        📚 {matchData.profile.year.charAt(0).toUpperCase() + matchData.profile.year.slice(1)},{' '}
                        {matchData.profile.major.charAt(0).toUpperCase() + matchData.profile.major.slice(1)}
                    </p> */}
                            <div className=" flex justify-center items-center w-full">
                                {platonic ?
                                    (<div className="w-fit h-auto items-center">
                                        <Image src="/matchcardheartsplatonic.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>) :
                                    (<div className="w-fit h-auto items-center">
                                        <Image src="/matchcardhearts.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>)}
                                <div className="w-full">
                                    <h3 className="font-dela-gothic text-center text-4xl font-bold w-full text-pmred-500">
                                        {matchData.profile.firstName}
                                    </h3>
                                </div>
                                {platonic ?
                                    (<div className="w-fit h-auto items-center">
                                        <Image src="/matchcardheartsplatonic.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>) :
                                    (<div className="w-fit h-auto items-center">
                                        <Image src="/matchcardhearts.svg" alt="hearts" height={35} width={130} loading='lazy' draggable='false' />
                                    </div>)}
                            </div>
                        </div>
                        <div className='mt-6'>
                            {platonic ? (<div className="w-full h-auto z-10">
                                <Image src="/pokestripeplatonic.svg" alt="poke to unlock" height={60} width={913} loading='lazy' draggable='false' />
                            </div>) :
                                (<div className="w-full h-auto z-10">
                                    <Image src="/pokestripe.svg" alt="poke to unlock" height={60} width={913} loading='lazy' draggable='false' />
                                </div>)
                            }
                        </div>
                    </div>

                    <div className="py-8 px-10 w-full z-10 h-3/4">
                        <div className="flex flex-col lg:flex-row justify-start items-center w-full font-work-sans font-semibold gap-2 md:gap-8 ">
                            <div className="text-pmblue-500 flex flex-col gap-2 lg:text-xl text-base justify-start w-full">
                                {safeContact.insta && displayCount < 4 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 42 43" fill='#24438d'>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4545 5.99414C29.73 5.99414 31.9122 6.89805 33.5211 8.50701C35.1301 10.116 36.034 12.2982 36.034 14.5736V28.3007C36.034 30.5762 35.1301 32.7584 33.5211 34.3673C31.9122 35.9763 29.73 36.8802 27.4545 36.8802H13.7274C11.452 36.8802 9.26978 35.9763 7.66082 34.3673C6.05185 32.7584 5.14795 30.5762 5.14795 28.3007V14.5736C5.14795 12.2982 6.05185 10.116 7.66082 8.50701C9.26978 6.89805 11.452 5.99414 13.7274 5.99414H27.4545ZM27.4545 9.42592H13.7274C12.3622 9.42592 11.0528 9.96827 10.0875 10.9336C9.12208 11.899 8.57973 13.2084 8.57973 14.5736V28.3007C8.57973 29.666 9.12208 30.9753 10.0875 31.9407C11.0528 32.9061 12.3622 33.4484 13.7274 33.4484H27.4545C28.8198 33.4484 30.1291 32.9061 31.0945 31.9407C32.0599 30.9753 32.6022 29.666 32.6022 28.3007V14.5736C32.6022 13.2084 32.0599 11.899 31.0945 10.9336C30.1291 9.96827 28.8198 9.42592 27.4545 9.42592ZM20.591 14.5736C22.4113 14.5736 24.1571 15.2967 25.4443 16.5839C26.7314 17.8711 27.4545 19.6168 27.4545 21.4372C27.4545 23.2575 26.7314 25.0033 25.4443 26.2904C24.1571 27.5776 22.4113 28.3007 20.591 28.3007C18.7706 28.3007 17.0249 27.5776 15.7377 26.2904C14.4505 25.0033 13.7274 23.2575 13.7274 21.4372C13.7274 19.6168 14.4505 17.8711 15.7377 16.5839C17.0249 15.2967 18.7706 14.5736 20.591 14.5736ZM20.591 18.0054C19.6808 18.0054 18.8079 18.3669 18.1643 19.0105C17.5208 19.6541 17.1592 20.527 17.1592 21.4372C17.1592 22.3473 17.5208 23.2202 18.1643 23.8638C18.8079 24.5074 19.6808 24.869 20.591 24.869C21.5011 24.869 22.374 24.5074 23.0176 23.8638C23.6612 23.2202 24.0228 22.3473 24.0228 21.4372C24.0228 20.527 23.6612 19.6541 23.0176 19.0105C22.374 18.3669 21.5011 18.0054 20.591 18.0054ZM28.3125 11.9998C28.7676 11.9998 29.204 12.1805 29.5258 12.5023C29.8476 12.8241 30.0284 13.2606 30.0284 13.7157C30.0284 14.1707 29.8476 14.6072 29.5258 14.929C29.204 15.2508 28.7676 15.4315 28.3125 15.4315C27.8574 15.4315 27.421 15.2508 27.0992 14.929C26.7774 14.6072 26.5966 14.1707 26.5966 13.7157C26.5966 13.2606 26.7774 12.8241 27.0992 12.5023C27.421 12.1805 27.8574 11.9998 28.3125 11.9998Z" fill="#00438D" />
                                    </svg>
                                    <p className="ml-2 text-left">Ins: {safeContact.insta.includes('@') ? safeContact.insta : '@' + safeContact.insta} </p>
                                </div>)}
                                {safeContact.phone && displayCount < 3 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="32" viewBox="0 0 42 42" fill='#24438d'>
                                        <path d="M13.7272 5.17578C14.5852 5.17578 18.017 12.8973 18.017 13.7552C18.017 15.4711 15.4431 17.187 14.5852 18.9029C13.7272 20.6188 15.4431 22.3347 17.159 24.0506C17.8282 24.7198 20.5908 27.4824 22.3067 26.6244C24.0226 25.7665 25.7385 23.1926 27.4544 23.1926C28.3123 23.1926 36.0338 26.6244 36.0338 27.4824C36.0338 30.9142 33.46 33.488 30.8862 34.3459C28.3123 35.2039 26.5964 35.2039 23.1646 34.3459C19.7329 33.488 17.159 32.6301 12.8693 28.3403C8.57957 24.0506 7.72162 21.4768 6.86367 18.045C6.00573 14.6132 6.00573 12.8973 6.86367 10.3235C7.72162 7.74962 10.2955 5.17578 13.7272 5.17578Z" stroke="#00438D" stroke-width="3.43178" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M24.0225 12.1074C25.1549 12.6393 26.1845 13.36 27.0424 14.2351C27.8832 15.0759 28.5867 16.0883 29.1015 17.1865" stroke="#00438D" stroke-width="3.43178" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M25.7383 5.60449C28.1577 6.23937 30.3197 7.49197 32.0356 9.20787C33.7343 10.9238 34.9869 13.0686 35.6047 15.4709" stroke="#00438D" stroke-width="3.43178" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className="ml-2 text-left">Tel: {safeContact.phone} </p>
                                </div>)}
                                {safeContact.email && displayCount < 3 && (<div className="flex items-center">
                                    <svg height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg" fill='#24438d'><path d="M3.926 8.713c.645.34 9.598 5.221 9.932 5.396s.674.258 1.201.258.867-.082 1.201-.258 9.287-5.056 9.931-5.396c.24-.123.645-.346.732-.598.152-.445-.012-.615-.662-.615H3.855c-.65 0-.814.176-.662.615.088.258.492.475.732.598" /><path d="M26.701 8.977c-.48.246-4.793 3.316-7.646 5.162l4.816 5.42c.117.117.17.258.105.328-.07.064-.223.029-.346-.082l-5.777-4.875c-.873.563-1.488.949-1.594 1.008-.451.229-.768.258-1.201.258s-.75-.029-1.201-.258a55 55 0 0 1-1.594-1.008l-5.777 4.875c-.117.117-.275.152-.346.082-.07-.064-.018-.211.1-.328l4.811-5.42c-2.854-1.846-7.213-4.916-7.693-5.162-.516-.264-.545.047-.545.287v12.012c0 .545.803 1.225 1.377 1.225h21.738c.574 0 1.26-.686 1.26-1.225V9.264c0-.246.035-.551-.486-.287" /></svg>
                                    <p className="ml-2 text-left">Email: {safeContact.email} </p>
                                </div>)}
                                {safeContact.wechat && displayCount < 3 && (<div className="flex items-center">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill='#24438d'><path d="M21.502 19.525c1.524-1.105 2.498-2.738 2.498-4.554 0-3.326-3.237-6.023-7.229-6.023s-7.229 2.697-7.229 6.023c0 3.327 3.237 6.024 7.229 6.024.825 0 1.621-.117 2.36-.33l.212-.032c.139 0 .265.043.384.111l1.583.914.139.045c.133 0 .241-.108.241-.241l-.039-.176-.326-1.215-.025-.154c0-.162.08-.305.202-.392zm-12.827-17.228c-4.791 0-8.675 3.236-8.675 7.229 0 2.178 1.168 4.139 2.997 5.464.147.104.243.276.243.471l-.03.184-.391 1.458-.047.211c0 .16.13.29.289.29l.168-.054 1.899-1.097c.142-.082.293-.133.46-.133l.255.038c.886.255 1.842.397 2.832.397l.476-.012c-.188-.564-.291-1.158-.291-1.771 0-3.641 3.542-6.593 7.911-6.593l.471.012c-.653-3.453-4.24-6.094-8.567-6.094zm5.686 11.711c-.532 0-.963-.432-.963-.964 0-.533.431-.964.963-.964.533 0 .964.431.964.964 0 .532-.431.964-.964.964zm4.82 0c-.533 0-.964-.432-.964-.964 0-.533.431-.964.964-.964.532 0 .963.431.963.964 0 .532-.431.964-.963.964zm-13.398-5.639c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156zm5.783 0c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156z" /></svg>
                                    <p className="ml-2 text-left">WeCht: {safeContact.wechat} </p>
                                </div>)}
                                {safeContact.fb && displayCount < 3 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" fill='#24438d'>    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" /></svg>
                                    <p className="ml-2 text-left">Fbk: {safeContact.fb} </p>
                                </div>)}
                                {safeContact.linkedin && displayCount < 3 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" fill='#24438d'>    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" /></svg>
                                    <p className="ml-2 text-left">LIn: {safeContact.linkedin} </p>
                                </div>)}
                                {safeContact.snapchat && displayCount < 3 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" fill='#24438d'><path d="M28.064 21.047c-3.482 -0.574 -5.074 -4.181 -5.126 -4.298a1.2 1.2 0 0 0 -0.032 -0.08c-0.106 -0.211 -0.211 -0.508 -0.122 -0.719 0.152 -0.361 0.876 -0.59 1.31 -0.729 0.152 -0.049 0.298 -0.094 0.41 -0.138 1.052 -0.418 1.577 -0.961 1.566 -1.622 -0.01 -0.532 -0.418 -1.02 -1.018 -1.231a1.8 1.8 0 0 0 -0.689 -0.134c-0.164 0 -0.412 0.024 -0.651 0.134 -0.401 0.187 -0.752 0.288 -1.003 0.3a1.2 1.2 0 0 1 -0.141 -0.014l0.026 -0.412c0.118 -1.866 0.265 -4.191 -0.366 -5.604 -1.86 -4.165 -5.803 -4.488 -6.967 -4.488l-0.53 0.004c-1.163 0 -5.098 0.324 -6.954 4.486 -0.63 1.413 -0.485 3.736 -0.366 5.604l0.005 0.07 0.022 0.34c-0.26 0.047 -0.769 -0.04 -1.296 -0.286 -0.718 -0.335 -2.009 0.108 -2.187 1.045 -0.08 0.415 0.016 1.202 1.544 1.805 0.115 0.047 0.258 0.091 0.413 0.14 0.431 0.138 1.155 0.366 1.308 0.729 0.089 0.211 -0.017 0.509 -0.141 0.764 -0.066 0.152 -1.648 3.76 -5.138 4.334a0.882 0.882 0 0 0 -0.738 0.921q0.012 0.18 0.086 0.356c0.317 0.743 1.468 1.254 3.614 1.603 0.037 0.126 0.08 0.314 0.103 0.417 0.044 0.214 0.094 0.429 0.159 0.654 0.064 0.214 0.282 0.708 0.961 0.708 0.206 0 0.431 -0.044 0.673 -0.092 0.356 -0.07 0.802 -0.157 1.374 -0.157 0.318 0 0.646 0.028 0.977 0.082 0.61 0.101 1.16 0.492 1.8 0.942 0.998 0.708 2.13 1.507 3.886 1.507q0.071 0 0.138 -0.004 0.095 0.004 0.194 0.004c1.756 0 2.888 -0.802 3.888 -1.507 0.61 -0.434 1.186 -0.839 1.798 -0.942 0.33 -0.054 0.658 -0.082 0.977 -0.082 0.551 0 0.986 0.07 1.376 0.148 0.276 0.054 0.497 0.08 0.701 0.08 0.454 0 0.804 -0.26 0.93 -0.696 0.066 -0.221 0.113 -0.434 0.16 -0.65 0.019 -0.079 0.064 -0.281 0.103 -0.415 2.147 -0.349 3.298 -0.86 3.612 -1.596q0.076 -0.176 0.089 -0.366a0.882 0.882 0 0 0 -0.738 -0.916" /></svg>
                                    <p className="ml-2 text-left">Snap: {safeContact.snapchat} </p>
                                </div>)}
                                {safeContact.other && displayCount < 3 && (<div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 21 22" fill="none">
                                        <circle cx="8.47521" cy="8.70519" r="7.19444" stroke="#00438D" stroke-width="2.5" />
                                        <path d="M18.147 21.2C18.6352 21.6881 19.4267 21.6881 19.9148 21.2C20.403 20.7118 20.403 19.9204 19.9148 19.4322L18.147 21.2ZM12.6054 15.6583L18.147 21.2L19.9148 19.4322L14.3731 13.8905L12.6054 15.6583Z" fill="#00438D" />
                                    </svg>
                                    <p className="ml-2 text-left">Other: {safeContact.other} </p>
                                </div>)}
                            </div>
                            <div className=" justify-center pt-2 font-work-sans text-lg font-semibold items-center lg:min-w-[250px]">
                                <div className='flex flex-col items-center justify-center'>
                                    <Button bold={true} mt={0} onClick={handlePop} ref={buttonRef}>POKE to see more!</Button>
                                    {showPopup && (
                                        <Popup triggerRef={buttonRef} placement="top" open={showPopup} arrowHeight={35} arrowWidth={30}>
                                            <div className='max-w-[40vw] lg:max-w-[30vw] min-w-64 font-work-sans text-center text-sm md:text-base
                                            bg-pmblue-500 border border-[#ccc] p-3 rounded-3xl shadow 
                                             '>
                                                <div className='flex flex-col items-center justify-center mx-6 my-3'>
                                                    <div className='font-bold text-base md:text-xl mb-5 drop-shadow-[6px_6px_0_[pmblue-500]]'>👉 WHAT&apos;S A POKE 👈</div>
                                                    <div>By poking your match, we&apos;ll send an email letting them know you&apos;re curious about them 👀
                                                        <br />
                                                        <br />
                                                        In return, you unlock the locked info about your match! Note this is not anonymous,
                                                        meaning if you chose to poke a match, they will know which match poked them.
                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 justify-center mt-5'>
                                                        <Button bold={true} mt={5} onClick={handlePoke}>Poke My Match!</Button>
                                                        <Button bold={true} mt={5} >Go Back</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup>
                                    )}
                                </div>
                                <div>
                                    <p className="mt-2 text-pmpink2-500 text-xs text-center">*note: poking is <u>not</u> anonymous</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-md w-auto mb-5 h-auto mt-3 px-6 py-3 font-work-sans text-sm md:text-lg font-semibold text-pmblue-500 bg-pmpink-500 ">
                            {!poked && <div className="absolute top-0 right-[40px] h-[100px] w-[90px] hidden lg:block pointer-events-none">
                                <Image src="/pokelock.svg" alt="pm logo" layout='fill' priority={true} draggable='false' />
                            </div>}
                            <p className="text-left">My Sense of Humor is: {poked ? (<span style={{ color: '#F4001F' }}>{matchData.survey.humor?.join(', ') ?? ''}</span>) : (<span className="select-none" style={{ color: '#F4001F', filter: 'blur(5px)' }}>{maskText(matchData.survey.humor?.join(', ') ?? '')}</span>)}</p>
                            <p className="text-left">Where I would go on a first date: {poked ? (<span style={{ color: '#F4001F' }}>{matchData.survey.date}</span>) : (<span className="select-none" style={{ color: '#F4001F', filter: 'blur(5px)' }}>{maskText(matchData.survey.date)}</span>)}</p>
                            <p className="text-left">1 = Introvert, 10 = Extrovert, I&apos;m a: {poked ? (<span style={{ color: '#F4001F' }}>{matchData.survey.introvert}</span>) : (<span className="select-none" style={{ color: '#F4001F', filter: 'blur(5px)' }}>{maskText(String(matchData.survey.introvert))}</span>)}</p>
                            <p className="text-left">A green flag to me in a relationship: {poked ? (<span style={{ color: '#F4001F' }}>{SurveyGreenFlag(matchData.survey.greenflag)}</span>) : (<span className="select-none" style={{ color: '#F4001F', filter: 'blur(5px)' }}>{maskText(SurveyGreenFlag(matchData.survey.greenflag))}</span>)}</p>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
}

export default MatchTile;
