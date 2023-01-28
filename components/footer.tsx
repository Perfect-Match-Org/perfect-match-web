import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <hr className="border-2 border-rose-300" />
      <footer>
    
        <div style = {{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", marginTop: "25px"}}>

            <a href="https://www.reddit.com/user/PerfectMatch2020/"><img src="\reddit.svg" alt="Reddit Logo" style={{width: "35px", marginRight: "10px"}}/></a>
    
            <a href="https://www.instagram.com/cornellperfectmatch/?hl=en"><img src="\ins.svg" alt="Instagram Logo" style={{width: "35px", marginLeft: "10px", marginRight: "10px"}}/></a>
    
            <a href="https://www.facebook.com/cornellperfectmatch/"><img src="\facebook.svg" alt="Facebook Logo" style={{width: "35px", marginLeft: "10px", marginRight: "10px"}}/></a>
    
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400" style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px"}}>
          © <Link href="/" className="hover:underline">Perfect Match 2023</Link>. All Rights Reserved.
        </span>

      </footer>
    </div>
  );
}

export default Footer;

