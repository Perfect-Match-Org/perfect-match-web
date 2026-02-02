import React from 'react';
import Bar from './live-charts-2025/barTemplate';
import Pie from './live-charts-2025/pieTemplate';
import TreeMap from './live-charts-2024/treeMapTemplate';
import DescribeSelfLive from './live-charts-2024/describeSelfLive';
import BestAlternativeLive from './live-charts-2024/bestAlternativeLive';
import DescribePartnerLive from './live-charts-2024/describePartnerLive';
import IckLive from './live-charts-2024/ickLive';
import RelationshipTypeLive from './live-charts-2024/relationshipTypeLive';
import LoveLanguageLive from './live-charts-2024/loveLanguageLive';

function LiveDashboard() {
    return (
        <div className="bg-pink-100 p-1 sm:p-8 lg:py-16">
            <h1 className="text-rose-400 font-bold text-xl sm:text-3xl mt-10 mb-4 sm:my-6 text-center">
                PM2024 Quick Results
            </h1>
            <p className="text-gray-500 sm:text-lg text-center lg:mx-[20%] sm:mb-8 mb-6 md:mx-[15%] mx-[1%]">
                This year, many of you asked us to help you Nudge Your Crush. Guess what? It
                worked! <strong className="text-rose-400">There are 72 pairs of crush matches in total,
                    with 16 of them being mutual crushes 💞. </strong> Let the love story begin with Perfect Match!
            </p>
            <p className="text-gray-500 sm:text-lg text-center lg:mx-[20%] sm:mb-10 mb-6 md:mx-[15%] mx-[1%]">
                And... Before reaching out to your perfect matches, be sure to explore these statistics from the PM2024 responses!
                Try hovering or clicking on the charts to see the data.
                Stay tuned for additional updates...
            </p>
            <div className="shadow-2xl">
                <div className="flex p-3 gap-4 flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:w-1/2 sm:shadow-lg shadow-md pl-3 pr-2 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 -mb-2 sm:pr-2">
                            Top 10 Adjectives to Describe Oneself
                        </h3>
                        <DescribeSelfLive />
                    </div>
                    <div className="mb-2 sm:mb-0 sm:w-1/2 sm:shadow-lg shadow-md pl-3 pr-2 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 -mb-2 sm:pr-2">
                            Top 10 Adjectives to Describe One&#39;s Ideal Partner
                        </h3>
                        <DescribePartnerLive />
                    </div>
                </div>
                <div className="flex p-3 gap-4 flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:w-2/5 sm:shadow-lg shadow-md pb-3 sm:pb-0 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 sm:mt-6 mb-4 sm:mb-2 pl-4 sm:pr-2">
                            What&#39;s Your Most Important Love Language?
                        </h3>
                        <LoveLanguageLive />
                    </div>
                    <div className="mb-2 sm:mb-0 sm:w-3/5 sm:shadow-lg shadow-md pr-2 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 sm:mt-6 -mb-2 pl-4 sm:pr-2">
                            What&#39;s Your Biggest Ick in a Relationship?
                        </h3>
                        <IckLive />
                    </div>
                </div>
                <div className="flex p-3 gap-4 flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:w-2/5 sm:shadow-lg shadow-md pb-3 sm:pb-0 sm:pr-2 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 mb-4 sm:mb-2 pl-4">
                            What Type of Relationship Are You Looking for with Your Match?
                        </h3>
                        <RelationshipTypeLive />
                    </div>
                    <div className="mb-4 sm:mb-0 sm:w-3/5 sm:shadow-lg shadow-md pr-2 bg-white">
                        <h3 className="text-gray-500 md:text-lg lg:text-xl font-semibold mt-4 -mb-2 pl-4 sm:pr-2">
                            Choose the Best Alternative. Your Match is a 10, but They ____.
                        </h3>
                        <BestAlternativeLive />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveDashboard;
