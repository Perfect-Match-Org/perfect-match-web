import React from 'react';

function Footer() {
    return (
        <div className="bg-pmpink-500 p-4">
            <footer className="max-w-screen-xl mx-auto">
                {/* Social Links & Contact Info */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-5 lg:px-6">
                    {/* Left Side: Social Links */}
                    <div className="flex justify-center sm:justify-start items-center mb-3 sm:mb-0">
                        <a
                            href="https://www.reddit.com/user/PerfectMatch2020/"
                            target="_blank"
                            rel="noreferrer"
                            className="group transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                            aria-label="Visit Perfect Match Reddit page"
                        >
                            <img
                                src="\reddit.png"
                                alt="Visit Perfect Match on Reddit"
                                className="w-6 sm:w-9 mr-3 transition-all duration-300 group-hover:brightness-110"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/perfectmatch.at.cornell/?hl=en"
                            target="_blank"
                            rel="noreferrer"
                            className="group transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                            aria-label="Visit Perfect Match Instagram page"
                        >
                            <img
                                src="\instagram.png"
                                alt="Visit Perfect Match on Instagram"
                                className="w-6 sm:w-9 mr-3 transition-all duration-300 group-hover:brightness-110"
                            />
                        </a>
                    </div>

                    {/* Right Side: Contact Info with Logo */}
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-right">
                        <div className="dela-gothic-one">
                            <h1 className="text-pmblue-500 text-lg font-bold">Questions for the Cupids?</h1>
                            <h3 className="text-pmblue-500 work-sans text-sm">
                                Reach out to us at{' '}
                                <a
                                    href="mailto:perfectmatch@cornell.edu"
                                    className="underline hover:no-underline transition-all duration-200 hover:text-pmblue-400"
                                >
                                    perfectmatch@cornell.edu
                                </a>
                            </h3>
                        </div>
                        <img
                            src="\logo-pmblue.png"
                            alt="Perfect Match logo"
                            className="w-8 sm:w-12 mt-3 sm:mt-0 sm:ml-3 transition-all duration-300 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Visual Divider */}
                <div className="border-t border-pmblue-500/30 mb-4"></div>

                {/* Footer Text */}
                <div className="work-sans text-center text-pmblue-500 text-xs sm:text-sm space-y-1">
                    <p>©
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline transition-all duration-200 hover:text-pmblue-400"
                        >
                            Perfect Match 2026
                        </a>. All Rights Reserved.</p>
                    <p>This organization is a registered student organization of Cornell University.</p>
                    <p>
                        <a
                            href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
                            className="hover:underline transition-all duration-200 hover:text-pmblue-400"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Equal Education and Employment
                        </a>
                    </p>
                    <p>
                        If you have a disability and are having trouble accessing information on this website
                        or need materials in an alternate format, please contact us at{' '}
                        <a
                            href="mailto:perfectmatch@cornell.edu"
                            className="hover:underline transition-all duration-200 hover:text-pmblue-400"
                        >
                            perfectmatch@cornell.edu
                        </a>.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
