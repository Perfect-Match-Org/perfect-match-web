import GoogleAuth from "../components/googleAuth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Toggle from "./burgerMenu";

function Header(props: any) {
  return (
    <header>
      <nav className="bg-white border-gray-200 pr-4 lg:px-6 py-2.5 light:bg-gray-800 main-nav">
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

          <div
            className="hidden justify-between items-center w-full sm:block sm:w-auto sm:order-1"
          >
            <ul className="flex flex-col mt-4 text-gray-500 font-medium sm:flex-row sm:space-x-8 sm:mt-0 text-lg">
              <li className="hover:text-rose-400">
                <Link href="/">Home</Link>
              </li>

              <li className="hover:text-rose-400">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="hover:text-rose-400">
                <Link href="/statistics"> Statistics</Link>
              </li>
              <li className="hover:text-rose-400">
                <Link href="/about"> About & Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="border-2 border-rose-300" />
    </header>
  );
}

export default Header;
