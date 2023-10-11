import Head from 'next/head';
import Link from 'next/link';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import Members from '../components/members';

const About: any = (props: any) => {
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>
            <Header />
            <div>
                <div>
                    {' '}
                    <section className="bg-white">
                        <div
                            className="gap-6 lg:gap-10 items-center px-0 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:px-6 flex-col lg:flex-row mx-[5%] sm:mx-[10%] lg:mx-[15%] sm:py-16 lg:py-20 py-12"
                            style={{ display: 'flex', paddingLeft: '0px' }}
                        >
                            <div className="font text-gray-500 sm:text-lg dark:text-gray-400 lg:w-7/12">
                                <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400">Cupid just got smarter 🦾💗!</h2>

                                <p className="sm:mb-4 mb-0">
                                    Perfect Match is a matchmaking survey ideated in February 2019. Our machine learning algorithm uses your survey to pair you
                                    with other Cornell students — your Perfect Matches! This year, we are back with fun survey questions, improved matching
                                    algorithm, and better privacy protection measures! Don&apos;t hesitate to get in for a Valentine&apos;s Day you won&apos;t
                                    forget!
                                </p>
                                {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
                            </div>
                            <div className="lg:w-5/12">
                                <img className="rounded-lg" src="\new_cupid.png" />
                            </div>
                        </div>
                    </section>
                </div>

                <section className="bg-pink-100 pt-0 pb-12 sm:pb-10 pb-5">
                    <div className="mx-[10%] lg:mx-[15%]">
                        <ol className="hidden sm:block sm:border-xl-0 sm:border-t-2 border-rose-300 sm:flex sm:gap-6">
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="sm:-mt-5 text-3xl -ml-1">💓</div>
                                    <p className="text-rose-400 text-l my-2 font-bold">02-01-23 5PM</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">PM2023 is Launched!</h4>
                                    <p className="text-gray-500 mb-3">
                                        Sign in with your Cornell email. Then fill out your profile and the survey! For updates on PM23, follow us on{' '}
                                        <a className="underline" href="https://www.instagram.com/cornellperfectmatch/" target="_blank" rel="noreferrer">
                                            IG
                                        </a>
                                        .{' '}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="sm:-mt-5 text-3xl">💘</div>
                                    <p className="text-rose-400 text-l my-2 font-bold">02-13-23 Noon</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">PM Closes!</h4>
                                    <p className="text-gray-500 mb-3">Hurry up! Cupid is flying away! Make sure to submit your response on time.</p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="sm:-mt-5 text-3xl">💞</div>
                                    <p className="text-rose-400 text-l my-2 font-bold">02-13-23 Night</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">Matches Out!</h4>
                                    <p className="text-gray-500 mb-3">
                                        An email will be sent to you when your perfect matches are out. Go ahead and shoot your shot!{' '}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                    <div className="sm:-mt-5 text-3xl">❤️‍🔥</div>
                                    <p className="text-rose-400 text-l my-2 font-bold">02-14-23</p>
                                </div>
                                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">It&apos;s Valentine&apos;s Day!</h4>
                                    <p className="text-gray-500 mb-3">It&apos;s that time of the year! Grab some food with your perfect matches!</p>
                                </div>
                            </li>
                        </ol>

                        <ol className="border-l-2 border-rose-300 sm:hidden">
                            <li>
                                <div className="flex flex-start items-center pt-3">
                                    <div className="-ml-3 mr-3 text-2xl">💓</div>
                                    <p className="text-rose-400 text-l font-bold">02-01-23 5PM</p>
                                </div>
                                <div className="mt-0.5 ml-4 mb-6">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">PM2023 is Launched!</h4>
                                    <p className="text-gray-500 mb-3">
                                        Sign in with your Cornell email. Then fill out your profile and the survey! For updates on PM23, follow us on{' '}
                                        <a className="underline" href="https://www.instagram.com/cornellperfectmatch/" target="_blank" rel="noreferrer">
                                            IG
                                        </a>
                                        .
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">💘</div>
                                    <p className="text-rose-400 text-l font-bold">02-13-23 Noon</p>
                                </div>
                                <div className="mt-0.5 ml-4 mb-6">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">PM Closes!</h4>
                                    <p className="text-gray-500 mb-3">Hurry up! Cupid is flying away! Make sure to submit your response on time.</p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">💞</div>
                                    <p className="text-rose-400 text-l font-bold">02-13-23 Night</p>
                                </div>
                                <div className="mt-0.5 ml-4 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">Matches Out!</h4>
                                    <p className="text-gray-500 mb-3">
                                        An email will be sent to you when your perfect matches are out. Go ahead and shoot your shot!
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">❤️‍🔥</div>
                                    <p className="text-rose-400 text-l font-bold">02-14-23</p>
                                </div>
                                <div className="mt-0.5 ml-4 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-xl mb-1.5">It&apos;s Valentine&apos;s Day!</h4>
                                    <p className="text-gray-500 mb-3">It&apos;s that time of the year! Grab some food with your perfect matches!</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className="bg-white">
                    <Members />
                </section>

                <section className="text-gray-500 bg-pink-100">
                    <div className="container px-5 sm:px-0 py-16 sm:py-24 mx-auto">
                        <div className="text-center mb-15">
                            <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-rose-400 sm:text-4xl">Frequently Asked Questions</h2>
                        </div>
                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What is Perfect Match?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Perfect Match is a matchmaking service for Cornell students and faculty. It uses machine learning algorithms to match
                                        participants based on their responses to the survey. Every year, the survey opens in early Feburary and has thousands of
                                        participants. Matches are released the weekend before Valentine&apos;s day.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        How many matches will I get?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>Most participants get between 4 and 7 matches.</p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What should I do when I receive my Matches?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        It&apos;s up to you! Contact your Matches in any way you&apos;d like. We will provide some suggestions for how to
                                        connect when matches are released.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What is the Perfect Match team like?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        There are currently seven members in the team. Each of us focuses on designing, developing, or marketing; there is no
                                        leader, and we make decisions together.
                                    </p>
                                </details>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What algorithm does Perfect Match use?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        The Perfect Match algorithm can be broken into two parts: scoring and matching. First, we use our machine learning
                                        algorithm to score compatability between you and all other participants who satisfy your main criteria, as determined by
                                        your responses. We then use a variant of the Hungarian algorithm to generate optimal matches based on these scores.
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        What happens to my data?
                                    </summary>

                                    <p className="pt-2 pl-4">
                                        Your data is safe with us! We will never share your data with a third party, and we will only interact with your
                                        information as needed to resolve user issues. We may collect anonymous statistics to improve our algorithm, but your
                                        identity will always be separated from such reports. More FAQ&apos;s about user privacy can be found{' '}
                                        <u>
                                            <Link href="/statistics#privacy" className="underline">
                                                here
                                            </Link>
                                        </u>{' '}
                                        .
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        How can I contact the Perfect Match team?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        Our contact information is right below. Feel free to follow us on{' '}
                                        <a className="underline" href="https://www.instagram.com/cornellperfectmatch/" target="_blank" rel="noreferrer">
                                            IG
                                        </a>{' '}
                                        or chat with us on{' '}
                                        <a className="underline" href="https://www.reddit.com/user/PerfectMatch2020/" target="_blank" rel="noreferrer">
                                            Reddit
                                        </a>
                                        !
                                    </p>
                                </details>
                                <details className="mb-5">
                                    <summary className="sm:font-semibold font-medium bg-white rounded-md py-2 px-4 cursor-pointer">
                                        How to join the Perfect Match team?
                                    </summary>

                                    <p style={{ paddingTop: '10px', paddingLeft: '15px' }}>
                                        We welcome new members and new ideas! If you are interested in joining the team, please fill out this{' '}
                                        <a href="https://forms.gle/Jv5th8zbajVF6qN6A" className="underline" target="_blank" rel="noreferrer">
                                            form
                                        </a>{' '}
                                        at any time. We will contact you soon.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <section className="bg-white ">
                    <div className="py-8 mx-auto max-w-screen-xl lg:py-16 mx-[5%] sm:mx-[15%]">
                        <div className="max-w-screen-lg text-gray-500 sm:text-lg ">
                            <h2 className="mb-4 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 ">Contact Us!</h2>
                            <p className="mb-4 sm:font-medium">Feel free to reach out with questions, suggestions, comments. </p>
                            <p className="mb-4 sm:font-medium">
                                {' '}
                                Email:{' '}
                                <a target="_blank" rel="noreferrer" href="mailto:cornell.perfectmatch@gmail.com">
                                    cornell.perfectmatch@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default About;
