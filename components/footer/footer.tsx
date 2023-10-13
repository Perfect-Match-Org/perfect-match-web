import React from 'react';

function Footer() {
    return (
        <div className="bg-white">
            <hr className="border-2 border-rose-300 mb-5" />
            <footer>
                <div className="flex justify-center items-center mb-5">
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

                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center mb-3">
                    <p>
                        ©
                        <a href="/" target="_blank" rel="noreferrer" className="hover:underline">
                            Perfect Match 2023.
                        </a>
                        &nbsp;All Rights Reserved.
                    </p>
                </div>

                <div className="text-xs text-gray-400 flex justify-center mb-2 mx-1">
                    This organization is a registered student organization of Cornell University.
                </div>
                <div className="text-xs text-gray-400 flex justify-center pb-6 mx-1">
                    If you have a disability and are having trouble accessing information on this website or need
                    materials in an alternate format, please contact us at cornell.perfectmatch@gmail.com.
                </div>
            </footer>
        </div>
    );
}

export default Footer;
