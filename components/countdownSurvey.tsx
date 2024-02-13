import { count } from 'console';
import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import { GoogleAuth } from '@/components/general';

function CountDownSurvey(){
    const countdownDate = new Date('February 13, 2024 12:00:00 EST');
    const { data: currentCount, error } = useSWR('/api/count', fetcher, {
        refreshInterval: 60000,
    });

    const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <p className="font-bold text-lg mx-2 pt-6 lg:max-w-lg sm:mx-auto lg:text-left text-center lg:text-xl text-gray-500 sm:leading-relaxed">
                Thanks for filling out PM24! Let the magic begins🔮!
                </p>
        } else {
            return (
                <section className="flex flex-col">
                    <p className="lg:text-lg my-4 text-gray-600 font-bold">
                        Hurry up! Cupid is flying away. PM2024 closes in ...
                    </p>
                    <div className="gap-x-2 flex font-extrabold mx-auto lg:mx-0">
                        <span className="w-20 sm:w-28 flex flex-col">
                            <span className="text-3xl sm:text-4xl text-rose-400">{hours}</span>
                            <span className="text-lg text-gray-600 sm:text-xl">Hours</span>
                        </span>
                        <span className="w-20 sm:w-28 flex flex-col">
                            <span className="text-3xl sm:text-4xl text-rose-400">{minutes}</span>
                            <span className="text-lg text-gray-600 sm:text-xl">Minutes</span>
                        </span>
                        <span className="w-20 sm:w-28 flex flex-col">
                            <span className="text-3xl sm:text-4xl text-rose-400">{seconds}</span>
                            <span className="text-lg text-gray-600 sm:text-xl">Seconds</span>
                        </span>
                    </div>
                </section>
            );
        }
    };
    return (
        <section>
            <Countdown date={countdownDate} renderer={renderer} />
        </section>
    );
}

export default CountDownSurvey;