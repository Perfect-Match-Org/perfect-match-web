import useSWR from "swr";
import { fetcher } from "../../helpers/fetch";

function Match_Tile(props: any) {

    const { data: match_data_temp, error } = useSWR("/api/lookup/" + props.id, fetcher, {
        refreshInterval: 600000000,
    });
    let match_data = match_data_temp
    if (!match_data) {
        match_data = {
            name: "ERROR", major: "ERROR", year: "ERROR", bio: "ERROR", city: "ERROR", threewords: "ERROR ERROR ERROR"
        }
    }
    let image =
        "https://static.wixstatic.com/media/150f53_bcde85061dbd46688e5a08a66cc07842~mv2.jpg/v1/fill/w_250,h_250,fp_0.50_0.50,q_30,blur_30,enc_auto/150f53_bcde85061dbd46688e5a08a66cc07842~mv2.jpg";
    let randomNum = Math.floor(Math.random() * 10);
    if (randomNum < 2) {
        image = "data:image/jpeg;base64,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";
    }
    if (randomNum == 2) {
        image = "data:image/jpeg;base64,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";
    }
    if (randomNum == 3) {
        image = "data:image/jpeg;base64,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";
    }
    if (randomNum == 7) {
        image = "Juliet";
    }
    if (randomNum > 8) {
        image = "data:image/jpeg;base64,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";
    }


    return (
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1" >
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">


                <div className="p-5">
                    <h3 className="text-xl font-botracking-tight text-gray-900 dark:text-white">
                        <a href="#">{match_data.name}</a>
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">{match_data.year}, {match_data.major}, {match_data.city}</span>
                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Three words to describe me... {match_data.threewords}</p>
                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Bio.. {match_data.bio}</p>

                    <ul className="flex space-x-4 sm:mt-0">
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>


        </div >


    );
}

export default Match_Tile;