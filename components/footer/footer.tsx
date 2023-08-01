import React from 'react';

function Footer() {
    return (
        <div className="bg-white">
            <hr className="border-2 border-rose-300" />
            <footer>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '20px',
                        marginTop: '25px',
                    }}
                >
                    <a href="https://www.reddit.com/user/PerfectMatch2020/" target="_blank" rel="noreferrer">
                        <img src="\reddit.svg" alt="Reddit Logo" className="w-7 sm:w-9 mr-4" />
                    </a>

                    <a href="https://www.instagram.com/cornellperfectmatch/?hl=en" target="_blank" rel="noreferrer">
                        <img src="\ins.svg" alt="Instagram Logo" className="w-7 sm:w-9 mr-3" />
                    </a>

                    <a href="https://www.facebook.com/cornellperfectmatch/" target="_blank" rel="noreferrer">
                        <img src="\facebook.svg" alt="Facebook Logo" className="w-7 sm:w-9" />
                    </a>
                </div>

                <p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '25px',
                    }}
                >
                    ©{' '}
                    <a href="/" target="_blank" rel="noreferrer" className="hover:underline">
                        Perfect Match 2023.{' '}
                    </a>{' '}
                    &nbsp;All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}

export default Footer;
