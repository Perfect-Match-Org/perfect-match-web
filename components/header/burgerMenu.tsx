import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isAdmin } from '@/utils/admins';
import { signOut } from 'next-auth/react';

const Toggle = () => {
    const [show, toggleShow] = React.useState(true);
    const { data: sessions, status } = useSession();
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        if (sessions) {
            setIsAdminUser(isAdmin(sessions?.user?.email || ''));
        }
    }, [sessions]);
    return (
        <div>
            <button className="text-4xl text-pmred-500" onClick={() => toggleShow(!show)}>
                {show ? '☰' : '✕'}
            </button>
            {!show && (
                <div className="flex">
                    <div className="dela-gothic-one">

                        <nav className="mt-0 z-10 absolute text-center mx-auto bg-pmpink-500 w-full right-0">
                            <ul>
                                <li className="text-pmred-500 text-xl font-medium mt-4">
                                    <Link href="/">Home</Link>
                                </li>
                                {/* <li className="text-gray-500 text-xl font-medium mt-5">
                                <Link href="/dashboard">Live Dashboard</Link>
                            </li> */}
                                {/* <li className="text-gray-500 text-xl font-medium mt-5 animate-bounce">
                                <Link href="/profile">Matches</Link>
                            </li> */}
                                <li className="text-pmred-500 text-xl font-medium mt-5">
                                    <Link href="/statistics">Stats</Link>
                                </li>
                                <li className="text-pmred-500 text-xl font-medium mt-5 mb-5">
                                    <Link href="/about">About</Link>
                                </li>
                                <li className="text-pmred-500 text-xl font-medium mt-5 mb-5">
                                    <Link href="/testimonials">Testimonials</Link>
                                </li>
                                <li className="text-pmred-500 text-xl font-medium mt-5 mb-5">
                                    <Link href="/profile">Form</Link>
                                </li>
                                {status === 'authenticated' && (
                                    <li className="text-pmred-500 text-xl font-medium mt-5 mb-5 hover:text-red-500 ease-in-out transition-all duration-200">
                                        <button className="inline-flex items-center justify-center " onClick={() => signOut()}>
                                            <svg
                                                className="mr-2 -ml-1 w-4 h-4"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="google"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 488 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                                ></path>
                                            </svg>Sign Out</button>
                                    </li>
                                )}
                                {isAdminUser && (
                                    <li className="text-pmred-500 text-xl font-medium mt-5 mb-5">
                                        <Link href="/admin"> Admin</Link>
                                    </li>
                                )}

                            </ul>
                            <hr className="border-2 border-pmpink2-500" />
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Toggle;
