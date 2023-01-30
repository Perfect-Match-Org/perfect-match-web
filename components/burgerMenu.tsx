import React from "react";
import Link from "next/link";

const Toggle = () => {
    const [show, toggleShow] = React.useState(true);
    
    return (
        <div>
            <button className="text-4xl text-gray-500" onClick={() => toggleShow(!show)}>{show ? "☰" : '✕'}</button>    
                {!show && 
                <div className="flex">
                    <nav className="mt-3.5 z-10 absolute text-center mx-auto pt-44 bg-white w-full h-full right-0">
                        <ul>
                            <li className="text-gray-500 text-2xl font-medium">
                                <Link href="/">Home💖</Link>
                            </li>
                            <li className="text-gray-500 text-2xl font-medium mt-4">
                                <Link href="/profile">Profile🪪</Link>
                            </li>
                            <li className="text-gray-500 text-2xl font-medium mt-4">
                                <Link href="/statistics">Statistics📈</Link>
                            </li>
                            <li className="text-gray-500 text-2xl font-medium mt-4">
                                <Link href="/about">About & Contact👨‍💻</Link>
                            </li>
                        </ul>
                    </nav>
                </div>}
        </div>
    )
}

export default Toggle;
