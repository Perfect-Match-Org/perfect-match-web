import Link from 'next/link';
import Toggle from './burgerMenu';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isAdmin } from '@/utils/admins';
import { signOut } from 'next-auth/react';

function Header(props: any) {
    const { data: sessions, status } = useSession();
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        if (sessions) {
            setIsAdminUser(isAdmin(sessions?.user?.email || ''));
        }
    }, [sessions]);
    return (
        <header>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-4RWCJT2EZV" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-4RWCJT2EZV');
                `}
            </Script>
            <nav className="bg-pmpink-500 py-8 light:bg-gray-800 main-nav">
                <div className="flex flex-wrap justify-between items-center w-full px-4 sm:px-8">
                    <Link href="/" className="flex items-center">
                        <img
                            src="logo.png"
                            className="mr-3 h-7 sm:h-9 cursor-pointer ml-4 sm:ml-8"
                            alt="Perfect Match"
                        />
                    </Link>
                    <div className="sm:hidden">
                        <Toggle />
                    </div>
                    <div className="hidden justify-between font-work-sans items-center w-full sm:block sm:w-auto sm:order-1">
                        <ul className="flex flex-col mt-4 text-gray-500 font-medium sm:flex-row sm:space-x-6 sm:mt-0 md:space-x-9 text-lg items-center">
                            <li className="text-pmred-500">
                                <Link href="/">Home</Link>
                            </li>
                            {/* <li className="text-pmred-500">
                                <Link href="/dashboard">Live Dashboard</Link>
                            </li> */}
                            <div className="flex w-full justify-end sm:hidden">
                                <Toggle />
                            </div>

                            <li className="text-pmred-500">
                                <Link href="/statistics"> Stats</Link>
                            </li>
                            <li className="text-pmred-500">
                                <Link href="/about"> About</Link>
                            </li>
                            <li className="text-pmred-500">
                                <Link href="/testimonials">Testimonials</Link>
                            </li>
                            {/* SURVEY OPEN — uncomment for next year's cycle
                            <li className="text-pmred-500 border-2 border-pmred-500 rounded-3xl px-2 py-1 hover:bg-pmred-500 hover:text-white transition-all duration-200 ease-in-out">
                                <Link href="/profile">Results</Link>
                            </li>
                            */}
                            {status === 'authenticated' && (
                                <li className="text-pmred-500 hover:text-red-500 ease-in-out transition-all duration-200">
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
                                <li className="text-pmred-500">
                                    <Link href="/admin"> Admin</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <div className="bg-pmblue-500">
                <div className="py-2 px-3 sm:px-0 sm:py-3 md:pt-1 md:pb-0 flex">
                    <div className="flex flex-wrap justify-center items-center sm:mx-auto">
                        <div>
                            <p className="ml-2 font-work-sans text-white sm:text-lg md:text-base pb-1">
                                Interested in joining the Perfect Match Team?
                            </p>
                        </div>
                        <div className="order-3 font-work-sans mt-2 w-full flex-shrink-0 sm:w-auto sm:ml-5 sm:mt-0">
                            <a
                                href="https://forms.gle/Jv5th8zbajVF6qN6A"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center rounded-md border border-transparent bg-white sm:px-4 md:px-2 mb-1 text-sm font-work-sans text-pmred-500 shadow-sm sm:text-lg md:text-base"
                            >
                                Apply Here!
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
        </header >
    );
}

export default Header;
