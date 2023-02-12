import useSWR from "swr";
import { fetcher } from "../../helpers/fetch";
import Match_Tile from "./match_tile";



function Matches(props: any) {

  const { data: matches, error } = useSWR("/api/matches");
  var matches_array = JSON.parse(matches);

  var all_matches = <h1>No Matches</h1>;

  if (matches_array && matches_array.length != 0) {
    all_matches = <h1></h1>;
    var i = 0;
    while (i < matches_array.length) {
      let match_id = matches_array[i]
      all_matches += <Match_Tile id={match_id}></Match_Tile>;
      i++;
    }
  }


  return (
    <section className="bg-gray-200">
      <div className="mx-auto max-w-screen-xl  lg:flex lg:h-screen lg:items-center">
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">Your Matches are Here!</h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-xl ">We&apos;ve crunched the numbers, analysed your responses, ran the models, chatted with our in-house love specialists, and consulted Touchdown. Here are your Perfect Matches. </p>
            </div>

            {all_matches}

          </div>
        </section>
      </div>
    </section>
  );
}

export default Matches;
