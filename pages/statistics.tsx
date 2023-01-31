import styles from "../styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link";


const Statistics: any = (props: any) => {
  return (
    <div>
      <Header />
      <div>
        <div>
          {" "}
          <section className="sm:mx-[5%]" style={{ marginBottom: "10px", marginTop: "-10px", height: "100%" }}>
            <div className="mx-auto max-w-screen-xl pt-[70%] pb-10 lg:items-center sm:pt-60 sm:pb-36">
              <div className="max-w-xl text-center sm:text-left sm:ml-[8%] mt-8 sm:mt-0">
                <h1 className="text-3xl font-extrabold text-rose-400 sm:text-5xl">
                  Can Love be Visualized?
                </h1>
                <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
                  <strong>Perhaps not without daydreaming about your crush, but your survey responses can!</strong> Join
                  us on this journey to learn about some of the preferences and habits we've discovered from several years of
                  survey responses!
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white pt-3 sm:pb-5 pb-1">
          <script src="https://d3js.org/d3.v7.min.js"></script>
          <script src="https://d3js.org/topojson.v3.min.js"></script>
          <div style={{ marginLeft: "15%", marginRight: "15%", marginBottom: "50px" }}>
            {/* insert visualizations here */}
            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization header
            </p>

            <svg id="demographicsBar" width="500" height="500"></svg>
            <script src="demographicsBar.js"></script>


            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization explanation
            </p>
          </div>
        </section>

        <section className="bg-gray pt-3 sm:pb-5 pb-1">
          <div style={{ marginLeft: "15%", marginRight: "15%", marginBottom: "50px" }}>
            {/* insert visualizations here */}
            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization header
            </p>

            {/* <svg id="demographicsBar" width="500" height="500"></svg> */}
            {/* <script type="text/javascript" src="../d3scripts/demographicsBar.js"></script> */}

            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization explanation
            </p>
          </div>
        </section>

        <section className="bg-white pt-3 sm:pb-5 pb-1">
          <div style={{ marginLeft: "15%", marginRight: "15%", marginBottom: "50px" }}>
            {/* insert visualizations here */}
            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization header
            </p>

            {/* <svg id="demographicsBar" width="500" height="500"></svg> */}
            {/* <script type="text/javascript" src="../d3scripts/demographicsBar.js"></script> */}

            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Optional visualization explanation
            </p>
          </div>
        </section>

        <section className="text-gray-500 bg-pink-100">
          <div className="container px-5 sm:px-0 py-16 sm:py-24 mx-auto">
            <div className="text-center mb-15">
              <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-rose-400 sm:text-4xl">
                FAQ's about User Privacy
              </h2>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <div className="w-full lg:w-1/2 px-4">
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    Are my survey responses visible to others?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    Absolutely not! All user data collected from our surveys is anonymized, and then privately stored.
                    Only your name and provided contact information is shared, and that is only with your matches.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold bg-white rounded-md py-2 px-4">
                    Can I be identified from these statistics?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    <strong>Preserving the privacy of our participants is our utmost concern and is rooted behind every
                      decision made in crafting these visualizations.</strong> We have taken several measures to remove any
                    identifiable characteristics from the data we have collected, and the resulting datasets are randomly
                    shuffled.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    How are these visualizations generated?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    These visualizations were generated using the Pandas and NumPy Python libraries, and the D3.js JavaScript library.
                  </p>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    Is my data sold to third-party advertisers?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    Absolutely not! All of your data is stored privately and will not be viewed by any third party.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    What happens to my data?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    Your data is safe with us! We will never share your data
                    with a third party, and we will only interact with your
                    information as needed to resolve user issues. We may collect
                    anonymous statistics to improve our algorithm, but your
                    identity will always be separated from such reports.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4">
                    Who can I contact if I have a privacy concern?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    We greatly encourage you to reach out to us with any questions or concerns that you may have
                    regarding data privacy. In fact, feedback from the Cornell community already has and will continue
                    to be used in to improve our algorithm and measures to protect privacy. We can be reached at cornell.perfectmatch@gmail.com!
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
                <Link href={"mailto:cornell.perfectmatch@gmail.com"}>
                  cornell.perfectmatch@gmail.com
                </Link>
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

export default Statistics;