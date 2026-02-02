import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import ByGenderHeight2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_height_2024';
import ByGenderRicePurity2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_rice_purity_2024';
import ByGenderNumDated2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_numDated_2024';
import ByStateRicePurity2024 from '@/components/analytics/charts-2024/d3-charts/by_state_rice_purity_2024';
import ByStateDrinkOften2024 from '@/components/analytics/charts-2024/d3-charts/by_state_drinking_2024';
import ByStatePolitics2024 from '@/components/analytics/charts-2024/d3-charts/by_state_politics_2024';
import ByGenderWhoPays2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_who_pays_2024';
import ByGenderIck2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_ick_2024';
import ByGenderGreenflag2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_greenflag_2024';
import ByCollegeSleepDuration2024 from '@/components/analytics/charts-2024/apex-charts/by_college_sleep_duration_2024';
import ByCollegeRicePurity2024 from '@/components/analytics/charts-2024/apex-charts/by_college_rice_purity_2024';
import ByCollegeSleepTime2024 from '@/components/analytics/charts-2024/apex-charts/by_college_sleep_time_2024';
import ByGenderLoveLanguage2024 from '@/components/analytics/charts-2024/apex-charts/by_gender_love_language_2024';
import ByYearNumParticipants2024 from '@/components/analytics/charts-2024/apex-charts/by_year_num_participants_2024';
import ByYearNumDated2024 from '@/components/analytics/charts-2024/apex-charts/by_year_num_dated_2024';
import ByYearRicePurity2024 from '@/components/analytics/charts-2024/apex-charts/by_year_rice_purity_2024';

const Stats2024 = () => {
    const by_state_visualizations: Record<string, JSX.Element> = {
        'What is your Rice Purity Score?': <ByStateRicePurity2024 />,
        "How 'juice head' are you?": <ByStateDrinkOften2024 />,
        'What are your political tendencies?': <ByStatePolitics2024 />,
    };

    const by_gender_visualizations: Record<string, JSX.Element> = {
        'What is your most important love language?': <ByGenderLoveLanguage2024 />,
        'What is your Rice Purity Score?': <ByGenderRicePurity2024 />,
        'Would you prefer that your match ___ on the first date?': <ByGenderWhoPays2024 />,
        'What is your biggest ick in a relationship?': <ByGenderIck2024 />,
        'What is your biggest green flag in a relationship?': <ByGenderGreenflag2024 />,
        'Your height?': <ByGenderHeight2024 />,
    };

    const by_college_visualizations: Record<string, JSX.Element> = {
        'Daily sleep duration?': <ByCollegeSleepDuration2024 />,
        'What is your Rice Purity Score?': <ByCollegeRicePurity2024 />,
        'What time do you go to bed?': <ByCollegeSleepTime2024 />,
    };

    const by_year_visualizations: Record<string, JSX.Element> = {
        'How many people have you dated in the last 5 years?': <ByYearNumDated2024 />,
        'What is your Rice Purity Score?': <ByYearRicePurity2024 />,
        'Number of participants?': <ByYearNumParticipants2024 />,
    };

    const [selectedVizState, setSelectedVizState] = useState(Object.keys(by_state_visualizations)[0]);
    const [selectedVizGender, setSelectedVizGender] = useState(Object.keys(by_gender_visualizations)[0]);
    const [selectedVizCollege, setSelectedVizCollege] = useState(Object.keys(by_college_visualizations)[0]);
    const [selectedVizYear, setSelectedVizYear] = useState(Object.keys(by_year_visualizations)[0]);

    return (
        <div className="bg-pmpink-500 font-work-sans">
            {' '}
            <Script src="https://d3js.org/d3.v7.min.js" />
            <Script src="https://d3js.org/topojson.v3.min.js" />
            <div>
                <section className="pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1 text-pmblue-500">
                    <p className="my-8 sm:lg-8 lg:my-10 sm:text-lg mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        In 2024, we received <strong className="text-pmred-500"> 3,983 </strong>
                        valid responses — representing <strong className="text-pmred-500">1/4</strong> of Cornell&#39;s
                        undergraduate student body! Thank you all for filling out the survey and helping spread love at
                        Cornell🫶! Here is a look at the results of the survey.
                    </p>
                    <hr className="border-1 border-solid border-pmpink2-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                </section>

                <section className="pt-12 sm:pt-12 lg:pt-16 sm:pb-5 pb-1">
                    <div className="text-center mt-6">
                        <label
                            htmlFor="viz-select"
                            className="text-lg font-semibold mr-4 font-dela-gothic text-pmred-500"
                        >
                            Viz by Gender:
                        </label>
                        <select
                            id="viz-select"
                            value={selectedVizGender}
                            onChange={(e) => setSelectedVizGender(e.target.value)}
                            className="border rounded-lg px-4 py-2 text-pmred-500 font-dela-gothic text-lg border-2 border-pmpink2-500"
                        >
                            {Object.keys(by_gender_visualizations).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedVizGender === 'What is your Rice Purity Score?' && (
                        <div className="text-center">
                            <p className="text-pmblue-500 sm:mx-[10%] lg:mx-[10%] mt-6">
                                The lower your score, the more &apos;corrupt&apos; or rebellious you are; the higher the
                                number, the purer you are.
                            </p>
                        </div>
                    )}

                    <div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4">
                        {by_gender_visualizations[selectedVizGender]}
                    </div>

                    <div className="text-center text-pmblue-500">
                        <p
                            style={{
                                marginTop: '-10px',
                                fontSize: '14px',
                                marginBottom: '0px',
                                fontFamily: 'Work Sans',
                            }}
                        >
                            Participants who gave their gender as non-binary individual or other are not included due to
                            small sample size.
                        </p>
                    </div>

                    <hr className="border-1 border-solid border-pmpink2-500 mx-[3%] sm:mx-[10%] lg:mx-[20%] my-20" />

                    <div className="text-center mt-6">
                        <label
                            htmlFor="viz-select"
                            className="text-lg font-semibold mr-4 font-dela-gothic text-pmred-500"
                        >
                            Viz by State:
                        </label>
                        <select
                            id="viz-select"
                            value={selectedVizState}
                            onChange={(e) => setSelectedVizState(e.target.value)}
                            className="border rounded-lg px-4 py-2 text-pmred-500 font-dela-gothic text-lg border-2 border-pmpink2-500"
                        >
                            {Object.keys(by_state_visualizations).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-2">{by_state_visualizations[selectedVizState]}</div>

                    <hr className="border-1 border-solid border-pmpink2-500 mx-[3%] sm:mx-[10%] lg:mx-[20%] my-20" />

                    <div className="text-center mt-6">
                        <label
                            htmlFor="viz-select"
                            className="text-lg font-semibold mr-4 font-dela-gothic text-pmred-500"
                        >
                            Viz by College:
                        </label>
                        <select
                            id="viz-select"
                            value={selectedVizCollege}
                            onChange={(e) => setSelectedVizCollege(e.target.value)}
                            className="border rounded-lg px-4 py-2 text-pmred-500 font-dela-gothic text-lg border-2 border-pmpink2-500"
                        >
                            {Object.keys(by_college_visualizations).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        {selectedVizCollege === 'What is your Rice Purity Score?' && (
                            <div className="text-center">
                                <p className="text-pmblue-500 sm:mx-[10%] lg:mx-[10%] mt-6">
                                    The lower your score, the more &apos;corrupt&apos; or rebellious you are; the higher
                                    the number, the purer you are.
                                </p>
                            </div>
                        )}
                        <div className="text-center text-pmblue-500">
                            <p
                                style={{
                                    marginTop: '24px',
                                    fontSize: '16px',
                                    marginBottom: '0px',
                                    fontFamily: 'Work Sans',
                                }}
                            >
                                ❗Hover over the college names below to explore the distributions❗
                            </p>
                        </div>
                    </div>
                    <div className="sm:mx-[8%] lg:mx-[16%] -mb-4 sm:my-4">
                        {by_college_visualizations[selectedVizCollege]}
                    </div>

                    <div className="text-center text-pmblue-500">
                        <p
                            style={{
                                marginTop: '-10px',
                                fontSize: '14px',
                                marginBottom: '0px',
                                fontFamily: 'Work Sans',
                            }}
                        >
                            Participants from other colleges or divisions are not included due to a small sample size.
                        </p>
                    </div>

                    <hr className="border-1 border-solid border-pmpink2-500 mx-[3%] sm:mx-[10%] lg:mx-[20%] my-20" />

                    <div className="text-center mt-6">
                        <label
                            htmlFor="viz-select"
                            className="text-lg font-semibold mr-4 font-dela-gothic text-pmred-500"
                        >
                            Viz by Year:
                        </label>
                        <select
                            id="viz-select"
                            value={selectedVizYear}
                            onChange={(e) => setSelectedVizYear(e.target.value)}
                            className="border rounded-lg px-4 py-2 text-pmred-500 font-dela-gothic text-lg border-2 border-pmpink2-500"
                        >
                            {Object.keys(by_year_visualizations).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:mx-[8%] lg:mx-[18%] -mb-4 sm:my-4">
                        {by_year_visualizations[selectedVizYear]}
                    </div>
                </section>

                <div className="bg-pmpink-500">
                    <div className="left-0 w-full relative h-[60px]">
                        <svg
                            className="absolute top-1 w-full h-[60px] z-100 md:hidden" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                fill="#f7a4af"
                            ></path>
                        </svg>
                        <svg
                            className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                fill="#f7a4af"
                            ></path>
                        </svg>
                    </div>
                </div>
                <section className="bg-pmpink2-500 pt-12 sm:pt-12 lg:pt-16 sm:pb-5 pb-1 text-pmblue-500">
                    <h2 className="mb-6 text-xl sm:text-3xl tracking-tight text-pmblue-500 mx-[3%] sm:mx-[10%] lg:mx-[20%] font-dela-gothic">
                        About Crushes 💓
                    </h2>
                    <div className="mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        <p>
                            💌 PM lets you secretly list your crush&#40;es&#41;, boosting your chances of matching with
                            them! 💘 In PM24, we introduced a fun new feature -{' '}
                            <strong className="text-pmblue-500">&quot;Nudge Your Crush&quot;</strong> - where we sent a
                            mystery love email to your crush&#40;es&#41;, letting them know someone &#40;👀&#41; had
                            listed them and encouraging them to join PM. Hope we helped spark some connections! ✨💕
                        </p>
                        <ul className="list-disc mb-8 sm:mb-12 ml-4">
                            <li className="my-3 lg:my-5 max-w-4xl">
                                <strong className="text-pmblue-500 text-xl">18.9%</strong> of you listed at least one
                                crush in your response. 💘
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl">
                                <strong className="text-pmblue-500 text-xl">47.8%</strong> of those who listed a crush
                                opted for Nudge Your Crush ✉️✨
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl">
                                <strong className="text-pmblue-500 text-xl">72</strong> pairs of crush matches were
                                made! 💞
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl">
                                <strong className="text-pmblue-500 text-xl">16</strong> mutual crushes found their
                                match! 😍💕
                            </li>
                        </ul>
                    </div>
                </section>
                <div className="bg-pmpink2-500">
                    <div className="left-0 w-full relative h-[60px]">
                        <svg
                            className="absolute top-1 w-full h-[60px] z-100 md:hidden" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                fill="#fce5f3"
                            ></path>
                        </svg>
                        <svg
                            className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                fill="#fce5f3"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>{' '}
        </div>
    );
};

export default Stats2024;
