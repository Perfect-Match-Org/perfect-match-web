import Link from "next/link";
import Toggle from "./burgerMenu";
import Script from "next/script";

function Header(props: any) {
  const handleClick = () => {
    gtag("event", "Application_Form", {
      event_category: "Application",
      event_label: "submission",
      value: 1,
    });
  };

  return (
    <header>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4RWCJT2EZV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4RWCJT2EZV');
        `}
      </Script>
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
          <div className="hidden justify-between items-center w-full sm:block sm:w-auto sm:order-1">
            <ul className="flex flex-col mt-4 text-gray-500 font-medium sm:flex-row sm:space-x-6 sm:mt-0 md:space-x-9 text-lg">
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
      <div className="bg-rose-400">
        <div className="py-2 px-3 sm:px-0 sm:py-3 md:pt-1 md:pb-0 flex">
          <div className="flex flex-wrap items-center sm:mx-auto">
            <div>
              <p className="ml-2 font-small text-white sm:text-lg md:text-base pb-1">
                Interested in joining the Perfect Match Team?
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:w-auto sm:ml-5 sm:mt-0">
              <a
                href="https://forms.gle/Jv5th8zbajVF6qN6A"
                target="_blank"
                rel="noreferrer"
                onClick={handleClick}
                className="flex items-center justify-center rounded-md border border-transparent bg-white sm:px-4 md:px-2 mb-1 text-sm font-small text-rose-400 shadow-sm hover:bg-rose-50 sm:text-lg md:text-base"
              >
                Apply Here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
function gtag(
  arg0: string,
  action: any,
  arg2: { event_category: any; event_label: any; value: any }
) {
  throw new Error("Function not implemented.");
}
