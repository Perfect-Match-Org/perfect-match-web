const Status: any = (props: any) => {
    return (
        <div>

            <div className="px-4 py-20 bg-lightblue">
                <div className="fle max-w-6xl mx-auto ">

                    <dl className="w-full md:w-full">
                        <h2 className="w-full py-4 mr-8 text-3xl font-extrabold leading-9 md:w-1/3">
                            Dashboard
                        </h2>
                        <dt className="mb-4">
                            <h3 className="text-xl font-semibold">
                                Tasks
                            </h3>
                        </dt>
                        <div className="w-full bg-gray-200 rounded-full">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center w-2/3 p-0.5 leading-none rounded-l-full"> 33%</div>
                        </div>
                        <dd className="mb-16">
                            Please complete all required steps to be included to this years matching.
                            <li> Complete the Survey</li>
                            <li>Input some Crushes</li>
                            <li>Input some forbidden matches</li>

                        </dd>
                        <dt className="mb-4">
                            <h3 className="text-xl font-semibold">
                                Opt-Out
                            </h3>
                        </dt>
                        <dd className="mb-16">
                            <div className="text-green-400">
                                <p>
                                    You are currently opted-in to our 2023 matching process.
                                </p>


                            </div>
                            <p>Pending completion of the survey, you will be matched with other Cornell students that have also filled out Perfect Match this year. </p>
                            <button className="bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded">
                                Opt-Out
                            </button>
                        </dd>
                        <dt className="mb-4">
                            <h3 className="text-xl font-semibold">
                                Need Help?
                            </h3>
                        </dt>
                        <dd className="mb-16">
                            <p>Common FAQ are answered on our About & Contact Page</p>
                            <p>
                                Email us at cornell.perfectmatch@gmail.com
                            </p>
                        </dd>
                    </dl>
                </div>
            </div>

        </div >
    );
}

export default Status;
