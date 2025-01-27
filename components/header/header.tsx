import Link from 'next/link';
import Toggle from './burgerMenu';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isAdmin } from '@/utils/admins';

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
            <nav className="bg-pmpink-500  pr-4 lg:px-6 py-2.5 light:bg-gray-800 main-nav">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
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
                    <div className='work-sans'>
                        <div className="hidden justify-between items-center w-full sm:block sm:w-auto sm:order-1">
                            <ul className="flex flex-col mt-4 text-gray-500 font-medium sm:flex-row sm:space-x-6 sm:mt-0 md:space-x-9 text-lg">
                                <li className="text-pmred-500">
                                    <Link href="/">Home</Link>
                                </li>
                                {/* <li className="text-pmred-500">
                                <Link href="/dashboard">Live Dashboard</Link>
                            </li> */}
                                {/* <li className="text-pmred-500">
                                <Link href="/profile">Matches</Link>
                            </li> */}
                                <li className="text-pmred-500">
                                    <Link href="/statistics"> Stats</Link>
                                </li>
                                <li className="text-pmred-500">
                                    <Link href="/about"> About</Link>
                                </li>
                                {isAdminUser && (
                                    <li className="text-pmred-500">
                                        <Link href="/admin"> Admin</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <div className="bg-rose-400">
                <div className="py-2 px-3 sm:px-0 sm:py-3 md:pt-1 md:pb-0 flex">
                    <div className="flex flex-wrap items-center sm:mx-auto">
                        <div>
                            <p className="ml-2 font-small text-white sm:text-lg md:text-base pb-1">
                                Interested in joining the Perfect Match Team?
                            </p>
                        </div>
                        <div className="order-3 mt-2 w-full flex-shrink-0 sm:w-auto sm:ml-5 sm:mt-0">
                            <a
                                href="https://forms.gle/Jv5th8zbajVF6qN6A"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center rounded-md border border-transparent bg-white sm:px-4 md:px-2 mb-1 text-sm font-small text-rose-400 shadow-sm hover:bg-rose-50 sm:text-lg md:text-base"
                            >
                                Apply Here!
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
        </header>
    );
}

export default Header;
