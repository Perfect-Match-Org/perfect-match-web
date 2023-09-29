import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <div className="bg-white">
            <hr className="border-2 border-rose-300 mb-5" />
            <footer>
                <div className="flex justify-center items-center mb-5">
                    <a href="https://www.reddit.com/user/PerfectMatch2020/" target="_blank" rel="noreferrer">
                        <Image src="\reddit.svg" alt="Reddit Logo" width={36} height={36} className="mr-5" />
                    </a>

                    <a href="https://www.instagram.com/cornellperfectmatch/?hl=en" target="_blank" rel="noreferrer">
                        <Image src="\ins.svg" alt="Instagram Logo" width={36} height={36} className="mr-3" />
                    </a>

                    <a href="https://www.facebook.com/cornellperfectmatch/" target="_blank" rel="noreferrer">
                        <Image src="\facebook.svg" alt="Facebook Logo" width={36} height={36} />
                    </a>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center mb-3">
                    <p>
                        ©
                        <Link href="/" target="_blank" rel="noreferrer" className="hover:underline">
                            Perfect Match 2023.
                        </Link>
                        &nbsp;All Rights Reserved.
                    </p>
                </div>

                <div className="text-xs text-gray-400 flex justify-center text-center mb-3">
                    This organization is a registered student organization of Cornell University.
                </div>
                <div className="text-xs text-gray-400 flex justify-center text-center pb-6">
                    If you have a disability and are having trouble accessing information on this website or need
                    materials in an alternate format, please contact us at cornell.perfectmatch@gmail.com.
                </div>
            </footer>
        </div>
    );
}

export default Footer;
