import Head from 'next/head';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Members from '@/components/members';
import Image from 'next/image';

const About: any = (props: any) => {
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>
            <Header />
            <div className="absolute -left-5 top-0 h-screen w-[18vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/left_hearts_2.svg" alt="left hearts" layout='fill' priority={true} draggable='false' />
            </div>
            <div className="absolute right-0 top-0 h-screen w-[18vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/right_hearts_2.svg" alt="right hearts" layout='fill' priority={true} draggable='false' />
            </div>

            <div>
                <div>
                    <section className="bg-pmpink-500">
                        <div
                            className="flex gap-6 lg:gap-10 items-center px-4 max-w-screen-xl lg:grid lg:grid-cols-2 lg:px-0 flex-col lg:flex-row mx-[5%] sm:mx-[10%] lg:mx-[15%] sm:py-16 lg:py-20 py-12"
                        >
                            <div className="font-dela-gothic sm:text-lg">
                                <h2 className="mb-6 text-2xl sm:text-3xl tracking-tigh text-pmred-500">
                                    Cupid just got smarter!
                                </h2>

                                <div className='font-work-sans text-pmred-500 text-base sm:text-lg font-medium'>
                                    <p className="sm:mb-4 mb-0 ">
                                        Perfect Match is a matchmaking survey ideated in February 2019. Our machine learning algorithm uses your survey to pair you with other Cornell students — your Perfect Matches!</p>

                                    <p className="sm:mb-4 mb-0">  This year, we are back with <strong> fun survey questions, whole new branding, special “nudge your crush” feature, and more</strong> surprises to discover! Don&apos;t hesitate to get in for a Valentine&apos;s Day you won&apos;t forget!
                                    </p>
                                    <p className='text-right font-semibold mx-auto sm:mr-2 lg:mr-2'>Happy matching, xoxo, <br /> The Cupids💝</p>
                                    {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <Image src='/bow_arrow.svg' alt='bow and arrow' width={500} height={500} priority={true} draggable='false' />
                            </div>
                        </div>
                    </section>
                </div>


                <section className="bg-pmpink2-500">
                    <div className="hidden sm:block ">
                        <div className="left-0 w-full overflow-hidden bg-pmpink-500">
                            <svg className="relative block w-full h-[60px] md:hidden"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                    fill="#f7a4af"
                                ></path>
                            </svg>
                            <svg className="relative hidden w-full h-[60px] md:block"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                    fill="#f7a4af"
                                ></path>
                            </svg>
                        </div>
                        <ol className="sm:border-xl-0 sm:border-t-0 border-pmpink2-500 flex sm:gap-6 mx-[10%] lg:mx-[15%] sm:-mt-7 sm:-mb-4">
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 sm:-mt-5 text-3xl -ml-1">💓</div>
                                    <p className="work-sans text-white text-l my-2 font-bold mt-4">Feb. 3rd @ 5 PM</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5">PM25 is Launched!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        Start filling out your profile and the survey! For updates on PM25, follow us on{' '}
                                        <a
                                            className="underline"
                                            href="https://www.instagram.com/perfectmatch.at.cornell/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            IG
                                        </a>
                                        .
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 sm:-mt-5 text-3xl">💘</div>
                                    <p className="work-sans text-white text-l my-2 font-bold mt-4">Feb. 13th @ Noon</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5"> PM25 Closes!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        Hurry up! Cupid is flying away! Make sure to submit your response on time.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 sm:-mt-5 text-3xl">💞</div>
                                    <p className="work-sans text-white my-2 font-bold mt-4"> Feb. 13th @ Night</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5">Matches Out!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        An email will be sent to you when your perfect matches are out. Go ahead and
                                        shoot your shot!
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 sm:-mt-5 text-3xl">❤️‍🔥</div>
                                    <p className="work-sans text-white text-l my-2 font-bold mt-4">Feb. 14th</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5">Valentine&apos;s Day!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        It&apos;s that time of the year! Grab some food with your perfect matches!
                                    </p>
                                </div>
                            </li>
                        </ol>

                        <div className="left-0 w-full overflow-hidden">
                            <svg className="relative block w-full h-[60px] md:hidden" // Adjust height as needed
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                    fill="#fce5f3"
                                ></path>
                            </svg>
                            <svg className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                    fill="#fce5f3"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="bg-pmpink-500">
                    <Members />
                </section>
                <section className="text-gray-500 bg-pmpink2-500">
                    <div className="left-0 w-full overflow-hidden bg-pmpink-500">
                        <svg className="relative block w-full h-[60px] md:hidden"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                fill="#f7a4af"
                            ></path>
                        </svg>
                        <svg className="relative hidden w-full h-[60px] md:block"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                fill="#f7a4af"
                            ></path>
                        </svg>
                    </div>
                    <div className="container px-5 sm:px-0 py-8 sm:py-10 mx-auto">
                        <div className="font-dela-gothic text-center mb-15">
                            <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-pmblue-500 sm:text-4xl">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="work-sans font-semibold text-pmblue-500 flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        What is Perfect Match?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        Perfect Match is a matchmaking service for Cornell students and alumni. It uses
                                        machine learning algorithms to match participants based on their responses to
                                        the survey. Every year, the survey opens in early February and has thousands of
                                        participants. Matches are released the weekend before Valentine&apos;s day.
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        How many matches will I get?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        Most participants get between 4 and 7 matches.
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        What should I do when I receive my Matches?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        It&apos;s up to you! Contact your Matches in any way you&apos;d like. We will
                                        provide some suggestions for how to connect when matches are released.
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        What is the Perfect Match team like?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        There are currently 19 members in the team. It is a small team; every member has
                                        their unique strengths and responsibilities. We typically meet every month to
                                        decide on tasks and assign them. However, every January is still a super busy
                                        time!
                                    </p>
                                </details>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        What algorithm does Perfect Match use?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        The Perfect Match algorithm can be broken into two parts: scoring and matching.
                                        First, we use our machine learning algorithm to score compatibility between you
                                        and all other participants who satisfy your main criteria, as determined by your
                                        responses. We then use our proprietary matching algorithm to generate optimal
                                        matches based on these scores.
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        What happens to my data?
                                    </summary>

                                    <p className="pt-2 pl-4">
                                        Your data is safe with us! We will never share your data with a third party, and
                                        we will only interact with your information as needed to resolve user issues. We
                                        may collect anonymous statistics to improve our algorithm, but your identity
                                        will always be separated from such reports. More FAQ&apos;s about user privacy
                                        can be found{' '}
                                        <u>
                                            <Link href="/statistics#privacy" className="underline">
                                                here
                                            </Link>
                                        </u>{' '}
                                        .
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        How can I contact the Perfect Match team?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        Our contact information is right below. Feel free to follow us on{' '}
                                        <a
                                            className="underline"
                                            href="https://www.instagram.com/perfectmatch.at.cornell/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            IG
                                        </a>{' '}
                                        or chat with us on{' '}
                                        <a
                                            className="underline"
                                            href="https://www.reddit.com/user/PerfectMatch2020/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Reddit
                                        </a>
                                        !
                                    </p>
                                </details>
                                <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center">
                                        How do I join the Perfect Match team?
                                    </summary>

                                    <p className='pt-3 pl-4'>
                                        We typically recruit at the start of each semester, though this is subject to 
                                        the needs of the team. Keep an eye out for the application form on our website!
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div className="left-0 w-full overflow-hidden">
                        <svg className="relative block w-full h-[60px] md:hidden" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                                fill="#fce5f3"
                            ></path>
                        </svg>
                        <svg className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                fill="#fce5f3"
                            ></path>
                        </svg>
                    </div>
                </section>
            </div >

            <div>
                <section className="bg-pmpink-500">
                    <div className="py-8 px-8 mx-auto max-w-screen-xl lg:py-16 sm:mx-[10%] lg:mx-[15%] flex justify-center items-center">
                        <Image src='/stars.svg' alt='stars' height={198} width={396} loading='lazy' draggable='false' />
                    </div>
                </section>

            </div >

            <Footer />
        </div >
    );
};

export async function getStaticProps() {
    return { props: {} };
}

export default About;
