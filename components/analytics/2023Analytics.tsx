import React from "react";
import Link from "next/link";
import DescribeYouFemale from "@/components/analytics/charts-2023/describeYouFemale";
import DescribeYouMale from "@/components/analytics/charts-2023/describeYouMale";
import Year from "@/components/analytics/charts-2023/year";
import Height from "@/components/analytics/charts-2023/height";
import LongestRelationship from "@/components/analytics/charts-2023/longestRelationship";
import NumDatedGender from "@/components/analytics/charts-2023/numDated";
import Political from "@/components/analytics/charts-2023/political";
import SimilarInterest from "@/components/analytics/charts-2023/similarInterest";
import FirstDate from "@/components/analytics/charts-2023/firstDate";
import Quality from "@/components/analytics/charts-2023/quality";
import WakeTime from "@/components/analytics/charts-2023/wakeTime";
import SleepDuration from "@/components/analytics/charts-2023/sleepDuration";
import AgePrefToggle from "@/components/analytics/charts-2023/toggleSwitchAgePref";
import Faction from "@/components/analytics/charts-2023/faction";
import CompleteTask from "@/components/analytics/charts-2023/completeTask";
import BestAlternativeBar from "@/components/analytics/charts-2023/bestAlternativeBar";
import DateWear from "@/components/analytics/charts-2023/dateWear";
import RelationshipType from "@/components/analytics/charts-2023/relationshipType";

const Stats2023 = () => {
	const [show, toggleShow] = React.useState(true);

	return (
		<div>
			{" "}
			<div>
				<section className="bg-pmpink-500 pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1">
					<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
						About Participants of PM23
					</h2>
					<p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
						In 2023, we received <strong className="text-rose-400"> 3,911 </strong>
						valid responses, an 8.3% increase from last year! Thank you all for filling out the survey and helping spread love
						at Cornell🫶! Here is a look at the results of the survey.
					</p>
					{/* <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" /> */}
					<p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
						Same as last year, <strong className="text-rose-400">CS</strong> majors seemed to really need our help; 566 of them
						opted in for PM23. The second place went to <strong className="text-rose-400">Biological Science</strong> with 258
						participants.
					</p>
					{/* <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" /> */}
					<div className="my-8">
						<p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							This year, <strong className="text-rose-400">sophomores</strong> made up the highest proportion of the PM23
							participants. And the number of freshman students filling out the survey increased by 40% from last year.
						</p>
						<p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							In total, we had 3,687 undergrad participants, which was{" "}
							<strong className="text-rose-400">1/4 of the Cornell undergrad student population</strong>.
						</p>
						<div className="sm:mx-[10%] lg:mx-[25%] -mb-12 sm:my-4 bg-white px-3 py-1 rounded-md">
							<h3 className="mx-[3%] text-pmblue-500 text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
								PM23 Participants by Year
							</h3>
							<Year />
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
					<div className="my-8">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Zzz...
						</h2>
						<p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							To ensure you and your matches were not too different in the daily schedule, we surveyed when you would most
							likely fall asleep and wake up.
						</p>
						<p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							<strong className="text-rose-400">Dyson students go to bed the latest </strong>among all colleges: 63% of them
							fall asleep at or after 1 AM, while for the population, it is 51%.{" "}
							<strong className="text-rose-400">Grad students wake up the earliest</strong>: 65% wake up at or before 8 AM,
							while for the population, it is 48%.
						</p>
						<p className="my-4 lg:my-6 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							You might also be curious about how long Cornellians typically sleep. Our data shows that an average Cornell
							student sleeps <strong className="text-rose-400">8 hours</strong> and is not sleep-deprived, fortunately.
							However, if you still feel like you are not getting enough sleep, choose your major wisely:
						</p>
						<p className="my-2 lg:my-4 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							❗Try hovering over the curve or clicking it to see the data❗
						</p>
						<div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4 flex sm:flex-row flex-col gap-x-4 bg-white rounded-md px-3">
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
									Cornellian&#39;s Sleep Schedules
								</h3>
								<WakeTime />
							</div>
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
									Popular Majors&#39; Average Sleep Duration (in Hours)
								</h3>
								<SleepDuration />
							</div>
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
					<div className="my-8">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							How Tall Are You?
						</h2>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Though PM does not use height for matching, <strong className="text-rose-400">height </strong>
							is one of the first qualities people evaluate when looking for a significant other, for better or worse. The
							median height is
							<strong className="text-rose-400"> 65 inches</strong> for female participants and{" "}
							<strong className="text-rose-400">70 inches</strong> for male participants, the same as last year.
						</p>
						<div className="sm:mx-[10%] lg:mx-[25%] -mb-12 sm:my-4 bg-white px-3 py-1 rounded-md">
							<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
								Cornellians&#39; Height by Gender
							</h3>
							<Height />
							<p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4 mt-2 sm:mt-0">
								*Participants who gave their gender as non-binary individual or other are excluded due to small sample size.
							</p>
						</div>
					</div>
				</section>
				<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
				<section className="bg-pmpink-500 pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1">
					<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
						About Dating and More
					</h2>
					<div className="mx-[3%] sm:mx-[10%] lg:mx-[20%]">
						<h3 className="text-xl text-rose-500 font-bold sm:text-2xl lg:pt-4">Facts</h3>
						<ul className="list-disc mb-8 sm:mb-12 ml-4">
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								Don&apos;t sweat if you have never been in a relationship before.
								<strong className="text-rose-400"> 33.6%</strong> of participants said they had never been in a
								relationship. Last year, it was 30%.
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								PM allowed you to indicate people you did not want to be matched with, called{" "}
								<strong className="text-rose-400">&quot;forbidden&quot; — 22.8% </strong> of the participants listed at
								least one forbidden in their response.
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								PM also allowed you to indicate your crush&#40;es&#41;, increasing the chance of matching you with your{" "}
								<strong className="text-rose-400">crush&#40;es&#41; — 26.3% </strong> of the participants listed at least
								one crush in their response. Hope we helped a bit :&#41;
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								The median duration of their longest relationship for female participants was{" "}
								<strong className="text-rose-400">three months</strong>, while for male participants, it was{" "}
								<strong className="text-rose-400">five months</strong>.
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								The median number of people the participants had dated in the last five years was{" "}
								<strong className="text-rose-400">1</strong>.
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								<strong className="text-rose-400">&quot;Funny&quot; and &quot;caring&quot; </strong>
								were the top adjectives used by people to describe themselves. Last year, it was &quot;funny&quot; and
								&quot;smart.&quot;
							</li>
							<li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-black">
								Only a few people said they preferred to be paired with someone who was less extroverted than themselves.
							</li>
						</ul>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
					<div className="my-8 sm:my-12">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							I Would Say I&#39;m...
						</h2>

						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Participants were asked to describe themselves by three adjectives in the survey, which would later be displayed
							to their matches. Female and male participants chose quite different words. As shown below, the top adjectives
							used by female participants were{" "}
							<strong className="text-rose-400">&quot;funny,&quot; &quot;caring,&quot; and &quot;kind.&quot;</strong> For male
							participants, they were{" "}
							<strong className="text-sky-400">&quot;funny,&quot; &quot;smart,&quot; and &quot;thoughtful.&quot; </strong>{" "}
							Huh, how did gender stereotypes shape your self-presentation to your matches?
						</p>
						<div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4 flex sm:flex-row flex-col gap-x-4 bg-white rounded-md px-3">
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-2 sm:text-xs sm:mt-8 sm:mb-0">
									Top Adjectives Used by <span className="text-rose-400">Female Participants</span> to Describe Themselves
								</h3>
								<DescribeYouFemale />
							</div>
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-2 sm:text-xs sm:mt-8 sm:mb-0">
									Top Adjectives Used by <span className="text-sky-400">Male Participants</span> to Describe Themselves
								</h3>
								<DescribeYouMale />
							</div>
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />

					<div className="my-8 sm:my-12">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Does Age Matter?
						</h2>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							In the survey, each participant indicated an{" "}
							<strong className="text-rose-400">age range they would like their matches to be in</strong>. Play around with
							the graph below. Hover over the small rectangles to see what they mean (if you are on mobile devices, click
							them). Then, switch the chart by clicking the button right below and observe the differences. Do you notice{" "}
							<strong className="text-rose-400">
								male participants prefer younger matches overall than female participants
							</strong>
							?
						</p>
						<div className="sm:mx-[10%] lg:mx-[25%] -mb-12 sm:my-4 bg-white px-3 py-1 rounded-md">
							<AgePrefToggle />
							<p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
								*Participants who gave their gender as non-binary individual or other are excluded due to small sample size.
							</p>
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
					<div className="my-8 sm:my-12">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Dating History
						</h2>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							We asked participants to give the
							<strong className="text-rose-400"> number of people they had dated </strong>
							in the last five years. It is interesting to observe how female and male participants gave different numbers.
						</p>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							We also asked participants to give the length of their longest relationship. The results indicate that{" "}
							<strong className="text-rose-400">grads, hotelies, and ILRers </strong> tend to be in longer relationships.
						</p>
						<div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4 flex sm:flex-row flex-col gap-x-4 bg-white rounded-md px-3">
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									Number of People one had Dated, by Gender
								</h3>
								<NumDatedGender />
							</div>
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									Median Duration of Longest Relationship (in Months), by College
								</h3>
								<LongestRelationship />
							</div>
							{/* <p className="mx-[3%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
                            *Participants who gave their gender as non-binary individual or other are excluded due to
                            small sample size.
                        </p> */}
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />

					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />
					<div className="my-8 sm:my-12">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							We&#39;re All Cornellians
						</h2>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							This year, we added some <strong className="text-rose-400">fun Cornell-related questions</strong> to the survey.
							Are these results in your expectations? Are you the same or different from the majority?
						</p>

						<div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4 flex sm:flex-row flex-col gap-x-4 bg-white rounded-md px-3">
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									1. Choose the <span className="text-lime-500">best alternative</span>. Your match is a 10, but they
									____.
								</h3>
								<BestAlternativeBar />
							</div>
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									2. In the next year, I want to complete this task from the{" "}
									<span className="text-pink-400">161 Things Every Cornellian Should Do</span>.
								</h3>
								<CompleteTask />
							</div>
						</div>
						<div className="sm:mx-[10%] lg:mx-[20%] -mb-4 sm:my-4 flex sm:flex-row flex-col gap-x-4 bg-white rounded-md px-3">
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									3. What&#39;s the <span className="text-violet-400">least traumatizing Cornell faction</span> your
									prospective match could belong to?
								</h3>
								<Faction />
							</div>
							<div className="sm:w-1/2 w-full sm:mx-0">
								<h3 className="text-pmblue-500 mx-[3%] text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-xs sm:mt-8 sm:mb-0">
									4. <span className="text-amber-500">Worst Thing</span> Your Match Could Wear on a Date.
								</h3>
								<DateWear />
							</div>
						</div>
					</div>

					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" />

					<div className="my-8 sm:my-12">
						<h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-red-500 mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							The More You Know
						</h2>
						<p className="mt-8 mb-2 sm:mt-12 sm:mb-0 lg:mb-4 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							Here are more facts you must know before dating a Cornellian!
						</p>
						<p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-black mx-[3%] sm:mx-[10%] lg:mx-[20%]">
							<strong className="text-rose-400">37.9%</strong> of participants thought differences in political views were a
							deal breaker. Here is how people rated their political tendencies on a scale of 1 to 10, with 1 being the
							farthest left and 10 being the most right. The graph looks very similar to last year&apos;s.
						</p>

						<div className="sm:mx-[10%] lg:mx-[25%] -mb-12 sm:my-4 bg-white px-3 py-1 rounded-md">
							<h3 className="mx-[3%] text-pmblue-500 text-base sm:mx-0 font-bold mt-6 -mb-4 sm:text-lg sm:mt-8 sm:mb-0">
								Political Tendency
							</h3>
							<Political />
						</div>
					</div>
					{/* <hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%]" /> */}

					<div className="sm:flex sm:mx-[10%] lg:mx-[20%] bg-white px-3 rounded-md py-1">
						<div className="mt-6 sm:mt-0 sm:w-[50%]">
							<div className="justify-center sm:h-20">
								<p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-pmblue-500 mx-[3%] sm:mx-0 font-semibold text-center">
									What <span className="text-rose-400">type of relationship</span> are you looking for with your match?
								</p>
							</div>
							<div>
								<RelationshipType />
							</div>
						</div>
						<div className="sm:w-[50%]">
							<div className="justify-center sm:h-20">
								<p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-pmblue-500 mx-[3%] sm:mx-4 font-semibold text-center">
									Would you like to be paired with someone who has mostly{" "}
									<span className="text-rose-400">similar or different interests</span> to you?
								</p>
							</div>
							<div>
								<SimilarInterest />
							</div>
						</div>
					</div>
					<div className="sm:flex sm:mx-[10%] lg:mx-[20%] sm:mt-2 lg:mt-4 px-3 rounded-md py-1 bg-white">
						<div className="mt-4 sm:mt-0 sm:w-[50%]">
							<div className="justify-center sm:h-14">
								<p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-pmblue-500 mx-[3%] sm:mx-0 font-semibold text-center">
									<span className="text-rose-400">Where</span> would you go on a first date?
								</p>
							</div>
							<div>
								<FirstDate />
							</div>
						</div>
						<div className="sm:w-[50%]">
							<div className="justify-center sm:h-14">
								<p className="mt-8 mb-2 sm:my-10 max-w-4xl lg:text-lg text-pmblue-500 mx-[3%] sm:mx-0 font-semibold text-center">
									What <span className="text-rose-400">quality</span> do you value the most?
								</p>
							</div>
							<div>
								<Quality />
							</div>
						</div>
					</div>
					<hr className="border-1 border-solid border-rose-300 mx-[3%] sm:mx-[10%] lg:mx-[20%] my-8 sm:mt-10" />
					<p className="mt-4 sm:mt-8 mb-10 sm:mb-12 lg:mt-12 max-w-4xl sm:text-xl font-bold text-red-500 mx-auto sm:mx-[10%] lg:mx-[20%] text-center break-words">
						Thanks for taking Perfect Match this year and don&apos;t be afraid to shoot your shot!
					</p>
				</section>
			</div>{" "}
		</div>
	);
};

export default Stats2023;
