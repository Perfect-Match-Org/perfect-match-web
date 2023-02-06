import styles from "../styles/Home.module.css";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

import politicsImg from "/analytics/images/politics.png";
import heatmenImg from "/analytics/images/heatmen.png";
import heatwomenImg from "/analytics/images/heatwomen.png";
import heightImg from "/analytics/images/height.png";
import personality1Img from "/analytics/images/personality1.png";
import personality2Img from "/analytics/images/personality2.png";
import personality3Img from "/analytics/images/personality3.png";
import personality4Img from "/analytics/images/personality4.png";
import personality5Img from "/analytics/images/personality5.png";
import selfbeliefsImg from "/analytics/images/selfbeliefs.png";
import sleepImg from "/analytics/images/sleep.png";

const Statistics: any = (props: any) => {
  return (
    <div>
      <Head>
        <title>Statistics</title>
      </Head>
      <Header />
      <div>
        <div>
          {" "}
          <section
            className="sm:mx-[5%]"
            style={{
              marginBottom: "20px",
              marginTop: "10px",
              backgroundImage: 'url("networks.png")',
              height: "100%",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right top",
            }}
          >
            <div className="mx-auto max-w-screen-xl pt-[70%] pb-10 lg:items-center sm:pt-60 sm:pb-36">
              <div className="max-w-xl text-center sm:text-left sm:ml-[8%] mt-8 sm:mt-0">
                <h1 className="text-3xl font-extrabold text-rose-400 sm:text-5xl">
                  Can Love be Visualized?
                </h1>
                <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
                  <strong>
                    Perhaps not without daydreaming about your crush, but your
                    survey responses can!
                  </strong>{" "}
                  Join us on this journey to learn about some of the preferences
                  and habits we&apos;ve discovered from several years of survey
                  responses!
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white pt-3 sm:pb-5 pb-1">
          <Script src="https://d3js.org/d3.v7.min.js"></Script>
          <Script src="https://d3js.org/topojson.v3.min.js"></Script>
          <p className="my-4 lg:my-10 mx-[5%] sm:mx-[10%] lg:mx-[20%] max-w-4xl sm:text-xl text-gray-500">
            In 2021,{" "}
            <strong className="text-rose-400 font-extrabold">4273</strong>{" "}
            participants signed up to meet their Perfect Match. Here is a look
            at the results of the survey!
          </p>
          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              We asked participants to both rate their{" "}
              <strong className="text-rose-400">political tendencies </strong>{" "}
              on a scale of 1 to 10, with 1 being the farthest left and 10 being
              the most right, and rate their political activity on a scale of 1
              to 5.
            </p>

            <Image
              src={politicsImg}
              alt="A look into user political beliefs!"
              width={800}
              height={400}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              Participants also gave{" "}
              <strong className="text-rose-400">
                the minimum and maximum ages they would be willing to be matched
                with
              </strong>
              . We expected men and women to answer differently, but we were not
              prepared for just how differently men and women responded. This is
              a look at how age preferences broke down by gender.
            </p>

            <Image
              src={heatmenImg}
              alt="A look into user (men) age preferences!"
              width={800}
              height={400}
            ></Image>
          </div>

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}

            <Image
              src={heatwomenImg}
              alt="A look into user (women) age preferences!"
              width={800}
              height={400}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              For better or worse,{" "}
              <strong className="text-rose-400">height</strong> is one of the
              first qualities that people evaluate when looking for a
              significant other. Interested to see how your height compares to
              other students&apos; on campus?
            </p>

            <Image
              src={heightImg}
              alt="What do users think about height?"
              width={800}
              height={400}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              Answers to our controversial questions remained pretty consistent
              between 2020 and 2021. The biggest change from 2021&apos;s results
              was the share of participants who said they would not start
              college again if given the chance.
            </p>

            <Image
              src={personality1Img}
              alt="Some deep personality questions..."
              width={800}
              height={400}
            ></Image>
          </div>

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}

            <Image
              src={personality2Img}
              alt="Some deep personality questions..."
              width={800}
              height={400}
            ></Image>
          </div>

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}

            <Image
              src={personality3Img}
              alt="Some deep personality questions..."
              width={1000}
              height={500}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              We asked participants to describe themselves in a few adjectives.
              Here is the list of{" "}
              <strong className="text-rose-400">
                the top 20 adjectives used
              </strong>
              , separated into three categories. It&apos;s interesting how
              similar the adjectives are between genders.
            </p>

            <Image
              src={selfbeliefsImg}
              alt="Some deep personality questions..."
              width={800}
              height={600}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
        </section>

        <section className="bg-white pt-3 sm:pb-5 pb-1">
          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              Need to know{" "}
              <strong className="text-rose-400">
                the best time to plan a date or make an impromptu phone call
              </strong>
              ? Here is the aggregate data on when people are most likely to
              fall asleep and wake up.
            </p>

            <Image
              src={sleepImg}
              alt="Some deep personality questions..."
              width={800}
              height={400}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <div className="mb-10 flex items-center flex-col">
            {/* insert visualizations here */}
            <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
              Finally, don&apos;t sweat if you have never been in a relationship
              before. We asked participants to give both the number of people
              they had dated and the length of their longest relationship. The
              results were encouraging:{" "}
              <strong className="text-rose-400">
                31% of people said they had never been in a relationship
              </strong>
              .
            </p>

            <Image
              src={personality5Img}
              alt="Some deep personality questions..."
              width={800}
              height={350}
            ></Image>
          </div>

          <hr className="border-1 border-dotted border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />

          <p className="mt-5 mx-[5%] sm:mx-[10%] lg:mx-[20%] mb-3 sm:mb-6 max-w-4xl sm:text-xl text-gray-500 sm:leading-relaxed">
            Thanks for taking Perfect Match this year and don&apos;t be afraid
            to shoot your shot!
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

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    Absolutely not! All user data collected from our surveys is
                    anonymized, and then privately stored. Only your name and
                    provided contact information is shared, and that is only
                    with your matches.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold bg-white rounded-md py-2 px-4 cursor-pointer">
                    Can I be identified from these statistics?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    <strong>
                      Preserving the privacy of our participants is our utmost
                      concern and is rooted behind every decision made in
                      crafting these visualizations.
                    </strong>{" "}
                    We have taken several measures to remove any identifiable
                    characteristics from the data we have collected, and the
                    resulting datasets are randomly shuffled.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                    How are these visualizations generated?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    These visualizations were generated using the Pandas and
                    NumPy Python libraries, and the D3.js JavaScript library.
                  </p>
                </details>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                    Is my data sold to third-party advertisers?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    Absolutely not! All of your data is stored privately and
                    will not be viewed by any third party.
                  </p>
                </details>
                <details className="mb-5">
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
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
                  <summary className="font-semibold  bg-white rounded-md py-2 px-4 cursor-pointer">
                    Who can I contact if I have a privacy concern?
                  </summary>

                  <p style={{ paddingTop: "10px", paddingLeft: "15px" }}>
                    We greatly encourage you to reach out to us with any
                    questions or concerns that you may have regarding data
                    privacy. In fact, feedback from the Cornell community
                    already has and will continue to be used in to improve our
                    algorithm and measures to protect privacy. We can be reached
                    at{" "}
                    <Link href="mailto:cornell.perfectmatch@gmail.com">
                      cornell.perfectmatch@gmail.com!
                    </Link>
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
              <h2 className="mb-4 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 ">
                Contact Us!
              </h2>
              <p className="mb-4 font-light"></p>
              <p className="mb-4 font-medium">
                Feel free to reach out with questions, suggestions, comments.{" "}
              </p>
              <p className="mb-4 font-medium">
                {" "}
                Email:{" "}
                <a
                  href="mailto:cornell.perfectmatch@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  cornell.perfectmatch@gmail.com
                </a>
              </p>

              <div className="flex justify-center space-x-2"></div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
