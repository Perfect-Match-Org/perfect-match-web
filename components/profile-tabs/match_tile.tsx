import useSWR from "swr";
import { fetcher } from "../../helpers/fetch";

function Match_Tile(props: any) {

    const emoji = ["😃", "😆", "😄", "😆", "😊", "😎", "😳"]
    const color = ['text-rose-400', 'text-orange-400', 'text-yellow-400', 'text-lime-500', 'text-emerald-400', 'text-sky-400', 'text-purple-400']

    const { data: match_data_temp, error } = useSWR("/api/lookup/" + props.id, fetcher);
    let match_data = match_data_temp
    if (!match_data) {
        return (<div></div>)
    }



    return (
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-1" >
            <div className="items-center rounded-lg shadow-lg sm:flex mx-[1%] sm:mx-[6%] lg:mx-[12%]">
                <div className="flex sm:contents">
                    <div className="text-8xl mt-4 sm:mt-0 sm:text-9xl mx-auto sm:ml-12 sm:mr-0">{emoji[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}</div>
                </div>
                <div className="p-3 pt-1 sm:pl-10 sm:pr-16 sm:py-5">
                    <h3 className="text-2xl font-bold font-botracking-tight text-gray-500">
                        <span className={color[Math.floor(Math.random() * (6 - 0 + 1) + 0)]}>{match_data.name}</span>
                    </h3>
                    <hr className="h-0.5 my-2 bg-rose-200 border-0"></hr>
                    <p className="text-gray-500">📚 {match_data.year.charAt(0).toUpperCase() + match_data.year.slice(1)}, {match_data.major.charAt(0).toUpperCase() + match_data.major.slice(1)}</p>
                    <p className="text-gray-500 ">📍 {match_data.city}</p>
                    <p className="mt-3 sm:mt-4 mb-3 text-gray-500">Three words to describe me...<span className="font-bold">{match_data.threewords}</span>!</p>
                    <p className="mb-3 sm:mb-4 text-gray-500">First song on my hookup playlist...🎶<span className="font-bold"> {match_data.hookupsong}</span></p>
                    <p className="mb-4 sm:mb-6 text-gray-500">Bio...<span className="font-bold">{match_data.bio}</span></p>


                    <p className="mb-4 sm:mb-6 text-gray-500">Instagram<span className="font-bold">{match_data.insta}</span></p>
                    <p className="mb-4 sm:mb-6 text-gray-500">Facebook<span className="font-bold">{match_data.fb}</span></p>
                    <p className="mb-4 sm:mb-6 text-gray-500">Snapchat<span className="font-bold">{match_data.snapchat}</span></p>
                    <p className="mb-4 sm:mb-6 text-gray-500">Twitter<span className="font-bold">{match_data.twitter}</span></p>
                    <p className="mb-4 sm:mb-6 text-gray-500">Phone<span className="font-bold">{match_data.phone}</span></p>
                    {match_data.linkedin != "NULL" && (
                        <p className="mb-4 sm:mb-6 text-gray-500">LinkedIn<span className="font-bold">{match_data.linkedin}</span></p>
                    )};





                </div >
            </div >


        </div >


    );
}

export default Match_Tile;
