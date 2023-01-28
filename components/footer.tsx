import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-white">
      <hr className="border-2 border-rose-300" />
      <footer>
    
        <div style = {{display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px", marginTop: "25px"}}>

            <a href="https://www.reddit.com/user/PerfectMatch2020/"><img src="\reddit.svg" alt="Reddit Logo" className = "w-7 sm:w-9 mr-4"/></a>
    
            <a href="https://www.instagram.com/cornellperfectmatch/?hl=en"><img src="\ins.svg" alt="Instagram Logo" className = "w-7 sm:w-9 mr-3"/></a>
    
            <a href="https://www.facebook.com/cornellperfectmatch/"><img src="\facebook.svg" alt="Facebook Logo" className = "w-7 sm:w-9"/></a>
    
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400" style={{display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "25px"}}>
          © <Link href="/" className="hover:underline">Perfect Match 2023. </Link> &nbsp;All Rights Reserved.
        </p>

      </footer>
    </div>
  );
}

export default Footer;

