const Status: any = (props: any) => {
    const handleClick = async () => {
        await fetch(`/api/optIn`, {
            method: 'POST',
            body: JSON.stringify({ optIn: !props.optIn }),
        }).then((resp) => props.refresh());
    };

    return (
        <div>
            <div className="px-4 sm:py-20 bg-lightblue">
                <div className="fle max-w-6xl mx-auto text-gray-600">
                    <dl className="w-full md:w-full">
                        <h2 className="pt-12 pb-6 w-full sm:py-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
                            Status
                        </h2>
                        <p className={props?.optIn ? 'mb-4 font-bold text-green-500' : 'mb-4 font-bold text-red-400'}>
                            {props?.optIn ? 'You have opted In!' : 'We are still waiting for you to opt In.'}
                        </p>
                        <p
                            className={
                                props?.surveyComplete ? 'mb-4 font-bold text-green-500' : 'mb-4 font-bold text-red-400'
                            }
                        >
                            {props?.surveyComplete
                                ? 'You have completed the survey!'
                                : 'We are still waiting for you to complete the survey.'}
                        </p>
                        <p
                            className={
                                props?.profileComplete ? 'mb-4 font-bold text-green-500' : 'mb-4 font-bold text-red-400'
                            }
                        >
                            {props?.profileComplete
                                ? 'You have completed your profile!'
                                : 'We are still waiting for you to complete your profile.'}
                        </p>
                        <p className="mb-8 font-bold text-green-500">
                            {props?.surveyComplete &&
                                props?.profileComplete &&
                                props?.optIn &&
                                'You have completed all the steps! Matchmaking will begin soon🎉🥳!'}
                        </p>
                        <dt className="mb-4">
                            <h3 className="text-xl font-semibold">❗Tasks❗</h3>
                        </dt>
                        <ol className="mb-8 list-decimal list-inside">
                            Please complete all required steps to be included to this year&apos;s matching.
                            <li>
                                &#91;Required&#93;<strong> Opt In</strong> &#40;right below&#41; to indicate you are
                                interested in participating.
                            </li>
                            <li>
                                &#91;Required&#93; Complete your <strong>profile</strong> to tell us and your matches
                                about you.
                            </li>
                            <li>
                                &#91;Required&#93; Complete the <strong>survey</strong>. It will take 10~15 minutes.
                            </li>
                            <li>&#91;Optional&#93; Input your crushes/forbidden matches if you&apos;d like. <strong className="text-rose-400">❗PM2024 Special: Nudge your crush with an anonymous email!❗</strong></li>
                        </ol>
                        <dt className="mb-4">
                            <h3 className="text-xl font-semibold">Opt-Out</h3>
                        </dt>
                        <dd className="mb-8">
                            <section id="opt" className={props.optIn ? 'text-green-500' : 'text-red-400'}>
                                <p>
                                    {props.optIn
                                        ? 'You are currently opted-in to our 2024 matching process.'
                                        : 'You are currently opted-out to our 2024 matching process.'}
                                </p>
                            </section>

                            <button
                                onClick={handleClick}
                                className={`mt-2 bg-transparent hover:bg-rose-500 font-semibold hover:text-white py-1 px-2 border hover:border-transparent rounded ${props.optIn ? 'border-rose-500 text-rose-700' : 'border-green-500 text-green-700'
                                    }`}
                            >
                                {props.optIn ? 'Opt-Out' : 'Opt-In'}
                            </button>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Status;
