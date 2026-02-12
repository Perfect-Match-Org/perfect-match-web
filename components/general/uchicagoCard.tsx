import Image from 'next/image';

function UChicagoCard() {
    return (
        <div
            className={`h-full w-full absolute top-0 bottom-0 left-0 right-0
                    shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25),18px_12px_0px_0px_rgba(36,67,141,1)]
                    rounded-lg border-2 border-pmblue-500 sm:flex backface-hidden`}
        >
            <div className="flex flex-col bg-white rounded-lg mx-auto w-full h-full">
                <div className="relative pt-8 px-5 md:px-10 w-full z-20 lg:h-[90%] md:h-3/4">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                            <p className="uppercase tracking-[0.2em] text-xs font-semibold text-pmblue-400">
                                University of Chicago Study
                            </p>
                            <h3 className="font-dela-gothic text-4xl md:text-5xl text-pmred-500 mt-2">
                                Want More Matches?
                            </h3>
                            <p className="font-work-sans text-base md:text-lg text-pmblue-500 mt-4">
                                Try <span className="font-semibold text-pmpink-500">Dating with Data</span>, a research study on dating apps run by researchers at the
                                <span className="font-semibold text-pmblue-500"> University of Chicago</span>.
                            </p>
                        </div>
                        <div className="hidden md:block relative h-28 w-28">
                            <Image src="/matchcardpmlogo.svg" alt="Perfect Match" layout="fill" priority draggable="false" />
                        </div>
                    </div>

                    <div className="mt-6 font-work-sans text-pmblue-500 space-y-4">
                        <p className="text-lg md:text-xl font-semibold">
                            It's like a dating app... except <span className="text-pmpink-500">you get paid $20</span> just for using it!
                        </p>
                        <p className="text-base md:text-lg text-pmblue-400">
                            Join the study, share your dating preferences, and help researchers learn how to build better matches.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 font-work-sans">
                        <div className="bg-pmpink-100 rounded-lg p-4 border border-pmpink-500/40">
                            <p className="text-sm uppercase tracking-wider text-pmblue-400">What to do</p>
                            <p className="text-lg font-semibold text-pmblue-500">Use the app for the study period.</p>
                        </div>
                        <div className="bg-pmpink-100 rounded-lg p-4 border border-pmpink-500/40">
                            <p className="text-sm uppercase tracking-wider text-pmblue-400">What you get</p>
                            <p className="text-lg font-semibold text-pmblue-500">$20 guaranteed + better match insights.</p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row gap-4 font-work-sans">
                        <a
                            href="https://www.datingwithdata.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-center w-full md:w-1/2 bg-pmpink-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-pmpink-400 transition"
                        >
                            Learn More
                        </a>
                        <a
                            href="https://uchicago.co1.qualtrics.com/jfe/form/SV_08qzg4aRgjVWxJY"
                            target="_blank"
                            rel="noreferrer"
                            className="text-center w-full md:w-1/2 border-2 border-pmblue-500 text-pmblue-500 font-semibold py-3 rounded-md hover:bg-pmblue-50 transition"
                        >
                            Sign Up
                        </a>
                    </div>

                    <p className="mt-8 text-sm text-pmblue-400 font-work-sans italic">University of Chicago IRB25-1894</p>
                </div>
            </div>
        </div>
    );
}

export default UChicagoCard;
