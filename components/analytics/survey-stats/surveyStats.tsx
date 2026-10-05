import React from 'react';
import { ChartPanel } from './charts';
import type { YearStats } from './types';

const SurveyStats = ({ stats }: { stats: YearStats }) => {
    const respondents = stats.respondents.toLocaleString('en-US');
    return (
        <div className="bg-pmpink-500 font-work-sans px-5 sm:px-8 pb-20">
            <div className="mx-auto max-w-screen-lg">
                <header className="pt-14 sm:pt-20 text-center">
                    <h2 className="text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-4xl">
                        <span className="bg-pmblue2-800 box-decoration-clone px-3 py-1 sm:px-4 sm:py-2 leading-[1.5]">
                            PERFECT MATCH {stats.year}
                        </span>
                    </h2>
                    <p className="mt-6 sm:text-lg text-pmblue-500 max-w-3xl mx-auto">
                        In {stats.year}, we received <strong className="text-pmred-500">{respondents}</strong> valid responses. Thank you
                        all for filling out the survey and helping spread love at Cornell! Here is a look at some of the results.
                    </p>
                </header>

                <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {stats.tiles.map((tile) => (
                        <div
                            key={tile.label}
                            className="flex flex-col-reverse justify-end rounded-2xl border-4 border-pmblue-500 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]"
                        >
                            <dt className="mt-1 text-sm text-pmblue-500">{tile.label}</dt>
                            <dd className="font-dm-sans text-2xl sm:text-3xl font-extrabold text-pmblue2-800">{tile.value}</dd>
                        </div>
                    ))}
                </dl>

                {stats.stories.map((story, i) => (
                    <section key={story.headline} className="mt-16 sm:mt-24 grid items-center gap-6 md:grid-cols-2 md:gap-14">
                        <div className={i % 2 ? 'md:order-2' : ''}>
                            <h3 className="font-dm-sans text-2xl sm:text-3xl font-extrabold leading-tight text-pmblue2-800">{story.headline}</h3>
                            {story.blurb && <p className="mt-3 font-dm-sans text-xl sm:text-2xl font-bold leading-snug text-pmblue-500">{story.blurb}</p>}
                        </div>
                        <ChartPanel chart={story.chart} />
                    </section>
                ))}

                <p className="mt-16 sm:mt-24 text-sm text-pmblue-500 max-w-2xl mx-auto text-center">
                    Percentages are rounded. Answers chosen by fewer than 10 participants are not shown. Participants who gave their
                    gender as non-binary individual or other are not included in comparisons by gender due to a small sample size.
                </p>
            </div>
        </div>
    );
};

export default SurveyStats;
