import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { emojiBlast } from "emoji-blast";

const CountDown: React.FC = () => {
    const countdownDate = new Date('Feb 12, 2025 12:00:00 EST');
    const [hasMounted, setHasMounted] = useState(false);

    type RemainingTime = {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        total: number
    };

    const calculateTimeRemaining = (launchDate: Date): RemainingTime => {
        // Calculate the time remaining (in milliseconds) between the launch date and start date
        const time = launchDate.getTime() - new Date().getTime();
        const gap = time < 0 ? 0 : time;
        // Calculate days, hours, and minutes remaining
        const days = Math.floor(gap / (1000 * 60 * 60 * 24));
        const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((gap / (1000 * 60)) % 60);
        const seconds = Math.floor((gap / 1000) % 60);
        return { days, hours, minutes, seconds, total: gap };
    };

    const [timeRemaining, setTimeRemaining] = useState<RemainingTime>(calculateTimeRemaining(countdownDate));
    const [completed, setCompleted] = useState(false);
    const { days, hours, minutes, seconds } = timeRemaining;
    const [easterEggTextDisplay, setEasterEggTextDisplay] = useState(false);

    function easterEggTextChange() {
        setEasterEggTextDisplay(true);
        setTimeout(() => {
            setEasterEggTextDisplay(false);
        }, 3000);
    }

    function easterEggFireHeart() {
        const heartCoords = [
            [500, 600],
            // bottom point
            [500, 410],
            // center point
            // left line (y = x + 100)
            [350, 450],
            [375, 475],
            [400, 500],
            [425, 525],
            [450, 550],
            [475, 575],
            // right line (y = -x + 1100)
            [650, 450],
            [623, 477],
            [600, 500],
            [550, 550],
            [574, 526],
            [526, 574],
            // left curve
            [340, 410],
            [340, 430],
            [350, 385],
            [370, 365],
            [400, 350],
            [430, 355],
            [460, 370],
            [480, 385],
            // right curve
            [520, 385],
            [540, 370],
            [570, 355],
            [600, 350],
            [630, 365],
            [650, 385],
            [660, 410],
            [660, 430]
        ];
        const randXVelocity = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);
        const randYVelocity = Math.random() * -15 - 3;
        const randStartXCoord = Math.random() * 350 * (Math.round(Math.random()) ? 1 : -1);
        const randStartYCoord = Math.random() * 350 * (Math.round(Math.random()) ? 1 : -1);
        for (const [xCoordinate, yCoordinate] of heartCoords) {
            emojiBlast({
                emojiCount: 1,
                emojis: ["❤️‍🔥"],
                physics: {
                    fontSize: 35,
                    gravity: 0.15,
                    initialVelocities: {
                        x: randXVelocity,
                        y: randYVelocity
                    },
                    rotation: 0,
                    rotationDeceleration: 0
                },
                position: {
                    x: xCoordinate + randStartXCoord,
                    y: yCoordinate + randStartYCoord
                }
            });
        }
    }

    function easterEggShootingHeart() {
        const star = (yPos: number): void => {
            emojiBlast({
                emojiCount: 1,
                emojis: ["💖"],
                physics: {
                    fontSize: { max: 32, min: 20 },
                    gravity: 0.05,
                    initialVelocities: {
                        x: 45,
                        y: -10
                    }
                },
                position: {
                    x: 0,
                    y: yPos
                }
            });
        };
        const sparkles = (yPos: number, size: number): void => {
            emojiBlast({
                emojiCount: 1,
                emojis: ["✨"],
                physics: {
                    fontSize: size,
                    gravity: 0.05,
                    initialVelocities: {
                        rotation: 0,
                        x: 45,
                        y: -10
                    }
                },
                position: {
                    x: 0,
                    y: yPos
                }
            });
        };
        const shootingStar = () => {
            const randYPos = Math.random() * innerHeight + 100;
            let emojiSize = 18;
            star(randYPos);
            const intervalId2 = setInterval(() => {
                sparkles(randYPos, emojiSize);
                emojiSize -= 3;
            }, 60);
            setTimeout(() => {
                clearInterval(intervalId2);
            }, 400);
        };
        const intervalId = setInterval(shootingStar, 60);
        setTimeout(() => {
            clearInterval(intervalId);
        }, 2e3);
    }

    useEffect(() => {
        setHasMounted(true);
        const timer = setInterval(() => {
            const newTime = calculateTimeRemaining(countdownDate);
            setTimeRemaining(newTime);
            if (newTime.total <= 1) {
                setCompleted(true);
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='z-10 max-w-[85vw] w-full min-w-fit h-full relative'>
            <div className="w-full relative h-2 -z-10">
                {/* Alarm Top buttons */}
                <div className='absolute mx-[5%] my-[0.2%] bg-red-600 w-[10%] h-3 border-2 border-blue-900 rounded-xl' />
                <div className='absolute mx-[18%] my-[0.2%] bg-red-600 w-[10%] h-3 border-2 border-blue-900 rounded-xl' />
                <div className='absolute mx-[31%] my-[0.2%] bg-red-600 w-[20%] h-3 border-2 border-blue-900 rounded-xl' />
            </div>
            <div className="bg-[#FBE7F3] min-h-fit h-full rounded-lg p-5 border-blue-900 border-4 z-10 ">
                <div className="flex flex-grid w-full h-full">
                    <div className="flex items-center justify-center h-full w-[90%] bg-[#00162F] text-white text-3xl rounded-lg lg:p-2">
                        <div className="flex items-center text-3xl sm:text-4xl space-x-2 px-4 md:px-2 font-press-start lg:text-6xl w-full justify-center">
                            <div className="flex flex-col items-center">
                                <span className={completed ? 'animate-flash' : ''}>{hasMounted ? (easterEggTextDisplay ? '0' : (days > 0 ? days : hours)) : '0'}</span>
                                <span className="text-[10px] leading-5 sm:text-sm lg:text-base tracking-wider">{easterEggTextDisplay ? 'I' : (days > 0 ? 'days' : 'hours')}</span>
                            </div>
                            <div className="flex flex-col items-center text-center w-fit">
                                <span className='text-lg lg:text-3xl -mx-3'>:</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={completed ? 'animate-flash' : ''}>{hasMounted ? (easterEggTextDisplay ? '-' : (days > 0 ? hours : minutes)) : '0'}</span>
                                <span className="text-[10px] leading-5 sm:text-sm lg:text-base tracking-wider">{easterEggTextDisplay ? "Can't" : (days > 0 ? 'hours' : 'minutes')}</span>
                            </div>
                            <div className="flex flex-col items-center text-center w-fit">
                                <span className='text-lg lg:text-3xl -mx-3'>:</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={completed ? 'animate-flash' : ''}>{hasMounted ? (easterEggTextDisplay ? '0' : (days > 0 ? minutes : seconds)) : '0'}</span>
                                <span className="text-[10px] leading-5 sm:text-sm lg:text-base tracking-wider">{easterEggTextDisplay ? "Wait" : (days > 0 ? 'minutes' : 'seconds')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[10%] relative flex flex-col justify-end'>
                        <div className='h-1/2'>
                            <div className='absolute top-0 -right-[5%]'>
                                <div className='grid grid-cols-2 gap-2'>
                                    {Array(6).fill(0).map((_, i) => (
                                        <div key={i} className='w-2 h-2 rounded-full bg-pmblue-500' />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="my-1 flex flex-col space-y-2 items-center mt-auto">
                            <button
                                className="
                                w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-500 border-2 border-blue-600 font-semibold
                                shadow-[4px_4px_0px_0px_rgba(59,130,246,0.5)] transition-all
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,0.5)]
                                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                                onClick={easterEggTextChange}
                            ></button>
                            <button
                                className="
                                w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-blue-500 border-2 border-blue-600 font-semibold
                                shadow-[4px_4px_0px_0px_rgba(59,130,246,0.5)] transition-all
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,0.5)]
                                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                                onClick={easterEggFireHeart}
                            ></button>
                            <button
                                className="
                                w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-500 border-2 border-blue-600 font-semibold
                                shadow-[4px_4px_0px_0px_rgba(59,130,246,0.5)] transition-all
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,0.5)]
                                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                                onClick={easterEggShootingHeart}
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-pmred-500 w-full h-full -z-20 absolute top-[6%] left-[4%] rounded-lg' />
            <div className='absolute -top-[60%] w-full h-[85%] flex justify-end'><Image src='/scream_bubble.svg' alt='scream bubble' height={200} width={300} priority={true} draggable='false' /></div>
        </div>
    );
}

export default CountDown;
