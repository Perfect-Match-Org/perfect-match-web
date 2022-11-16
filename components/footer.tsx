import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link'


function Footer() {
    return (
        <>
            <div className="bg-black-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-15">
                <div className="p-5 ">
                    <ul>
                        <p className="text-white-800 font-bold text-3xl pb-6">
                            <Link href="/">Perfect Match</Link>
                        </p>
                        <p className="text-rose-400 font-bold text-m pb-6">
                            Coming Valentine's 2023
                        </p>
                        {/* <div className="flex gap-6 pb-5">
                            <FaInstagram href="https://www.instagram.com/cornellperfectmatch/?hl=en" className=" text-2xl cursor-pointer hover:text-rose-400" />

                            <FaLinkedin href="https://www.linkedin.com/company/cornell-perfect-match/" className=" text-2xl cursor-pointer hover:text-rose-400" />
                        </div> */}
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-white-800 font-bold text-2xl pb-4">About</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">
                            <Link href="/about">About Us</Link>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">
                            <Link href="/about">Data Privacy</Link>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">

                        </li>

                    </ul>
                </div>
                {/* <div className="p-5">
                    <ul>
                        <p className="text-white-800 font-bold text-2xl pb-4">Past Years</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">
                            2020 Statistics
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">
                            2021 Statistics
                        </li>

                    </ul>
                </div> */}
                <div className="p-5">
                    <ul>
                        <p className="text-white-800 font-bold text-2xl pb-4">Contact</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-rose-400 cursor-pointer">
                            cornell.perfectmatch@gmail.com
                        </li>

                    </ul>
                </div>
            </div >
            <div className="flex flex-col justify-center items-center text-center  p-5 bg-black-50">
                <h1 className=" text-white-800 font-semibold">
                    © 2019-2022 Perfect Match, All rights reserved | Built with ❤ in Ithaca, NY

                </h1>
            </div>
        </>
    );
}

export default Footer;
