import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link'


function Footer() {
    return (
        <div>
            <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 light:bg-gray-800" >

                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Perfect Match</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href="/" className="mr-4 hover:underline md:mr-6 ">Home</Link>
                    </li>
                    <li>
                        {/* <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a> */}
                    </li>
                    <li></li>
                </ul>
            </footer>
        </div>

    );
}

export default Footer;
