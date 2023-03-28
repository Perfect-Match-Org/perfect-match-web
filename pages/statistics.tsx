import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import DescribeYou from "../components/analytics/apex-charts/describeYou";
import DescribePartner from "../components/analytics/apex-charts/describePartner";
import Year from "../components/analytics/apex-charts/year";
import Height from "../components/analytics/apex-charts/height";
import LongestRelation from "../components/analytics/apex-charts/longestRelation";
import NumDatedGender from "../components/analytics/apex-charts/numDated";
import NumDatedCollege from "../components/analytics/apex-charts/numDatedCollege";
import Extroverted from "../components/analytics/apex-charts/extroverted";
import Easygoing from "../components/analytics/apex-charts/easygoing";
import Political from "../components/analytics/apex-charts/political";
import TimeOrMoney from "../components/analytics/apex-charts/timeOrMoney";
import SimilarInterest from "../components/analytics/apex-charts/similarInterest";
import FirstDate from "../components/analytics/apex-charts/firstDate";
import FridayNight from "../components/analytics/apex-charts/fridayNight";

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
                <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-lg text-gray-500 sm:leading-relaxed">
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
        <hr className="border-2 border-rose-300" />
        <section className="bg-white pt-12 sm:pt-16 lg:pt-24 sm:pb-5 pb-1">
          <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            About Participants of PM22
          </h2>
          <p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            In 2022, we received <strong className="text-rose-400"> 3,677 </strong> 
            valid responses. Here is a look at the results of the survey!
          </p>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <p className="my-8 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            <strong className="text-rose-400">CS</strong> students seem to really 
            need our help; 519 of them participated in PM22. The second place went 
            to <strong className="text-rose-400">Biological Science</strong> with 258 
            participants.
          </p>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8">
            <p className="my-4 sm:lg-8 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]"> 
              <strong className="text-rose-400">Juniors</strong> made up the highest 
              proportion of the PM22 client body. Also interesting to notice is that 
              <strong className="text-rose-400"> 5 faculty members </strong>filled out 
              the survey! 
            </p>
            <div className="sm:mx-[10%] lg:mx-[20%] -mb-12 -mt-4 sm:my-4">
              <Year />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              For better or worse, <strong className="text-rose-400">height </strong> 
              is one of the first qualities that people evaluate when looking for a 
              significant other. For female participants, the median height is 
              <strong className="text-rose-400"> 65 inches</strong>, and for male 
              participants, it is <strong className="text-rose-400">70 inches</strong>. 
              Interested to see how your height compares to other students&apos;?
            </p>
            <div className="sm:mx-[10%] lg:mx-[20%] -mb-2 -mt-4 sm:my-4">
              <Height />
            </div>
            <p className="mx-[5%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
              *Participants who gave their gender as non-binary individual or 
              other are excluded due to small sample size.
            </p>
          </div>
        </section>
        <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
        <section className="bg-white pt-12 sm:pt-16 lg:pt-20 sm:pb-5 pb-1">
          <h2 className="mb-6 text-2xl sm:text-4xl tracking-tight font-extrabold text-rose-400 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            About Dating and More
          </h2>
          <div className="mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            <h3 className="text-xl text-rose-300 font-bold sm:text-2xl lg:pt-4">
              Key Takeaways
            </h3>
            <ul className="list-disc mb-8 sm:mb-12">
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                Don&apos;t sweat if you have never been in a relationship before. 
                <strong className="text-rose-400"> 30%</strong> of participants said 
                they had never been in a relationship.
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                Only <strong className="text-rose-400">50%</strong> of CS students had 
                their longest relationship &gt;= 3 months.
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                <strong className="text-rose-400">AAP</strong> students tended to have 
                the most long-lasting relationship. They also had dated the most people in the last 
                five years.
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                The median number of people that the participants had dated in the 
                last five years was <strong className="text-rose-400">1</strong>.
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                <strong className="text-rose-400">&quot;Funny&quot; and &quot;smart&quot; </strong>
                were the top adjectives used by people to describe themselves and their 
                ideal partner. 
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                Only 6.5% of participants said they spent their typical Friday night studying.
              </li>
              <li className="my-3 lg:my-5 max-w-4xl sm:text-lg text-gray-500">
                Only a few people said they preferred to be paired with someone 
                who is less easygoing or extroverted than themselves.
              </li>
            </ul>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8 sm:my-12">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              We asked participants to give the length of their longest relationship. 
              The results indicate that <strong className="text-rose-400">AAP and ILR </strong>
              students tend to be in longer relationships.
            </p>
            <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-4 text-rose-400 sm:mb-0 sm:mt-8 sm:text-base">
                Longest Relationship (in Months), by College
              </h3>
              <LongestRelation />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8 sm:my-12">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              We also asked participants to give the
              number of people they had dated in the last five years. It is 
              interesting to observe how female and male participants, and students in 
              different colleges, gave different numbers.
            </p>
            <div className="sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-4 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Number of People one had Dated, by Gender
              </h3>
              <NumDatedGender />
            </div>
            <p className="mx-[5%] sm:mx-[10%] lg:mx-[20%] text-xs sm:text-sm text-gray-400 mb-4">
              *Participants who gave their gender as non-binary individual or 
              other are excluded due to small sample size.
            </p>
            <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-4 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Number of People one Had Dated, by College
              </h3>
              <NumDatedCollege />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8 sm:my-12">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              Participants used surprisingly similar words when asked to 
              describe themselves in three adjectives. <strong className="text-rose-400">&quot;Funny&quot; </strong>
              took the first place, without a doubt. <strong className="text-rose-400">&quot;Smart&quot; 
              and &quot;caring&quot;</strong> were also popular options.
            </p>
            <div className="sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-2 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Top Adjectives Used to Describe Oneself
              </h3>
              <DescribeYou />
            </div>
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              <strong className="text-rose-400">&quot;Funny,&quot; &quot;smart,&quot; and &quot;caring&quot; </strong>
              were also the top adjectives used to describe an ideal partner by the 
              participants. <strong className="text-rose-400">&quot;Loyal&quot;</strong> was the only word popular in this 
              question (describing an ideal partner) but not in the previous 
              question (describing yourself).
            </p>
            <div className="sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-2 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Top Adjectives Used to Describe Ideal Partner
              </h3>
              <DescribePartner />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8 sm:my-12">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              People also rated whether they were more extroverted or 
              introverted, easygoing or assertive. Notice that only a few of 
              them said they preferred to be paired with someone who is less 
              easygoing or extroverted than themselves. 
            </p>
            <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-2 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Extroverted or Introverted
              </h3>
              <Extroverted />
            </div>
            <div className="-mb-4 sm:mx-[10%] lg:mx-[20%]">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-2 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Easygoing or Assertive
              </h3>
              <Easygoing />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <div className="my-8 sm:my-12">
            <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
              38.5% of participants thought that differences in political views 
              were a deal breaker. Here is how people rated their political 
              tendencies on a scale of 1 to 10, with 1 being the farthest left 
              and 10 being the most right.
            </p>
            <div className="-mb-8 sm:mx-[10%] lg:mx-[20%] sm:-mb-28 md:-mb-36 lg:-mb-48">
              <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                Political Tendency
              </h3>
              <Political />
            </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%]" />
          <p className="mt-8 mb-4 sm:mt-12 sm:mb-0 lg:mb-4 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]"> 
            Answers to our controversial questions remained pretty consistent 
            between 2021 and 2022.
          </p>
          <div className="sm:flex sm:mx-[10%] lg:mx-[20%]">
          <div className="mt-6 sm:mt-0 sm:w-[50%]">
            <div className="justify-center sm:h-20">
              <p className="mt-6 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[5%] sm:mx-0 font-semibold text-center">
                Would you rather have more time, influence, or money?
              </p>
            </div>
            <div>
              <TimeOrMoney />
            </div>
          </div>
          <div className="sm:w-[50%]">
            <div className="justify-center sm:h-20">
              <p className="mt-6 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[5%] sm:mx-0 font-semibold text-center">
                Would you like to be paired with someone who has mostly similar or different interests 
                to you?
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
              <p className="mt-6 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[5%] sm:mx-0 font-semibold text-center">
                Where would you go on a first date?
              </p>
            </div>
            <div>
              <FirstDate />
            </div>
          </div>
          <div className="sm:w-[50%]">
            <div className="justify-center sm:h-14">
              <p className="mt-6 sm:my-10 max-w-4xl lg:text-lg text-gray-500 mx-[5%] sm:mx-0 font-semibold text-center">
                What would an average Friday night look like?
              </p>
            </div>
            <div>
              <FridayNight />
            </div>
          </div>
          </div>
          <hr className="border-1 border-solid border-rose-300 mx-[5%] sm:mx-[10%] lg:mx-[20%] my-8 sm:mt-10" />
          <p className="mt-4 sm:mt-8 mb-10 sm:mb-12 lg:mt-12 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
            Thanks for taking Perfect Match this year and don&apos;t be afraid to shoot your 
            shot!
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
