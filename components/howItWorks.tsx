import React from 'react';

const HEART = 'M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z';

const SurveyIcon = () => (
    <svg className="h-12" viewBox="0 0 14 12" shapeRendering="crispEdges" aria-hidden="true">
        <path className="fill-pmblue-500" d="M1 0h12v1H1zM1 11h12v1H1zM1 1h1v10H1zM12 1h1v10h-1zM6 3h5v1H6zM6 6h5v1H6zM6 9h5v1H6z" />
        <path className="fill-pmred-500" d="M3 2h2v2H3zM3 5h2v2H3zM3 8h2v2H3z" />
    </svg>
);

const MatchingIcon = () => (
    <svg className="h-12" viewBox="0 0 12 10" shapeRendering="crispEdges" aria-hidden="true">
        <path className="fill-retropink-500" d={HEART} />
        <path className="fill-pmred-500" d={HEART} transform="translate(5 4)" />
    </svg>
);

const MatchesIcon = () => (
    <svg className="h-12" viewBox="0 0 14 10" shapeRendering="crispEdges" aria-hidden="true">
        <path className="fill-pmblue-500" d="M0 0h14v1H0zM0 9h14v1H0zM0 1h1v8H0zM13 1h1v8h-1zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM12 1h1v1h-1zM11 2h1v1h-1zM10 3h1v1h-1zM9 4h1v1H9zM8 5h1v1H8z" />
        <path className="fill-pmred-500" d="M6 5h2v2H6z" />
    </svg>
);

const STEPS = [
    {
        title: 'Fill out the survey',
        body: 'Each February, tell us about yourself and who you are hoping to meet.',
        icon: <SurveyIcon />,
    },
    {
        title: 'We do the matching',
        body: 'Our algorithm compares your answers with thousands of other Cornellians to find the people you fit best.',
        icon: <MatchingIcon />,
    },
    {
        title: 'Meet your matches',
        body: "Your matches arrive in time for Valentine's Day. Reach out and see where it goes.",
        icon: <MatchesIcon />,
    },
];

const HowItWorks: React.FC = () => {
    return (
        <section className="bg-pmpink2-500 px-6 py-14 sm:py-20" aria-labelledby="how-it-works-title">
            <h2 id="how-it-works-title" className="text-center text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-5xl">
                <span className="bg-pmblue2-800 box-decoration-clone px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3">HOW IT WORKS</span>
            </h2>
            <ol className="mt-12 lg:mt-16 mx-auto max-w-sm md:max-w-screen-lg grid gap-8 md:grid-cols-3">
                {STEPS.map((step, i) => (
                    <li
                        key={step.title}
                        className="bg-pmpink-500 rounded-3xl border-4 border-pmblue-500 p-6 shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-press-start text-sm text-white bg-[#00162F] rounded-lg px-3 py-2">{i + 1}</span>
                            {step.icon}
                        </div>
                        <h3 className="mt-6 font-dm-sans font-extrabold text-xl text-pmblue2-800">{step.title}</h3>
                        <p className="mt-2 font-work-sans text-pmblue-500 leading-relaxed">{step.body}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default HowItWorks;
