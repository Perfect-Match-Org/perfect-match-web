import React, { useState, useMemo } from 'react';

const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳'];
const color = [
    'text-rose-400',
    'text-orange-400',
    'text-yellow-400',
    'text-lime-500',
    'text-emerald-400',
    'text-sky-400',
    'text-purple-400',
];



export function MatchTileChat() {


    const matchEmoji = useMemo(() => {
        return emoji[Math.floor(Math.random() * emoji.length)];
    }, []);

    return (
        <div className="grid gap-1 mb-2 lg:mb-1 md:grid-cols-1 flex border-t-10% border-gray-300">
            <div className="items-center rounded-lg shadow-xl flex sm:mx-[10%] ">
                <div className="flex sm:contents">
                    <div className="text-8xl mt-4 sm:mt-0 sm:text-9xl mx-auto sm:ml-12 sm:mr-0">{matchEmoji}</div>
                </div>
                <div className="p-3 pt-1 sm:pl-10 sm:pr-16 sm:py-5">
                    <h3 className="text-3xl font-bold font-botracking-tight text-gray-500">
                        <span className={color[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}>
                            Pratyush
                        </span>
                    </h3>
                    <hr className="h-0.5 my-2 bg-rose-200 border-0"></hr>
                    <p className="text-gray-500">
                        📚 2022, Computer Science
                    </p>
                    <p className="text-gray-500 ">📍 NYC</p>
                    <p className="mt-3 sm:mt-4 mb-2 text-gray-500">
                        Three words to describe me:{' '}
                        <span className="font-bold">Word</span>!
                    </p>
                    <p className="mb-3 sm:mb-3 text-gray-500">
                        First song on my hookup playlist: 🎶
                        <span className="font-bold">Party in the USA</span>
                    </p>
                    <p className="mb-4 sm:mb-3 text-gray-500">
                        Bio: <span className="font-bold">Profile Here</span>
                    </p>



                </div>
            </div>
        </div>
    );
}

export default MatchTileChat;
