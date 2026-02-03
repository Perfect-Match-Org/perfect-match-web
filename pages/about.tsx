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

            <div>
                <div>
                    <section className="bg-pmpink-500">
                        <div
                            className="flex gap-6 lg:gap-10 items-center px-4 max-w-screen-xl lg:grid lg:grid-cols-2 lg:px-0 flex-col lg:flex-row mx-[5%] sm:mx-[10%] lg:mx-[15%] sm:py-16 lg:py-20 py-12"
                        >
                            <div className="sm:text-lg">
                                <h2 className="text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-5xl 2xl:text-6xl sm:mt-5 ">
                                    <span className="bg-pmblue2-800 box-decoration-clone lg:px-6 lg:py-3 sm:px-4 sm:py-2 sm:leading-[1.2] lg:leading-[1.4]">CUPID JUST GOT SMARTER!</span>
                                </h2>

                                <div className='font-work-sans text-pmblue2-800 text-base sm:text-lg font-medium mt-6'>
                                    <p className="sm:mb-4 mb-0 ">
                                        Perfect Match is a matchmaking survey ideated in February 2019. Our machine learning algorithm uses your survey to pair you with other Cornell students — your Perfect Matches!</p>

                                    <p className="sm:mb-4 mb-0">  This year, we are back with <strong> fun survey questions, whole new branding, special “nudge your crush” feature, and more</strong> surprises to discover! Don&apos;t hesitate to get in for a Valentine&apos;s Day you won&apos;t forget!
                                    </p>
                                    {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <Image src='/bow_arrow.svg' alt='bow and arrow' width={500} height={500} priority={true} draggable='false' />
                            </div>
                        </div>
                    </section>
                </div>


                <section className="bg-pmpink2-500 py-6 sm:py-8">
                    <div className="hidden sm:block ">
                        <div className="left-0 w-full overflow-hidden">
                        </div>
                        <ol className="sm:border-xl-0 sm:border-t-0 border-pmpink2-500 flex sm:gap-6 mx-[10%] lg:mx-[15%] sm:-mb-4">
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 text-3xl -ml-1">💓</div>
                                    <p className="font-work-sans text-pmred-500 text-l my-2 font-bold mt-4">Feb. 2nd, Monday, @ 5 PM</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5">PM26 is Launched!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        Start filling out your profile and the survey! For updates on PM26, follow us on{' '}
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
                                    <div className="relative z-10 text-3xl">💘</div>
                                    <p className="font-work-sans text-pmred-500 text-l my-2 font-bold mt-4">Feb. 12th, @ Noon</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="font-dela-gothic text-pmblue-500 font-bold text-lg mb-1.5">PM26 Closes!</h4>
                                    <p className="font-work-sans text-pmblue-500 mb-3">
                                        Hurry up! Cupid is flying away! Make sure to submit your response on time.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="relative z-10 text-3xl">💞</div>
                                    <p className="font-work-sans text-pmred-500 my-2 font-bold mt-4">Feb. 12th, @ Night</p>
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
                                    <div className="relative z-10 text-3xl">❤️‍🔥</div>
                                    <p className="font-work-sans text-pmred-500 text-l my-2 font-bold mt-4">Feb. 14th</p>
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
                        </div>
                    </div>
                </section>

                <section className="bg-pmpink-500">
                    <Members />
                </section>
                <section className="text-gray-500 bg-pmpink2-500">
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
