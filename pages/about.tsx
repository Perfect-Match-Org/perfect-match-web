import styles from "../styles/Home.module.css";
import Head from 'next/head'
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link"


const About: any = (props: any) => {
  return (
    <div >
      <Header props={props} />


      <div>
        <div> <section className="bg-white dark:bg-gray-600">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Cupid just got smarter!</h2>

              <p className="mb-4"> Perfect Match is a matchmaking survey ideated in February 2019. Our machine learning algorithm uses your survey to pair you with other Cornell students— your Perfect Matches! Last year, we had over 4,200 participants. Share the link with your friends, and help spread some joy in 2023!
              </p>
              {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <img className="mt-4 w-full  rounded-lg" src="https://images.pexels.com/photos/8199567/pexels-photo-8199567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 2" />
              <img className="w-full lg:mt-10 rounded-lg" src="https://live.staticflickr.com/2365/2440359722_cbe9203bba_b.jpg" alt="office content 1" />
              <img className="mt-4 w-full lg:mt-20 rounded-lg" src="https://images.unsplash.com/photo-1566572176693-74c6688e0141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt=" office content 2" />

            </div>
          </div>
        </section></div>

        <section className="text-gray-700">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Frequently Asked Question
              </h1>

            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    What is Perfect Match
                  </summary>
                  <span>
                    Perfect Match is a matchmaking service that uses machine learning algorithms to match participants based on their reponses in their survey. Every year, the survey opens in early Feburary. Matches are released the weekend before Valentine&apos;s day.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                    How many matches will I get?
                  </summary>

                  <span>
                    Most participants get between 4 and 7 matches.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    What should I do when I receive my Matches?
                  </summary>

                  <span>
                    It&apos;s up to you! Contact your Matches in any way you&apos;d like. We will provide some suggestions for how to connect when matches are released.
                  </span>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4 py-2">
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    What algorithm does Perfect Match use?
                  </summary>

                  <span className="px-4 py-2">
                    The Perfect Match algorithm can be broken into two parts: scoring and matching. First, we use our machine learning algorithm to score compatability between you and all other participants who satisfy your main criteria, as determined by your responses. We then use a variant of the Hungarian algorithm to generate optimal matches based on these scores.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    What happens to my data?
                  </summary>

                  <span className="px-4 py-2">
                    Your data is safe with us! We will never share your data with a third party, and we will only interact with your information as needed to resolve user issues. We may collect anonymous statistics to improve our algorithm, but your identity will always be separated from such reports.
                  </span>
                </details>
                <details className="mb-4">
                  <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                    How can I contact the Perfect Match team?
                  </summary>

                  <span className="px-4 py-2">

                    Yes, our contact information is right below.
                  </span>
                </details>

              </div>
            </div>
          </div>
        </section>
      </div >
      <div >
        <section className="bg-white dark:bg-gray-600">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Contact Us!</h2>
              <p className="mb-4 font-light"></p>
              <p className="mb-4 font-medium">Feel free to reach out with questions, suggestions, comments. </p>
              <p className="mb-4 font-medium"> Email: Cornell.perfectmatch@gmail.com</p>

              <div className="flex justify-center space-x-2">


                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7" > <Link href="https://www.instagram.com/cornellperfectmatch/"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></Link>


              {/* <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7" ><Link href="https://www.linkedin.com/company/cornell-perfect-match/"> <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg> </Link> */}


                {/* <Link href="https://www.reddit.com/user/PerfectMatch2020/"> <path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z" /></svg></Link> */}


              </div>

            </div>
          </div >
        </section >
      </div >
      <Footer />
    </div >
  );
};

export default About;
