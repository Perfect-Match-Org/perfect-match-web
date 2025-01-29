import React from 'react';
import Link from 'next/link';

const Toggle = () => {
    const [show, toggleShow] = React.useState(true);

    return (
        <div>
            <button className="text-4xl text-gray-500" onClick={() => toggleShow(!show)}>
                {show ? '☰' : '✕'}
            </button>
            {!show && (
                <div className="flex">
                    <div className="dela-gothic-one">

                        <nav className="mt-3.5 z-10 absolute text-center mx-auto bg-pmpink-500 w-full right-0">
                            <ul>
                                <li className="text-gray-500 text-xl font-medium mt-4">
                                    <Link href="/">Home</Link>
                                </li>
                                {/* <li className="text-gray-500 text-xl font-medium mt-5">
                                <Link href="/dashboard">Live Dashboard</Link>
                            </li> */}
                                {/* <li className="text-gray-500 text-xl font-medium mt-5 animate-bounce">
                                <Link href="/profile">Matches</Link>
                            </li> */}
                                <li className="text-gray-500 text-xl font-medium mt-5">
                                    <Link href="/statistics">Stats</Link>
                                </li>
                                <li className="text-gray-500 text-xl font-medium mt-5 mb-5">
                                    <Link href="/about">About</Link>
                                </li>
                            </ul>
                            <hr className="border-2 border-rose-300" />
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Toggle;
