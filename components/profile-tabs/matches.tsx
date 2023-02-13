import Match_Tile from "./match_tile";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetch";


function Matches(props: any) {


  const { data: match_list, error } = useSWR("/api/matches/", fetcher, {

    refreshInterval: 600000000,
  });
  let list = match_list;
  if (!list) { list = [] }


  list.forEach((match: any) => {
    list.push(<li><Match_Tile id={match}></Match_Tile></li >)
  })

  return (
    <section className="bg-gray-200">
      <div className="mx-flex my-flex   lg:items-center">
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">Your Matches are Here!</h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-xl ">We&apos;ve crunched the numbers, analysed your responses, ran the models, chatted with our in-house love specialists, and consulted Touchdown. Here are your Perfect Matches! </p>
            </div>

            {list}

          </div>
        </section>
      </div>
    </section>
  );
}

export default Matches;
