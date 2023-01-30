import { useState } from "react";

const Status: any = (props: any) => {
  const [optIn, setOptIn] = useState<Boolean>(props.optIn || false);
  const handleClick = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseURL}/api/optIn`, {
      method: "POST",
      body: JSON.stringify({ optIn: !props.profile?.optIn }),
    });
    const data = await res.json();
    setOptIn(data);
  };

  return (
    <div>
      <div className="px-2 sm:py-20 bg-lightblue">
        <div className="fle max-w-6xl mx-auto text-gray-600">
          <dl className="w-full md:w-full">
            <h2 className="pt-12 pb-6 w-full sm:py-4 mr-8 text-3xl text-gray-500 font-extrabold leading-9 md:w-1/3">
              Status
            </h2>
            <p className="mb-8 font-bold">
              {props.survey
                ? "You have completed the survey!"
                : "We are still waiting for you to complete the survey."}
            </p>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">Tasks</h3>
            </dt>
            <dd className="mb-8">
              Please complete all required steps to be included to this year&apos;s
              matching.
              <li>Opt In to indicate you are interested in participating. </li>
              <li>
                Complete the survey so our algorithm can make more sound decisions. It will take about 15 minutes.
              </li>
              <li>Input some crushes/forbidden matches if you&apos;d like.</li>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">Opt-Out</h3>
            </dt>
            <dd className="mb-8">
              <div className={optIn ? "text-green-500" : "text-red-400"}>
                <p>
                  {optIn
                    ? "You are currently opted-in to our 2023 matching process."
                    : "You are currently opted-out to our 2023 matching process."}
                </p>
              </div>

              <button
                onClick={handleClick}
                className={`mt-2 bg-transparent hover:bg-rose-500 font-semibold hover:text-white py-1 px-2 border hover:border-transparent rounded ${
                  optIn
                    ? "border-rose-500 text-rose-700"
                    : "border-green-500 text-green-700"
                }`}
              >
                {optIn ? "Opt-Out" : "Opt-In"}
              </button>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Status;
