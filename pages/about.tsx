import styles from "../styles/Home.module.css";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link";

const About: any = (props: any) => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <div className="bg-rose-400">
        <div className="py-2 px-3 sm:px-0 sm:py-3 flex">
          <div className="flex flex-wrap items-center sm:mx-auto">
            <div>
              <p className="ml-2 font-small text-white sm:text-lg">
                  Interested in joining the Perfect Match Team?
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:w-auto sm:ml-5 sm:mt-0">
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-1 text-sm font-medium text-rose-400 shadow-sm hover:bg-rose-50 sm:text-lg"
              >
                Apply Here!
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                {/* <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          {" "}
          <section className="bg-white dark:bg-gray-600">
            <div className="gap-6 sm:gap-10 items-center px-0 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:px-6 flex-col sm:flex-row mx-[5%] sm:mx-[15%] sm:py-24 py-12" style={{display: "flex", paddingLeft: "0px"}}>
              <div className="font text-gray-500 sm:text-lg dark:text-gray-400 sm:w-7/12">
                <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400">
                  Cupid just got smarter 🦾💗!
                </h2>

                <p className="sm:mb-4 mb-0">
                  {" "}
                  Perfect Match is a matchmaking survey ideated in February
                  2019. Our machine learning algorithm uses your survey to 
                  pair you with other Cornell students — your Perfect Matches! 
                  This year, we are back with fun survey questions, 
                  improved matching algorithm, and better privacy protection measures! 
                  Don&apos;t hesitate to get in for a Valentine&apos;s Day you
                  won&apos;t forget!
                </p>
                {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
              </div>
              <div className="sm:w-5/12">
                <img className="rounded-lg" src="\new_cupid.png"/>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white pt-3 sm:pb-5 pb-1">
          <div style={{marginLeft:"15%", marginRight: "15%", marginBottom: "50px"}}>
          {/* source: https://tailwind-elements.com/docs/standard/components/timeline/ */}
            <ol className="hidden sm:block sm:border-xl-0 sm:border-t-2 border-rose-300 sm:flex sm:gap-6">
              <li>
                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                  <div className="sm:-mt-4 text-2xl -ml-1">💓</div>
                  <p className="text-rose-400 text-l my-2 font-bold">02-01-23 5PM</p>
                </div>
                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">PM2023 is Launched!</h4>
                  <p className="text-gray-500 mb-3">Sign in with your Cornell email. Then fill out your profile and the survey! For updates on PM23, follow us on <a className="underline" href="https://www.instagram.com/cornellperfectmatch/?hl=en">IG</a>. </p>
                </div>
              </li>
              <li>
                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                  <div className="sm:-mt-4 text-2xl">💘</div>
                  <p className="text-rose-400 text-l my-2 font-bold">02-13-23 Noon</p>
                </div>
                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">PM Closes!</h4>
                  <p className="text-gray-500 mb-3">Hurry up! Cupid is flying away! Make sure to submit your response on time.</p>
                </div>
              </li>
              <li>
                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                  <div className="sm:-mt-4 text-2xl">💞</div>
                  <p className="text-rose-400 text-l my-2 font-bold">02-13-23 Night</p>
                </div>
                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">Matches Out!</h4>
                  <p className="text-gray-500 mb-3">An email will be sent to you when your perfect matches are out. Go ahead and shoot your shot! </p>
                </div>
              </li>
              <li>
                <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                  <div className="sm:-mt-4 text-2xl">❤️‍🔥</div>
                  <p className="text-rose-400 text-l my-2 font-bold">02-14-23</p>
                </div>
                <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">It&apos;s Valentine&apos;s Day!</h4>
                  <p className="text-gray-500 mb-3">It&apos;s that time of the year! Grab some food with your perfect matches!</p>
                </div>
              </li>
            </ol>

            <ol className="border-l-2 border-rose-300 sm:hidden">
              <li>
                <div className="flex flex-start items-center pt-3">
                  <div className="-ml-3 mr-3 text-2xl">💞</div>
                  <p className="text-rose-400 text-l font-bold">02-01-23 5PM</p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">PM2023 is Launched!</h4>
                  <p className="text-gray-500 mb-3">Sign in with your Cornell email. Then fill out your profile and the survey! For updates on PM23, follow us on <a className="underline" href="https://www.instagram.com/cornellperfectmatch/?hl=en">IG</a>.</p>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <div className="-ml-3 mr-3 text-2xl">💘</div>
                  <p className="text-rose-400 text-l font-bold">02-13-23 Noon</p>
                </div>
                <div className="mt-0.5 ml-4 mb-6">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">PM Closes!</h4>
                  <p className="text-gray-500 mb-3">Hurry up! Cupid is flying away! Make sure to submit your response on time.</p>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <div className="-ml-3 mr-3 text-2xl">💞</div>
                  <p className="text-rose-400 text-l font-bold">02-13-23 Night</p>
                </div>
                <div className="mt-0.5 ml-4 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">Matches Out!</h4>
                  <p className="text-gray-500 mb-3">An email will be sent to you when your perfect matches are out. Go ahead and shoot your shot!</p>
                </div>
              </li>
              <li>
                <div className="flex flex-start items-center pt-2">
                  <div className="-ml-3 mr-3 text-2xl">❤️‍🔥</div>
                  <p className="text-rose-400 text-l font-bold">02-14-23</p>
                </div>
                <div className="mt-0.5 ml-4 pb-5">
                  <h4 className="text-gray-800 font-semibold text-xl mb-1.5">It&apos;s Valentine&apos;s Day!</h4>
                  <p className="text-gray-500 mb-3">It&apos;s that time of the year! Grab some food with your perfect matches!</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="text-gray-500 bg-pink-100 flex">
          <div className="container px-5 sm:px-0 py-16 sm:py-24 mx-auto sm:mx-[15%]">
            <div className="text-center mb-15">
              <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-rose-400 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2">
              <div className="w-full lg:w-1/2 px-4">
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What is Perfect Match?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    Perfect Match is a matchmaking service for Cornell students and faculty.
                    It uses machine learning algorithms to match participants based on their
                    responses to the survey. Every year, the survey opens in
                    early Feburary and has thousands of participants.
                    Matches are released the weekend before Valentine&apos;s day.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold bg-white rounded-md py-2 px-4">
                    How many matches will I get?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>Most participants get between 4 and 7 matches.</p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What should I do when I receive my Matches?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    It&apos;s up to you! Contact your Matches in any way
                    you&apos;d like. We will provide some suggestions for how to
                    connect when matches are released.
                  </p>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What algorithm does Perfect Match use?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    The Perfect Match algorithm can be broken into two parts:
                    scoring and matching. First, we use our machine learning
                    algorithm to score compatability between you and all other
                    participants who satisfy your main criteria, as determined
                    by your responses. We then use a variant of the Hungarian
                    algorithm to generate optimal matches based on these scores.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What happens to my data?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    Your data is safe with us! We will never share your data
                    with a third party, and we will only interact with your
                    information as needed to resolve user issues. We may collect
                    anonymous statistics to improve our algorithm, but your
                    identity will always be separated from such reports.
                    More FAQ&apos;s about user privacy can be found <a href="\statistics#privacy" className="underline">here</a>.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What is the Perfect Match team like?

                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    Will add the answer tmr.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    How can I contact the Perfect Match team?
                  </summary>

                  <p style={{paddingTop: "10px", paddingLeft: "15px"}}>
                    Our contact information is right below. Feel free to follow us on <a className="underline" href="https://www.instagram.com/cornellperfectmatch/?hl=en">IG</a> or chat with us on <a className="underline" href="https://www.reddit.com/user/PerfectMatch2020/">
                    Reddit</a>!
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="bg-white dark:bg-gray-600">
          <div className="py-8 mx-auto max-w-screen-xl lg:py-16 mx-[5%] sm:mx-[15%]">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 dark:text-white">
                Contact Us!
              </h2>
              <p className="mb-4 font-light"></p>
              <p className="mb-4 font-medium">
                Feel free to reach out with questions, suggestions, comments.{" "}
              </p>
              <p className="mb-4 font-medium">
                {" "}
                Email:{" "}
                <a className="underline" href={"mailto:cornell.perfectmatch@gmail.com"}>
                  cornell.perfectmatch@gmail.com
                </a>
              </p>
              <p className="mb-4 font-medium">
                Instagram: {" "}
                <a className="underline" href={"https://www.instagram.com/cornellperfectmatch/?hl=en"}>
                  cornellperfectmatch
                </a>
              </p>
              <p className="mb-4 font-medium">
                Reddit: {" "}
                <a className="underline" href={"https://www.reddit.com/user/PerfectMatch2020/"}>
                  PerfectMatch2020
                </a>
              </p>

              <div className="flex justify-center space-x-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7" > <Link href="https://www.instagram.com/cornellperfectmatch/"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></Link>


              {/* <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7" ><Link href="https://www.linkedin.com/company/cornell-perfect-match/"> <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg> </Link> */}

                {/* <Link href="https://www.reddit.com/user/PerfectMatch2020/"> <path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z" /></svg></Link> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
