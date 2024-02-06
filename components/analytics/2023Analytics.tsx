import React from 'react';
import Link from 'next/link';
import DescribeYouFemale from '@/components/analytics/apex-charts/describeYouFemale';
import DescribeYouMale from '@/components/analytics/apex-charts/describeYouMale';
import Year from '@/components/analytics/apex-charts/year';
import Height from '@/components/analytics/apex-charts/height';
import LongestRelationship from '@/components/analytics/apex-charts/longestRelationship';
import NumDatedGender from '@/components/analytics/apex-charts/numDated';
import Political from '@/components/analytics/apex-charts/political';
import SimilarInterest from '@/components/analytics/apex-charts/similarInterest';
import FirstDate from '@/components/analytics/apex-charts/firstDate';
import Quality from '@/components/analytics/apex-charts/quality';
import WakeTime from '@/components/analytics/apex-charts/wakeTime';
import SleepDuration from '@/components/analytics/apex-charts/sleepDuration';
import AgePrefToggle from '@/components/analytics/apex-charts/toggleSwitchAgePref';
import Faction from '@/components/analytics/apex-charts/faction';
import CompleteTask from '@/components/analytics/apex-charts/completeTask';
import BestAlternativeBar from '@/components/analytics/apex-charts/bestAlternativeBar';
import DateWear from '@/components/analytics/apex-charts/dateWear';
import RelationshipType from '@/components/analytics/apex-charts/relationshipType';

const Stats2023 = () => {
    const [show, toggleShow] = React.useState(true);

    return (
        <div>
            {' '}
            <div>
                <section className="bg-white pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1">
                    <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        About Participants of PM23
                    </h2>
                    <p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        In 2023, we received <strong className="text-rose-400"> 3,911 </strong>
                        valid responses, an 8.3% increase from last year! Thank you all for filling out the survey and
                        helping spread love at Cornell🫶! Here is a look at the results of the survey.
                    </p>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        Same as last year, <strong className="text-rose-400">CS</strong> majors seemed to really need
                        our help; 566 of them opted in for PM23. The second place went to{' '}
                        <strong className="text-rose-400">Biological Science</strong> with 258 participants.
                    </p>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8">
                        <p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            This year, <strong className="text-rose-400">sophomores</strong> made up the highest
                            proportion of the PM23 participants. And the number of freshman students filling out the
                            survey increased by 40% from last year.
                        </p>
                        <p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            In total, we had 3,687 undergrad participants, which was{' '}
                            <strong className="text-rose-400">1/4 of the Cornell undergrad student population</strong>.
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%] -mb-12 sm:my-4">
                            <h3 className="mx-[3%] text-gray-500 text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                PM23 Participants by Year
                            </h3>
                            <Year />
                        </div>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8">
                        <p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            To ensure you and your matches were not too different in the daily schedule, we surveyed
                            when you would most likely fall asleep and wake up.
                        </p>
                        <p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            <strong className="text-rose-400">Dyson students go to bed the latest </strong>among all
                            colleges: 63% of them fall asleep at or after 1 AM, while for the population, it is 51%.{' '}
                            <strong className="text-rose-400">Grad students wake up the earliest</strong>: 65% wake up
                            at or before 8 AM, while for the population, it is 48%.
                        </p>
                        <p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            ❗Try hovering over the curve or clicking it to see the data❗
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4">
                            <h3 className=" text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                Cornellians&#39; Sleep Schedule
                            </h3>
                            <WakeTime />
                        </div>
                        <p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            You might also be curious about how long Cornellians typically sleep. Our data shows that an
                            average Cornell student sleeps <strong className="text-rose-400">8 hours</strong> and is not
                            sleep-deprived, fortunately. However, if you still feel like you are not getting enough
                            sleep, choose your major wisely:
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                Popular Majors&#39; Average Sleep Duration (in Hours)
                            </h3>
                            <SleepDuration />
                        </div>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            Though PM does not use height for matching,{' '}
                            <strong className="text-rose-400">height </strong>
                            is one of the first qualities people evaluate when looking for a significant other, for
                            better or worse. The median height is
                            <strong className="text-rose-400"> 65 inches</strong> for female participants and{' '}
                            <strong className="text-rose-400">70 inches</strong> for male participants, the same as last
                            year.
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                Cornellians&#39; Height by Gender
                            </h3>
                            <Height />
                        </div>
                        <p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4 mt-2 sm:mt-0">
                            *Participants who gave their gender as non-binary individual or other are excluded due to
                            small sample size.
                        </p>
                    </div>
                </section>
                <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                <section className="bg-white pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1">
                    <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        About Dating and More
                    </h2>
                    <div className="mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        <h3 className="text-xl text-rose-300 font-bold sm:text-2xl lg:pt-4">Facts</h3>
                        <ul className="list-disc mb-8 sm:mb-12 ml-4">
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                Don&apos;t sweat if you have never been in a relationship before.
                                <strong className="text-rose-400"> 33.6%</strong> of participants said they had never
                                been in a relationship. Last year, it was 30%.
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                PM allowed you to indicate people you did not want to be matched with, called{' '}
                                <strong className="text-rose-400">&quot;forbidden&quot; — 22.8% </strong> of the
                                participants listed at least one forbidden in their response.
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                PM also allowed you to indicate your crush&#40;es&#41;, increasing the chance of
                                matching you with your{' '}
                                <strong className="text-rose-400">crush&#40;es&#41; — 26.3% </strong> of the
                                participants listed at least one crush in their response. Hope we helped a bit :&#41;
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                The median duration of their longest relationship for female participants was{' '}
                                <strong className="text-rose-400">three months</strong>, while for male participants, it
                                was <strong className="text-rose-400">five months</strong>.
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                The median number of people the participants had dated in the last five years was{' '}
                                <strong className="text-rose-400">1</strong>.
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                <strong className="text-rose-400">&quot;Funny&quot; and &quot;caring&quot; </strong>
                                were the top adjectives used by people to describe themselves. Last year, it was
                                &quot;funny&quot; and &quot;smart.&quot;
                            </li>
                            <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                                Only a few people said they preferred to be paired with someone who was less extroverted
                                than themselves.
                            </li>
                        </ul>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            Participants were asked to describe themselves by three adjectives in the survey, which
                            would later be displayed to their matches. Female and male participants chose quite
                            different words. As shown below, the top adjectives used by female participants were{' '}
                            <strong className="text-rose-400">
                                &quot;funny,&quot; &quot;caring,&quot; and &quot;kind.&quot;
                            </strong>{' '}
                            For male participants, they were{' '}
                            <strong className="text-sky-400">
                                &quot;funny,&quot; &quot;smart,&quot; and &quot;thoughtful.&quot;{' '}
                            </strong>{' '}
                            Huh, how did gender stereotypes shape your self-presentation to your matches?
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-2 sm:text-lg sm:mt-8 sm:mb-0">
                                Top Adjectives Used by <span className="text-rose-400">Female Participants</span> to
                                Describe Themselves
                            </h3>
                            <DescribeYouFemale />
                        </div>
                        <div className="sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-2 sm:text-lg sm:mt-8 sm:mb-0">
                                Top Adjectives Used by <span className="text-sky-400">Male Participants</span> to
                                Describe Themselves
                            </h3>
                            <DescribeYouMale />
                        </div>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />

                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            In the survey, each participant indicated an{' '}
                            <strong className="text-rose-400">age range they would like their matches to be in</strong>.
                            Play around with the graph below. Hover over the small rectangles to see what they mean (if
                            you are on mobile devices, click them). Then, switch the chart by clicking the button right
                            below and observe the differences. Do you notice{' '}
                            <strong className="text-rose-400">
                                male participants prefer younger matches overall than female participants
                            </strong>
                            ?
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%]">
                            <AgePrefToggle />
                        </div>
                        <p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
                            *Participants who gave their gender as non-binary individual or other are excluded due to
                            small sample size.
                        </p>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            We asked participants to give the number of people they had dated in the last five years. It
                            is interesting to observe how female and male participants gave different numbers.
                        </p>
                        <div className="sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                Number of People one had Dated, by Gender
                            </h3>
                            <NumDatedGender />
                        </div>
                        <p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
                            *Participants who gave their gender as non-binary individual or other are excluded due to
                            small sample size.
                        </p>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            We also asked participants to give the length of their longest relationship. The results
                            indicate that <strong className="text-rose-400">grads, hotelies, and ILRers </strong> tend
                            to be in longer relationships.
                        </p>
                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                Median Duration of Longest Relationship (in Months), by College
                            </h3>
                            <LongestRelationship />
                        </div>
                    </div>

                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            This year, we added some{' '}
                            <strong className="text-rose-400">fun Cornell-related questions</strong> to the survey. Are
                            these results in your expectations? Are you the same or different from the majority?
                        </p>
                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                1. Choose the <span className="text-lime-500">best alternative</span>. Your match is a
                                10, but they ____.
                            </h3>
                            <BestAlternativeBar />
                        </div>
                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                2. In the next year, I want to complete this task from the{' '}
                                <span className="text-pink-400">161 Things Every Cornellian Should Do</span>.
                            </h3>
                            <CompleteTask />
                        </div>
                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                3. What&#39;s the{' '}
                                <span className="text-violet-400">least traumatizing Cornell faction</span> your
                                prospective match could belong to?
                            </h3>
                            <Faction />
                        </div>
                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
                                4. <span className="text-amber-500">Worst Thing</span> Your Match Could Wear on a Date.
                            </h3>
                            <DateWear />
                        </div>
                    </div>

                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />

                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                            <strong className="text-rose-400">37.9%</strong> of participants thought differences in
                            political views were a deal breaker. Here is how people rated their political tendencies on
                            a scale of 1 to 10, with 1 being the farthest left and 10 being the most right. The graph
                            looks very similar to last year&apos;s.
                        </p>
                        <div className="-mb-8 sm:mx-[10%] lg:mx-[20%] sm:-mb-28 md:-mb-36 lg:-mb-68">
                            <h3 className="text-gray-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 sm:text-lg sm:mt-8 sm:mb-0">
                                Political Tendency
                            </h3>
                            <Political />
                        </div>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
                    <p className="mt-8 mb-4 sm:mt-12 sm:mb-0 lg:mb-4 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        Here are more facts you must know before dating a Cornellian!
                    </p>
                    <div className="sm:flex sm:mx-[10%] lg:mx-[20%]">
                        <div className="mt-6 sm:mt-0 sm:w-[50%]">
                            <div className="justify-center sm:h-20">
                                <p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[3%] sm:mx-0 font-semibold text-center">
                                    What <span className="text-rose-400">type of relationship</span> are you looking for
                                    with you match?
                                </p>
                            </div>
                            <div>
                                <RelationshipType />
                            </div>
                        </div>
                        <div className="sm:w-[50%]">
                            <div className="justify-center sm:h-20">
                                <p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[3%] sm:mx-4 font-semibold text-center">
                                    Would you like to be paired with someone who has mostly{' '}
                                    <span className="text-rose-400">similar or different interests</span> to you?
                                </p>
                            </div>
                            <div>
                                <SimilarInterest />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:mx-[10%] lg:mx-[20%] sm:mt-2 lg:mt-4">
                        <div className="mt-4 sm:mt-0 sm:w-[50%]">
                            <div className="justify-center sm:h-14">
                                <p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[3%] sm:mx-0 font-semibold text-center">
                                    <span className="text-rose-400">Where</span> would you go on a first date?
                                </p>
                            </div>
                            <div>
                                <FirstDate />
                            </div>
                        </div>
                        <div className="sm:w-[50%]">
                            <div className="justify-center sm:h-14">
                                <p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[3%] sm:mx-0 font-semibold text-center">
                                    What <span className="text-rose-400">quality</span> do you value the most?
                                </p>
                            </div>
                            <div>
                                <Quality />
                            </div>
                        </div>
                    </div>
                    <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%] my-8 sm:mt-10" />
                    <p className="mt-4 sm:mt-8 mb-10 sm:mb-12 lg:mt-12 max-w-4xl sm:text-lg text-gray-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
                        Thanks for taking Perfect Match this year and don&apos;t be afraid to shoot your shot!
                    </p>
                </section>
                <section id="privacy" className="text-gray-500 bg-pink-100">
                    <div className="container px-5 sm:px-0 py-16 sm:py-24 mx-auto">
                        <div className="text-center mb-15">
                            <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-rose-400 sm:text-4xl">
                                FAQ&apos;s about User Privacy
                            </h2>
                        </div>
                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5">
                                    <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                                        Are my survey responses visible to others?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Absolutely not! All user data collected from our surveys is anonymized, and then
                                        privately stored. Only your name and provided contact information is shared, and
                                        that is only with your matches.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="font-semibold bg-white rounded-md py-2 px-4 cursor-pointer">
                                        Can I be identified from these statistics?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        <strong>
                                            Preserving the privacy of our participants is our utmost concern and is
                                            rooted behind every decision made in crafting these visualizations.
                                        </strong>{' '}
                                        We have taken several measures to remove any identifiable characteristics from
                                        the data we have collected, and the resulting datasets are randomly shuffled.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                                        How are these visualizations generated?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        These visualizations were generated using the ApexCharts JavaScript library.
                                    </p>
                                </details>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5">
                                    <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                                        Is my data sold to third-party advertisers?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Absolutely not! All of your data is stored privately and will not be viewed by
                                        any third party.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What happens to my data?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Your data is safe with us! We will never share your data with a third party
                                        advertisers, and we will only interact with your information as needed to
                                        resolve user issues. We may collect anonymous statistics to improve our
                                        algorithm, but your identity will always be separated from such reports.
                                    </p>
                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Anonymized statistics are published each year on our website and provided to
                                        media and student groups for publications. In the past, these are included
                                        Cornell Daily Sun, Big Red Heads, Cornell Chronicle, etc.
                                    </p>
                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        For media requests, please reach out at{' '}
                                        <Link href="mailto:perfectmatch@cornell.edu">perfectmatch@cornell.edu</Link>.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                                        Who can I contact if I have a privacy concern?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        We greatly encourage you to reach out to us with any questions or concerns that
                                        you may have regarding data privacy. In fact, feedback from the Cornell
                                        community already has and will continue to be used in to improve our algorithm
                                        and measures to protect privacy. We can be reached at{' '}
                                        <Link href="mailto:perfectmatch@cornell.edu">perfectmatch@cornell.edu</Link>.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </section>
            </div>{' '}
        </div>
    );
};

export default Stats2023;
