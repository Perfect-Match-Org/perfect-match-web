import { count } from 'console';
import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

function CountDown() {
    const countdownDate = new Date('February 5, 2024 17:00:00 EST');

    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span>It is Perfect Match Time!</span>;
        } else {
            return (
                <div className="gap-x-4 flex">
                    <span className="w-20 sm:w-36 flex flex-col">
                        <span className="text-5xl sm:text-8xl">{days}</span>
                        <span className="text-xl text-gray-600 sm:text-2xl font-extrabold mt-2">Days</span>
                    </span>
                    <span className="w-20 sm:w-36 flex flex-col">
                        <span className="text-5xl sm:text-8xl">{hours}</span>
                        <span className="text-xl text-gray-600 sm:text-2xl font-extrabold mt-2">Hours</span>
                    </span>
                    <span className="w-20 sm:w-36 flex flex-col">
                        <span className="text-5xl sm:text-8xl">{minutes}</span>
                        <span className="text-xl text-gray-600 sm:text-2xl font-extrabold mt-2">Minutes</span>
                    </span>
                    <span className="w-20 sm:w-36 flex flex-col">
                        <span className="text-5xl sm:text-8xl">{seconds}</span>
                        <span className="text-xl text-gray-600 sm:text-2xl font-extrabold mt-2">Seconds</span>
                    </span>
                </div>
            );
        }
    };

    return (
        <section className="bg-rose-100">
            <div
                className=" max-w-screen-xl lg:px-6 lg:flex-row mx-[3%] sm:mx-[10%] lg:mx-[15%] sm:py-16 py-6 text-center
                "
            >
                <div className="font text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="text-xl text-gray-600 font-extrabold sm:text-3xl mb-4 mt-8">
                        Perfect Match Returns <span className="text-rose-400"> February 2024 😻 </span>
                    </h2>
                    <h2 className="text-xl text-gray-600 font-extrabold md:text-3xl mb-4">See you in ...</h2>
                    <div className="mt-10 mb-4 text-3xl sm:text-8xl font-bold text-rose-400 flex items-center justify-center">
                        <Countdown date={countdownDate} renderer={renderer} />
                    </div>
                    <p className="text-gray-600 sm:text-lg pt-6 flex sm:mx-[7%] lg:mx-[10%]">
                        This year, we are back with our revamped matching algorithm, powered by machine learning and
                        fueled by your feedback on PM23 🚀. And we add a live statistics dashboard 📊 to the launch.
                        Stay tuned! 💑🤖
                    </p>
                </div>
            </div>
        </section>
    );
}

export default CountDown;
